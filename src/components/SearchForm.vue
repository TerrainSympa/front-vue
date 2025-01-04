<template>
<div v-if="showComponent">
  <div class="tw-flex tw-items-center tw-justify-center">
    <div class="tw-w-11/12 tw-bg-white tw-fixed tw-top-0 tw-pt-4 tw-pb-4 tw-overflow-auto tw-z-50 tw-transition-shadow tw-duration-300" :class="{ 'tw-shadow-md': !props.isOnTop }" >
      <div class="column tw-items-center">
        <div class="col">
          <q-btn :outline="!searchEnabled" color="secondary" label="Lancer la recherche" @click="search()" :disable="!searchEnabled">
            <q-tooltip v-if="!searchEnabled" class="bg-accent">{{showInput.value === 'communes' ? $t('tooltip.select.commune') : showInput.value === 'area' ? $t('tooltip.select.area') : ''}}</q-tooltip>
          </q-btn>
        </div>
      </div>
    </div>
  </div>

  <h5 class="text-center tw-pt-6">{{$t('searchbar.search.area.title')}}</h5>

  <div class="q-pa-md">
      <q-select
        filled
        v-model="showInput"
        :options="options"
        label="Rechercher par"
        color="dark"
        @update:model-value="toggleInputs"
      >
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps">
            <q-item-section avatar>
              <q-icon :name="scope.opt.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ scope.opt.label }}</q-item-label>
              <q-item-label caption>{{ scope.opt.description }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-select>
  </div>

  <div v-if="showInput.value === 'communes'" class="q-pa-md" v-show="showInput.value === 'communes'">
    <q-select
        filled
        v-model="communesInput"
        use-chips
        multiple
        :options="listCommunesFiltered"
        use-input
        @filter="filterFn"
        :label="$t('searchbar.search.commune.title')"
        color="black"
    />
    <div v-if="communesInput && communesInput.length === 1">
      <q-badge color="secondary">
        {{communeRange > 0 ? ($t('searchbar.search.commune.range.fill', {radius: communeRange, metric: 'km'})) : $t('searchbar.search.commune.range.empty', {commune: communesInput[0].label ?? ''})}}
      </q-badge>
      <q-slider
          v-model="communeRange"
          color="green"
          :step="5"
          :max="100"
          label
      />
    </div>
  </div>
  <div v-else-if="showInput.value === 'area'" class="q-pa-md">
    <p class="text-center">{{$t('searchbar.search.area.hint')}}</p>
  </div>
  <div v-else-if="showInput.value === 'id'" class="q-pa-md">
    <q-input type="text" outlined v-model="parcelleIdInput" :label="$t('searchbar.search.slugInput')" color="black" />
  </div>

  <h5 class="text-center">{{$t('searchbar.search.params.title')}}</h5>

  <div class="q-pa-md">
    <q-badge color="secondary">
      {{$t('searchbar.parcel.size')}} {{formatBadgeValue(parcelle.area, 'm2')}}
    </q-badge>
    <div class="row justify-between">
      <div class="col-5">
        <q-input type="number" outlined v-model.number="parcelle.area.min" label="Min" color="black" />
      </div>
      <div class="col-5">
        <q-input type="number" outlined v-model.number="parcelle.area.max" label="Max" color="black" />
      </div>
    </div>
  </div>

  <div class="q-pa-md">
    <q-badge color="secondary" class="q-mb-md">
      {{$t('searchbar.parcel.type')}}
    </q-badge>

    <q-select
        filled
        v-model="parcelle.type"
        multiple
        :options="typeParcelleOptions"
        use-chips
        stack-label
        emit-value
        map-options
        :label="$t('searchbar.parcel.type.select')"
        color="black"
    />
  </div>


  <q-expansion-item
      v-model="building.lookFor"
      :header-class="building.lookFor === null ? 'text-orange' : building.lookFor ? 'text-purple' : 'text-red'"
  >
    <template v-slot:header>
      <q-item-section avatar>
        <q-icon name="house" />
      </q-item-section>

      <q-item-section>
        <q-toggle toggle-indeterminate
                  v-model="building.lookFor"
                  :label="'Batiment: ' + (building.lookFor === null ? $t('maybe') : building.lookFor ? $t('yes') : $t('no'))"
                  :color="building.lookFor === null ? 'orange' : building.lookFor ? 'purple' : 'red'"
                  keep-color />
      </q-item-section>

    </template>
    <q-card>
      <q-card-section>

        <div class="q-pa-md">
          <q-badge color="secondary">
            {{$t('searchbar.building.size')}} {{formatBadgeValue(building.area, 'm2')}}
          </q-badge>
          <div class="row justify-between">
            <div class="col-5">
              <q-input type="number" outlined v-model.number="building.area.min" label="Min" color="black" />
            </div>
            <div class="col-5">
              <q-input type="number" outlined v-model.number="building.area.max" label="Max" color="black" />
            </div>
          </div>
        </div>

        <div class="q-pa-md">
          <q-badge color="secondary" class="q-mb-md">
            {{$t('searchbar.building.usage')}}
          </q-badge>

          <q-select
              filled
              v-model="building.usage"
              multiple
              :options="usageBuildingOptions"
              use-chips
              stack-label
              emit-value
              map-options
              :label="$t('searchbar.building.type.select')"
              color="black"
          />
        </div>

        <div class="q-pa-md">
          <q-badge color="secondary" class="q-mb-md">
            {{$t('searchbar.building.condition')}}
          </q-badge>

          <q-select
              filled
              v-model="building.condition"
              multiple
              :options="conditionBuildingOptions"
              use-chips
              stack-label
              emit-value
              map-options
              :label="$t('searchbar.building.type.select')"
              color="black"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-expansion-item>


<!--  <q-slide-transition>-->
<!--    <div v-show="expand">-->

  <q-expansion-item
      v-model="forest.lookFor"
      :header-class="forest.lookFor === null ? 'text-orange' : forest.lookFor ? 'text-green' : 'text-red'"
  >
    <template v-slot:header>
      <q-item-section avatar>
        <q-icon name="forest" />
      </q-item-section>

      <q-item-section>
        <q-toggle toggle-indeterminate
                  v-model="forest.lookFor"
                  :label="'Foret: ' + (forest.lookFor === null ? $t('maybe') : forest.lookFor ? $t('yes') : $t('no'))"
                  :color="forest.lookFor === null ? 'orange' : forest.lookFor ? 'green' : 'red'"
                  keep-color />
      </q-item-section>

    </template>
    <q-card>
      <q-card-section>
        <div class="q-pa-md">
          <q-badge color="secondary">
            {{$t('searchbar.forest.size')}} {{formatBadgeValue(forest.area, 'm2')}}
          </q-badge>

          <div class="row justify-between">
            <div class="col-5">
              <q-input type="number" outlined v-model.number="forest.area.min" label="Min" color="black" />
            </div>
            <div class="col-5">
              <q-input type="number" outlined v-model.number="forest.area.max" label="Max" color="black" />
            </div>
          </div>
        </div>

        <div class="q-pa-md">
          <q-badge color="secondary" class="q-mb-md">
            {{$t('searchbar.forest.essence')}}
          </q-badge>

          <q-select
              filled
              v-model="forest.essence"
              multiple
              :options="essenceForestOptions"
              use-chips
              stack-label
              emit-value
              map-options
              :label="$t('searchbar.forest.essence.select')"
              color="black"
          />
        </div>

        <div class="q-pa-md">
          <q-badge color="secondary" class="q-mb-md">
            {{$t('searchbar.forest.type')}}
          </q-badge>

          <q-select
              filled
              v-model="forest.type"
              multiple
              :options="typeForestOptions"
              use-chips
              stack-label
              emit-value
              map-options
              :label="$t('searchbar.forest.type.select')"
              color="black"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-expansion-item>


  <q-expansion-item
      v-model="river.lookFor"
      :header-class="river.lookFor === null ? 'text-orange' : river.lookFor ? 'text-blue' : 'text-red'"
  >
    <template v-slot:header>
      <q-item-section avatar>
        <q-icon name="water" />
      </q-item-section>

      <q-item-section>
        <q-toggle toggle-indeterminate
                  v-model="river.lookFor"
                  :label="'Rivière: ' + (river.lookFor === null ? $t('maybe') : river.lookFor ? $t('yes') : $t('no'))"
                  :color="river.lookFor === null ? 'orange' : river.lookFor ? 'blue' : 'red'"
                  keep-color />
      </q-item-section>

    </template>
    <q-card>
      <q-card-section>
        <div class="q-pa-md">
          <q-badge color="secondary">
            {{ $t('searchbar.river.length') }} {{formatBadgeValue(river.length, 'm')}}
          </q-badge>

          <div class="row justify-between">
            <div class="col-5">
              <q-input type="number" outlined v-model.number="river.length.min"  label="Min" color="black" />
            </div>
            <div class="col-5">
              <q-input type="number" outlined v-model.number="river.length.max" label="Max" color="black" />
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-expansion-item>

</div>
<div class="row justify-center full-height full-width items-center overflow-hidden" v-else>
    <q-spinner
        color="secondary"
        size="6em"
        style="height: 100%"
    />
</div>
</template>
<script setup lang="ts">
import {
  SearchQueryVariables,
  useCommunesListQuery,
  useSearchParamsQuery
} from "@/types";
import {inject, reactive, Ref, ref, toRefs, watch} from 'vue';
import {Emitter} from "mitt";
import {useI18n} from "vue-i18n";
import {useSearchFiltersStore, useSearchResultsStore} from "@/store/authStore";
const props = defineProps({
  isOnTop:{ type: Boolean, required: true },
})

const storeFilters = useSearchFiltersStore();
const storeResult = useSearchResultsStore();

const {search} = storeResult;
const {parcelle, building, forest, river, searchingArea} = toRefs(storeFilters)

const emitter: Emitter<any> | undefined = inject('$emitter');
const {t} = useI18n();


emitter?.on('search-done', (evt) => {
  searchEnabled.value = true;
})

emitter?.on('area-draw', (evt) => {
  searchEnabled.value = true;
})
emitter?.on('area-cleared', (evt) => {
  searchEnabled.value = false;
})

const formatBadgeValue = (data: {min: string | number | undefined, max: string | number | undefined}, unit: 'm' | 'm2' = 'm2'): string => {
  if(!data.min && !data.max) {
    return '';
  }
  if(data.min && data.max) {
    return t('from') + ' ' + data.min + ' ' + t('to') + ' ' + data.max + ' ' + unit;
  }
  if(data.min) {
    return ': min ' + data.min + ' ' + unit;
  }
  return ': max ' + data.max + ' ' + unit;
};
const formatInput = (data: {min: string | number | undefined, max: string | number | undefined}) => {
  return {min: data.min ? Number(data.min) : undefined, max: data.max ? Number(data.max) : undefined}
};
const expandSearch = () => {
  expand.value = !expand.value;
};

const searchEnabled = ref(false);
const expand = ref(false);

const typeParcelleOptions: Ref<{label: string, value: string | number}[]> = ref([]);
const usageBuildingOptions: Ref<{label: string, value: string | number}[]> = ref([]);
const conditionBuildingOptions: Ref<{label: string, value: string | number}[]> = ref([]);
const essenceForestOptions: Ref<{label: string, value: string | number}[]> = ref([]);
const typeForestOptions: Ref<{label: string, value: string | number}[]> = ref([]);
const listCommunes: Ref<{label: string, value: number}[]> = ref([]);
const listCommunesFiltered: Ref<{label: string, value: number}[]> = ref([]);
const showComponent = ref(false);
const communesInput: Ref<null | {label: string, value: number}[]> = ref(null);
const parcelleIdInput = ref('');
const communeRange = ref(0);

const options = [
  {
    label: 'Zone',
    value: 'area',
    description: 'Sur la carte',
    icon: 'map'
  },
  {
    label: 'Communes',
    value: 'communes',
    description: 'Une ou plusieurs communes',
    icon: 'house'
  },
  {
    label: 'Identifiant',
    value: 'id',
    description: 'Identifiant de la parcelle',
    icon: 'tag'
  },
]

const showInput = ref(options[0]);

const toggleInputs = (newVal: typeof options[0]) => {
  if (newVal.value === 'communes') {
    updateSearchingArea();
    searchEnabled.value = !!communesInput.value?.length;
    emitter?.emit('search-area', { 'show': false });
  }
  if (newVal.value === 'area') {
    searchEnabled.value = false;
    emitter?.emit('search-area', {'show': true});
  }
  if (newVal.value === 'id') {
    searchEnabled.value = !!parcelleIdInput.value.length;
    emitter?.emit('search-area', {'show': false});
  }
}

toggleInputs(showInput.value);

const filterFn = (val: any, update: any) => {
  if (val === '') {
    update(() => {
      listCommunesFiltered.value = listCommunes.value;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase()
    listCommunesFiltered.value = listCommunes.value.filter(v => v.label.toLowerCase().indexOf(needle) > -1);
  });
};

function updateSearchingArea() {
  searchEnabled.value = !!communesInput.value?.length || !!parcelleIdInput.value.length;
  searchingArea!.value = {};
  if(communesInput.value?.length && showInput.value.value === 'communes') {
    if(communesInput.value?.length === 1) {
      searchingArea!.value.commune = {
        commune: String(communesInput.value[0].value),
        radius: communeRange.value,
      }
    } else {
      searchingArea!.value.communes = communesInput.value.map((v) => String(v.value));
    }
  } else if (showInput.value.value === 'id') {
    searchingArea.value.idu = parcelleIdInput;
    emitter?.emit('selected-parcel', parcelleIdInput);
  }
}

watch(communesInput, (val) => {
  updateSearchingArea();
});

watch(parcelleIdInput, (val) => {
  updateSearchingArea();
});

watch(communeRange, (val) => {
  updateSearchingArea();
});

useSearchParamsQuery( {enabled: true, fetchPolicy: 'no-cache'}).onResult((res) => {
  if(res.data && res.data.searchParameters) {
    typeParcelleOptions.value = res.data.searchParameters.pluType.map((t) => ({label: t.label, value: t.idPlu}));
    usageBuildingOptions.value = res.data.searchParameters.buildingUsage.map((t) => ({label: t.label, value: t.idBuildingUsage}));
    conditionBuildingOptions.value = res.data.searchParameters.buildingCondition.map((t) => ({label: t.label, value: t.idBuildingCondition}));
    essenceForestOptions.value = res.data.searchParameters.forestEssence.map((t) => ({label: t.label, value: t.idForest}));
    typeForestOptions.value = res.data.searchParameters.forestType.map((x) => ({label: x.label, value: x.idForest}));
    showComponent.value = true;
  }
});
useCommunesListQuery( {enabled: true}).onResult((res) => {
  if(res.data && res.data.communesList) {
    listCommunes.value = res.data.communesList.map((c) => ({value: c.gid, label: c.full_name}));
    listCommunesFiltered.value = res.data.communesList as any; // TODO
  }
});

</script>
