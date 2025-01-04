<template>

    <svg width="10" height="10">
      <defs>
        <pattern id="parcel-fill-pattern-1" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path stroke="#d9f0a3" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none" pointer-events="none" d="M0 2h8"/>
          <path stroke="#fff" stroke-opacity="0" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none" pointer-events="none" d="M0 2h8"/>
        </pattern>
        <pattern id="parcel-fill-pattern-2" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path stroke="#78c679" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none" pointer-events="none" d="M0 2h8"/>
          <path stroke="#fff" stroke-opacity="0" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none" pointer-events="none" d="M0 2h8"/>
        </pattern>
        <pattern id="parcel-fill-pattern-3" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path stroke="#238443" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none" pointer-events="none" d="M0 2h8"/>
          <path stroke="#fff" stroke-opacity="0" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none" pointer-events="none" d="M0 2h8"/>
        </pattern>
      </defs>
    </svg>

    <div id="svgcontainer" ref="svgMapElement"></div>
</template>

<script setup lang="ts">
import {onMounted, PropType, reactive, ref, watch} from "vue";
import * as L from "leaflet";
import {GeoJSONOptions, PathOptions} from "leaflet";
import {Feature, FeatureCollection, MultiPolygon} from "geojson";
import {ParcelleQuery} from "@/types";

const props = defineProps({
  parcelle: {
    type: Object as PropType<ParcelleQuery['parcelle']>,
    required: true
  }
});

const svgMapElement = ref();
let map: L.DrawMap | null = null;

onMounted(() => {
  map = L.map(svgMapElement.value, {
    minZoom: 11,
    maxZoom: 23,
    bounceAtZoomLimits: false,
    maxBoundsViscosity: 1.0,
    zoomDelta: 1,
    wheelPxPerZoomLevel: 150
  });
  L.control.scale({metric: true, imperial: false}).addTo(map!);
  reloadMap();
});

watch(props, () => {
  reloadMap();
});

const reloadMap = () => {
  // Clearing all the map
  map!.eachLayer(function (layer) {
    map!.removeLayer(layer);
  });

  const features: Feature[] = [
    {
      type: 'Feature',
      geometry: props.parcelle.geom,
      properties: {
        "areatype": props.parcelle?.__typename,
      }
    },
  ];

  features.push(...props.parcelle.inside.map((inp) => ({
      type: 'Feature' as 'Feature',
      geometry: 'polygonGeom' in inp ? inp.polygonGeom : 'lineStringGeom' in inp ? inp.lineStringGeom : null,
      properties: {
        "areatype": inp.__typename,
        "area": 'area' in inp ? inp.area : null,
        "length": 'length' in inp ? inp.length : null,
        "usage1":  'usage1' in inp ? inp.usage1 : null,
        "usage2":  'usage2' in inp ? inp.usage2 : null,
        "essence":  'essence' in inp ? inp.essence : null,
      }
    })
  ));

  features.sort((a, b) => {
    if(a.properties?.areatype === 'RiverInParcelle' || b.properties?.areatype === 'RiverInParcelle') {
      return a.properties?.areatype === 'RiverInParcelle' ? 1 : -1;
    }
    if(a.properties?.areatype === 'BuildingInParcelle' || b.properties?.areatype === 'BuildingInParcelle') {
      return a.properties?.areatype === 'BuildingInParcelle' ? 1 : -1;
    }
    if(a.properties?.areatype === 'ForestInParcelle' || b.properties?.areatype === 'ForestInParcelle') {
      return a.properties?.areatype === 'ForestInParcelle' ? 1 : -1;
    }
    if(a.properties?.areatype === 'PluInParcelle' || b.properties?.areatype === 'PluInParcelle') {
      return a.properties?.areatype === 'PluInParcelle' ? 1 : -1;
    }
    if(a.properties?.areatype === 'Parcelle' || b.properties?.areatype === 'Parcelle') {
      return a.properties?.areatype === 'Parcelle' ? 1 : -1;
    }
    return -1;
  })

  const geojson: FeatureCollection = {
    type: 'FeatureCollection',
    features,
  };

  var baseStyle: PathOptions = {
    stroke: true,
    weight: 1,
    "fillOpacity": 1.00,
  };
  var myStyle: GeoJSONOptions['style'] = (feature) => {
    switch (feature?.properties.areatype) {
      case 'Parcelle':
        return {fillColor: "#5DAE5D", color: "#409940", ...baseStyle};
      case 'ForestInParcelle':
        return {fillColor: "#006600", color: "#0a3b0a", ...baseStyle};
      case 'BuildingInParcelle':
        return {fillColor: "#7A7A7A", color: "#191a19", ...baseStyle};
      case 'RiverInParcelle':
        return {color: "#9898ff", ...baseStyle};
      case 'PluInParcelle':
        return {
          // color: "#d9f0a3",
          // stroke: true,
          // fill: true,
          // weight: 1,
          // "fillOpacity": 0.20,
          // className: `parcel-fill-pattern`
        };
      default:
        return baseStyle;
    }
  }

  const parcelleGeoJson = geojson.features.find((f): f is Feature<MultiPolygon> => f.properties?.areatype == 'Parcelle')?.geometry.coordinates[0][0];

  const mapCenter = props.parcelle?.center.coordinates;
  const mapZoom = props.parcelle?.area < 500 ? 19 : props.parcelle?.area < 1500 ? 18 : props.parcelle?.area < 10000 ? 17 : props.parcelle?.area < 100000 ? 16 : props.parcelle?.area < 1000000 ? 15 : 14;
  const extraBound = props.parcelle?.area < 500 ? 0.0002 : props.parcelle?.area < 1500 ? 0.0005 : props.parcelle?.area < 10000 ? 0.001 : props.parcelle?.area < 100000 ? 0.005 : props.parcelle?.area < 1000000 ? 0.01 : 0.02;
  const lngs = parcelleGeoJson?.map((p) => p[0]) ?? [0];
  const lats = parcelleGeoJson?.map((p) => p[1]) ?? [0];
  const southWest = L.latLng(Math.min(...lats) - extraBound, Math.max(...lngs) + extraBound);
  const northEast = L.latLng(Math.max(...lats) + extraBound, Math.min(...lngs) - extraBound);

  map?.setView([mapCenter[1], mapCenter[0]], mapZoom);
  map?.setMaxBounds(L.latLngBounds(southWest, northEast));


  L.geoJSON(geojson, {
    
    onEachFeature: function (feature, layer) {
      let description = '';
      if(feature.properties.areatype === 'BuildingInParcelle') {
        description += 'Batiment <br/>'
        description += 'Usage:' + (feature.properties.usage1 ?? 'Inconnu')
        if(feature.properties.usage2) {
          description += '/' + feature.properties.usage2
        }
        description += ' <br/>'
      }
      if(feature.properties.areatype === 'ForestInParcelle') {
        description += 'Foret <br/>'
        description += 'Essence:' + feature.properties.essence + ' <br/>'
      }
      if(feature.properties.areatype === 'RiverInParcelle') {
        description += 'Rivière <br/>'
      }
      if(feature?.properties.area) {
        description += String(Math.round(feature.properties.area*100)/100) + ' m²';
      }
      if(feature?.properties.length) {
        description += String(Math.round(feature.properties.length*100)/100) + ' m';
      }
      if(description) {
        // Idk why bindTooltip doesn't work
        // layer.bindTooltip(description, {direction: 'top'});
        layer.bindPopup(description);
      }
    },
    style: myStyle
  }).addTo(map!);
};

</script>

<style scoped lang="scss">
#svgcontainer {
  height: 200px;
  width: 200px;
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

