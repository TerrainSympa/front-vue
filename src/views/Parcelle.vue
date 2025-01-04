<template>

<div v-if="result && !loading">

<div class="row justify-center">
  <div class="col-8">
    <geo-svg :parcelle="result.parcelle" />
  </div>
</div>
  <div style="overflow: auto; height: 100%;">
  <q-list>
    <q-item clickable v-ripple @click="copyValue(queryParams.idu)">
      <q-item-section avatar>
        <q-icon color="secondary" name="tag" />
      </q-item-section>
      <q-item-section>{{ queryParams.idu }}</q-item-section>
      <q-tooltip anchor="center right" self="center middle" class="bg-accent">{{$t('tooltip.parcelle.number')}}</q-tooltip>
    </q-item>
    <q-item clickable v-ripple @click="copyValue(result.parcelle.area)">
      <q-item-section avatar>
        <q-icon color="secondary" name="crop" />
      </q-item-section>
      <q-item-section>{{Math.round(result.parcelle.area*100)/100}} m²</q-item-section>
      <q-tooltip anchor="center right" self="center middle" class="bg-accent">{{$t('tooltip.parcelle.area')}}</q-tooltip>
    </q-item>

    <q-item clickable v-ripple>
      <q-item-section avatar>
        <q-icon color="secondary" name="place" />
      </q-item-section>
      <q-item-section>
        <q-list dense>
          <q-item v-ripple>
            <q-item-section @click="copyValue(coordinatesString)">
              {{coordinatesString}}
            </q-item-section>
          </q-item>
          <q-item v-ripple>
            <q-item-section @click="address ? copyValue(address) : null">
              <q-btn
                  v-if="!address"
                  dense
                  color="secondary"
                  size="ms"
                  label="Voir l'adresse"
                  :loading="loadingAddress"
                  @click="getAddress"
              />
              <p v-else>{{address}}</p>
            </q-item-section>
          </q-item>
        </q-list>
      </q-item-section>
      <q-tooltip anchor="bottom middle" self="top middle" class="bg-accent">{{$t('tooltip.parcelle.coordinates')}}</q-tooltip>
    </q-item>


    <q-expansion-item
        v-if="result.parcelle.commune"
        header-class="text-green"
        icon="location_city"
        :label="result.parcelle.commune.full_name"
        caption="Voir les détails"
    >
      <q-card>
        <q-card-section>
          <q-item clickable v-ripple @click="copyValue(result.parcelle.commune.email)">
            <q-item-section avatar>
              <q-icon color="secondary" name="mail" />
            </q-item-section>
            <q-item-section>{{result.parcelle.commune.email}}</q-item-section>
            <q-tooltip anchor="bottom middle" self="bottom middle" class="bg-accent">{{$t('tooltip.parcelle.commune')}}</q-tooltip>
          </q-item>
          <q-item clickable v-ripple @click="copyValue(result.parcelle.commune.numero)">
            <q-item-section avatar>
              <q-icon color="secondary" name="phone" />
            </q-item-section>
            <q-item-section>{{result.parcelle.commune.numero}}</q-item-section>
            <q-tooltip anchor="bottom middle" self="bottom middle" class="bg-accent">{{$t('tooltip.parcelle.commune')}}</q-tooltip>
          </q-item>
          <q-item clickable v-ripple @click="copyValue(result.parcelle.commune.site)">
            <q-item-section avatar>
              <q-icon color="secondary" name="web" />
            </q-item-section>
            <q-item-section>{{result.parcelle.commune.site}}</q-item-section>
            <q-tooltip anchor="bottom middle" self="bottom middle" class="bg-accent">{{$t('tooltip.parcelle.commune')}}</q-tooltip>
          </q-item>
        </q-card-section>
      </q-card>
    </q-expansion-item>

    <q-item clickable v-ripple @click="copyValue(plus.length ? plus[0].libelle + ': ' + plus[0].libelong : 'Inconnu')">
      <q-item-section avatar>
        <q-icon color="secondary" name="map" />
      </q-item-section>
      <q-item-section>
        {{plus.length ? plus[0].libelle + ': ' + plus[0].libelong : 'Inconnu'}}
      </q-item-section>
      <q-tooltip anchor="center right" self="center middle" class="bg-accent">{{$t('tooltip.parcelle.plu')}}</q-tooltip>
    </q-item>

    <q-expansion-item
        expand-separator
        header-class="text-purple"
        icon="house"
        :label="buildings.length === 0 ? 'Batiments' : ('Batiments (' + buildings.length + ')')"
        :caption="result.parcelle.areaBuilding === 0 ? 'Pas de batiment' : (Math.round((result.parcelle.areaBuilding) * 100)/100) + ' m² (' + Math.round((result.parcelle.areaBuildingPercentage) * 10000)/100 + '%)'"
        :disable="buildings.length === 0"
    >
      <q-card>
        <q-card-section>
          <q-item v-for="(building, index) in buildings" clickable v-ripple>
            <q-item-section>
              <q-list dense>
                <q-item v-ripple>
                  <q-item-section>
                    Batiment {{index + 1}}:
                  </q-item-section>
                </q-item>

                <q-item v-ripple>
                  <q-item-section>
                    Taille: {{Math.round((building.area) * 100)/100}} m²
                  </q-item-section>
                </q-item>

                <q-item v-ripple>
                  <q-item-section>
                    Usage: {{building.usage1 ?? 'Inconnu'}} / {{building.usage2 ?? 'Inconnu'}}
                  </q-item-section>
                </q-item>

                <q-item v-ripple>
                  <q-item-section>
                    Année de construction: {{building.dateConstruction?.split('-')[0] ?? 'Inconnu'}}
                  </q-item-section>
                </q-item>

                <q-item v-ripple>
                  <q-item-section>
                    Leger: {{building.leger ?? 'Inconnu'}}
                  </q-item-section>
                </q-item>
                <q-item v-ripple>
                  <q-item-section>
                    Etat: {{building.etat ?? 'Inconnu'}}
                  </q-item-section>
                </q-item>
                <q-item v-ripple>
                  <q-item-section>
                    Nature: {{building.nature ?? 'Inconnu'}}
                  </q-item-section>
                </q-item>
                <q-item v-ripple>
                  <q-item-section>
                    Matière toiture: {{building.materialRoof ?? 'Inconnu'}}
                  </q-item-section>
                </q-item>
                <q-item v-ripple>
                  <q-item-section>
                    Matière murs: {{building.materialWall ?? 'Inconnu'}}
                  </q-item-section>
                </q-item>
                <q-item v-ripple>
                  <q-item-section>
                    Origine: {{building.origin ?? 'Inconnu'}}
                  </q-item-section>
                </q-item>
                <q-item v-ripple>
                  <q-item-section>
                    Nombre etage: {{building.nbFloor}}
                  </q-item-section>
                </q-item>
                <q-item v-ripple>
                  <q-item-section>
                    Nombre logements: {{building.nbHousing}}
                  </q-item-section>
                </q-item>
                <q-item v-ripple>
                  <q-item-section>
                    Hauteur: {{building.height === 0 ? 'Inconnu' : building.height}}
                  </q-item-section>
                </q-item>
              </q-list>
            </q-item-section>
          </q-item>
        </q-card-section>
      </q-card>
    </q-expansion-item>

    <q-expansion-item
        expand-separator
        header-class="text-green"
        icon="forest"
        :label="forests.length === 0 ? 'Forets' : ('Forets (' + forests.length + ')')"
        :caption="result.parcelle.areaForest === 0 ? 'Pas de forets' : (Math.round((result.parcelle.areaForest) * 100)/100) + ' m² (' + Math.round((result.parcelle.areaForestPercentage) * 10000)/100 + '%)'"
        :disable="forests.length === 0"
    >
      <q-card>
        <q-card-section>
          <q-item v-for="(forest, index) in forests" clickable v-ripple>
            <q-item-section>
              <q-list dense>
                <q-item v-ripple>
                  <q-item-section>
                    Foret {{index + 1}}:
                  </q-item-section>
                </q-item>
                <q-item v-ripple>
                  <q-item-section>
                    Taille: {{Math.round((forest.area) * 100)/100}} m²
                  </q-item-section>
                </q-item>
                <q-item v-ripple>
                  <q-item-section>
                    Type: {{forest.type}}
                  </q-item-section>
                </q-item>
                <q-item v-ripple>
                  <q-item-section>
                    Essence: {{forest.essence}}
                  </q-item-section>
                </q-item>
                <q-item v-ripple>
                  <q-item-section>
                    Composition: {{forest.composition}}
                  </q-item-section>
                </q-item>

              </q-list>
            </q-item-section>
          </q-item>
        </q-card-section>
      </q-card>
    </q-expansion-item>

    <q-expansion-item
        expand-separator
        header-class="text-blue"
        icon="water"
        label="Rivière"
        :label="rivers.length === 0 ? 'Rivières' : ('Rivières (' + rivers.length + ')')"
        :caption="result.parcelle.riverLength === 0 ? 'Pas de rivière' : (Math.round((result.parcelle.riverLength) * 100)/100) + ' m'"
        :disable="rivers.length === 0"
    >
      <q-card>
        <q-card-section>
          <q-item v-for="(river, index) in rivers" clickable v-ripple>
            <q-item-section>
              <q-list dense>
                <q-item v-ripple>
                  <q-item-section>
                    Rivière {{index + 1}}:
                  </q-item-section>
                </q-item>
                <q-item v-ripple>
                  <q-item-section>
                    Nom: {{river.toponyme}}
                  </q-item-section>
                </q-item>
                <q-item v-ripple>
                  <q-item-section>
                    Importance: {{river.importance}} / 6
                  </q-item-section>
                </q-item>
              </q-list>
            </q-item-section>
          </q-item>
        </q-card-section>
      </q-card>
    </q-expansion-item>

  </q-list>
  </div>
</div>
<div class="row justify-center full-height full-width items-center" v-else>
  <p class="text-center">
    <div v-if="!loading">
      {{$t('parcelle.empty')}}
    </div>
    <div v-else="loading">
      <q-spinner
          color="secondary"
          size="6em"
          style="height: 100%"
      />
    </div>
  </p>
</div>
</template>

<script setup lang="ts">
    import GeoSvg from '../components/GeoSvg.vue'
    import {useParcelleQuery} from '@/types'
    import { inject, reactive, ref } from "vue";
    import { useRoute } from 'vue-router';
    import {copyToClipboard, useQuasar} from 'quasar'
    import {Emitter} from "mitt";
    import {computed} from "@vue/runtime-core";
    import axios from "axios";

    const address = ref('');
    const loadingAddress = ref(false);
    const apiAddress = (coords: {lon: number; lat: number}) => {
      return `https://api-adresse.data.gouv.fr/reverse/?lon=${coords.lon}&lat=${coords.lat}`
    }
    const $q = useQuasar()
    const emitter: Emitter<any> | undefined = inject('$emitter');
    const route = useRoute()
    const queryOptions = reactive({enabled: false, fetchPolicy: 'network-only' });
    const queryParams = reactive({idu: Array.isArray(route.params.id) ? route.params.id[0] : route.params.id ?? ''});
    let { result, query, refetch, loading } = useParcelleQuery(queryParams, queryOptions);
    emitter?.on('selected-parcel', async (evt: string | undefined) => {
      queryOptions.enabled = true
      queryParams.idu = evt ?? ''
      await refetch();
    });

    const buildings = computed(() => result.value?.parcelle.inside.filter((i): i is Extract<typeof i, {__typename: 'BuildingInParcelle'}> => i.__typename === 'BuildingInParcelle').sort((a, b) => (b.area ?? 0) - (a.area ?? 0)));
    const forests = computed(() => result.value?.parcelle.inside.filter((i): i is Extract<typeof i, {__typename: 'ForestInParcelle'}> => i.__typename === 'ForestInParcelle').sort((a, b) => (b.area ?? 0) - (a.area ?? 0)));
    const plus = computed(() => result.value?.parcelle.inside.filter((i): i is Extract<typeof i, {__typename: 'PluInParcelle'}> => i.__typename === 'PluInParcelle').sort((a, b) => (b.area ?? 0) - (a.area ?? 0)));
    const rivers = computed(() => result.value?.parcelle.inside.filter((i): i is Extract<typeof i, {__typename: 'RiverInParcelle'}> => i.__typename === 'RiverInParcelle').sort((a, b) => (b.length ?? 0) - (a.length ?? 0)));
    const coordinatesString = computed(() => result.value?.parcelle.center.coordinates[1] + ' ' + result.value?.parcelle.center.coordinates[0]);
    const copyValue = (val: string) => {
      copyToClipboard(val)
      $q.notify({
        message: 'Valeur copiée',
        color: 'green',
        position: 'top'
      })
    }
    const getAddress = async () => {
      if(loadingAddress.value) {
        return;
      }
      loadingAddress.value = true;
      const lat = result.value?.parcelle.center.coordinates[1] ?? 0;
      const lon = result.value?.parcelle.center.coordinates[0] ?? 0;
      // For some reason does not work with fetch
      const {data, status} = await axios.get(apiAddress({lon, lat}));
      if(status === 200 && data.features.length && data.features[0].properties) {
        address.value = data.features[0].properties.label;
      }
      loadingAddress.value = false;
    };

</script>
