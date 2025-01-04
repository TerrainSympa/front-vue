<template>
  <div class="container">
<!--    <h2 style="padding-top: 20px">{{$t('main.map.title')}}</h2>-->

    <div style="margin-top: 65px" id="map" ref="mapElement">
      <div v-show="storeResults.pending" class="map-cover">
        <q-spinner
                   color="primary"
                   size="6em"
                   style="height: 100%"
        />
      </div>
    </div>
  </div>
  <q-toggle v-model="showPlu" :label="$t('main.map.commune.plu')" />
</template>

<script setup lang="ts">
import {inject, onMounted, reactive, ref, watch} from "vue";
import {Emitter} from "mitt";
import {
  PickQueryVariables,
  usePickLazyQuery,
} from "@/types";
import * as L from "leaflet";
import 'leaflet-draw'
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw-src.css"
import {computed, toRefs} from "vue";
import {useSearchFiltersStore, useSearchResultsStore} from "@/store/authStore";
import {Marker, Polygon} from "leaflet";
L.drawLocal.draw.toolbar.buttons.polygon = 'Créer une zone de recherche (avec un polygone)';
L.drawLocal.draw.toolbar.buttons.circle = 'Créer une zone de recherche (en cercle)';
L.drawLocal.draw.toolbar.buttons.marker = 'Placer un marqueur pour avoir les détails d\'une parcelle';
L.drawLocal.edit.toolbar.buttons.edit = 'Editer un dessin';
L.drawLocal.edit.toolbar.buttons.editDisabled = 'Pas de dessin a editer';
L.drawLocal.edit.toolbar.buttons.removeDisabled = 'Pas de dessin a enlever';
L.drawLocal.edit.toolbar.buttons.remove = 'Enlever un dessin';
L.drawLocal.edit.toolbar.actions.save = {title: 'Sauvegarder', text: 'Sauvegarder'};
L.drawLocal.edit.toolbar.actions.cancel = {title: 'Effacer', text: 'Effacer'};
L.drawLocal.edit.toolbar.actions.clearAll = {title: 'Effacer tout', text: 'Effacer tout'};
const redIcon = new L.Icon({
  iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
const blueIcon = new L.Icon({
  iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const emitter: Emitter<any> | undefined = inject('$emitter');
const storeFilters = useSearchFiltersStore();
const storeResults = useSearchResultsStore();

const {results} = toRefs(storeResults)
const {searchingArea} = toRefs(storeFilters)

const mapElement = ref();

emitter?.on('search-area', (evt) => {
  if(map === null) {
    return;
  }
  map.removeControl(drawControl);
  if(evt.show) {
    drawControl.setDrawingOptions({
      polygon: {},
      circle: {},
    })
  } else {
    if(searchArea) {
      map?.removeLayer(searchArea);
    }
    drawControl.setDrawingOptions({
      polygon: false,
      circle: false,
    })
  }
  map.addControl(drawControl);
});

const paramsMarker: PickQueryVariables = reactive({coords: {lat: 46, lng:5}});
let map: L.DrawMap | null = null;
const {onResult: onResultPick, load: loadPick} = usePickLazyQuery(paramsMarker)
let markersResults: {marker: L.Marker; polygon: L.Polygon }[] = [];
let searchArea: L.Polygon | null = null;
let selectedMarker: {marker?: L.Marker; polygon?: L.Polygon } = {};
let showPlu = ref(false);
let wmsLayer: L.Layer | null = null;

const drawnItems = new L.FeatureGroup()
let drawControl = new L.Control.Draw({
  edit: {
    featureGroup: drawnItems,
    edit: false, // TODO: fix buggy editing
    remove: false // TODO: fix buggy editing
  },
  draw: {
    rectangle: false,
    circlemarker: false,
    polyline: false,
    // polygon: false,
    // circle: false,
    // polygon: {showArea: true, allowIntersection: false}
  },
});


watch(results, (data) => {
  if(!data.length || map === null) {
    return;
  }
  emitter?.emit('search-done', {'done': true});
  markersResults.forEach((mr) => {map!.removeLayer(mr.marker); map!.removeLayer(mr.polygon);})
  markersResults = data.map((parcelle) => {
    if(!map) {
      return null;
    }
    const center = parcelle.center.coordinates;
    const marker = L.marker([center[1], center[0]]).addTo(map);
    marker.on('click', function() {
      if(marker.getLatLng()) {
        map!.flyTo(marker.getLatLng());
        markersResults.forEach((mr) => {mr.marker.setIcon(blueIcon)})
        marker.setIcon(redIcon);
      }
      emitter?.emit('selected-parcel', parcelle.idu);
    });
    return {
      marker,
      polygon: L.polygon(parcelle.geom.coordinates[0][0].map(([x,y]: number[]) => [y,x]), {color: 'green', fillColor: 'lightgreen', fillOpacity: 0.3}).addTo(map)
    };
  }).filterNullAndUndefined() ?? [];
  map.fitBounds(markersResults.map((mr) => mr.marker.getLatLng()).map((coords) => [coords.lat, coords.lng]));
});

onResultPick(({data}) => {
  if(map && data) {
    if(selectedMarker.polygon) {
      map!.removeLayer(selectedMarker.polygon);
    }
    const clickHandler = function() {
      if(selectedMarker.marker?.getLatLng()) {
        map!.flyTo(selectedMarker.marker.getLatLng());
        markersResults.forEach((mr) => {mr.marker.setIcon(blueIcon)})
        selectedMarker.marker.setIcon(redIcon);
      }
      emitter?.emit('selected-parcel', data.pick?.idu);
    }
    selectedMarker.marker?.on('click', clickHandler);
    clickHandler();
    selectedMarker.polygon = L.polygon(data.pick?.geom.coordinates[0][0].map(([x,y]: number[]) => [y,x]) ?? [[0,0]], {color: 'purple', fillColor: 'lightpurple', fillOpacity: 0.3}).addTo(map!)
  }
});

watch(showPlu, (val) => {
  if(!map) {
    return;
  }
  if(val) {
    // wmsLayer = L.tileLayer.wms('https://wxs.ign.fr/altimetrie/geoportail/r/wms/v', {layers: 'ELEVATION.CONTOUR.LINE', opacity: 0.5, transparent: true, format: 'image/png'}).addTo(map);
    wmsLayer = L.tileLayer.wms('https://data.geopf.fr/wms-v/ows', {layers: 'du', opacity: 0.5, transparent: true, format: 'image/png' }).addTo(map);
  } else if (wmsLayer) {
    map.removeLayer(wmsLayer)
  }
});

watch(
    storeResults,
    (state) => {
      if(state.$state.results) {
        if(state.$state.results.geom) {
          selectedMarker.polygon = L.polygon(state.$state.results.geom.coordinates[0][0].map(([x,y]: number[]) => [y,x]) ?? [[0,0]], {color: 'purple', fillColor: 'lightpurple', fillOpacity: 0.3}).addTo(map!)
        }
        if(state.$state.results.center) {
          selectedMarker.marker = L.marker([state.$state.results.center.coordinates[1], state.$state.results.center.coordinates[0]]).addTo(map!);

          if(selectedMarker.marker?.getLatLng()) {
            map!.flyTo(selectedMarker.marker.getLatLng());
          }
        }

      }
    },
    { deep: true }
)

const accessToken = 'pk.eyJ1IjoiYW50bG91cCIsImEiOiJja3ZvNjQ3bTY1cTV0MnRvazBwZ2kxYTZ6In0.GhQz_xwV-Cl2vkRyPMRd6g';
const southWest = L.latLng(35, -10),
    northEast = L.latLng(55, 15);
onMounted(() => {
  // Waiting mounted to get the map div element
  map = L.map(mapElement.value, {
    minZoom: 6,
    maxBounds: L.latLngBounds(southWest, northEast),
    bounceAtZoomLimits: false,
    maxBoundsViscosity: 1.0,
    zoomDelta: 1,
    wheelPxPerZoomLevel: 100
  });

  map.on(L.Draw.Event.CREATED, (event: any) => {

    emitter?.emit('area-draw', {'done': true});
    const layerType = (event as any).layerType
    if (layerType === 'polygon') {
      searchingArea!.value = {polygon: {coordinates: event.layer._latlngs[0]}};
    } else if (layerType === 'circle') {
      searchingArea!.value = {circle:{center: event.layer._latlng, radius: event.layer._mRadius}};
    } else if (layerType === 'marker') {
      paramsMarker.coords = event.layer._latlng;
      loadPick();
      if(selectedMarker.marker) {
        map?.removeLayer(selectedMarker.marker);
      }
      selectedMarker.marker = event.layer
      if(selectedMarker.marker) {
        selectedMarker.marker.addTo(map!);
      }
    }
    if(layerType !== 'marker') {
      selectedMarker.marker = event;
      if(searchArea) {
        map?.removeLayer(searchArea);
      }
      searchArea = event.layer;
      drawnItems.addLayer(searchArea!);
    }
  })


  // Map element has been found, we can initialized it
  if(map === null) {
    return;
  }

  map.addLayer(drawnItems)
  map.addControl(drawControl)

  map.setView([46.0033486, 5.3591966], 13);
  L.control.scale({metric: true, imperial: false}).addTo(map);

  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    maxNativeZoom: 18,
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
  // Deprecated, on usefull if we only have a subset of the dataset
  // L.polygon(mapBoundaries, {color: 'blue', fillColor: 'lightblue', fillOpacity: 0.1}).addTo(map);


  map.on(L.Draw.Event.DELETED, (event: any) => {
    emitter?.emit('area-cleared', {'done': true});
  })

});

</script>

<style scoped lang="scss">
 .container {
   height: 100%;
   width: 100%;
 }
  #map {
    height: 600px;
    width: 100%;
    z-index: 1;
  }
  .map-cover{
    position: absolute;
    height: 100%;
    width: 100%;
    display: block;
    z-index: 999;
    background-color: #1D1D1D;
    opacity: 70%;
  }
</style>
