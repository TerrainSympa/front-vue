import { defineStore } from 'pinia'
import {
  ParcelleQuery,
  SearchQuery,
  SearchQueryVariables,
  useParcelleQuery,
  useSearchLazyQuery,
  useSearchQuery,
} from '@/types'
import { provideApolloClient } from '@vue/apollo-composable'
import { apolloClient } from '@/apollo'
import {Notify} from "quasar";
import i18n from '../plugins/i18n'

export const useSearchFiltersStore = defineStore('filters', {
  state: () => {
    return {
      parcelle: {
        lookFor: true,
        area: {
          min: 50,
          max: 1000,
        },
        type: [],
      },
      building: {
        lookFor: null,
        area: {
          min: undefined,
          max: undefined,
        },
        condition: [],
        usage: [],
      },
      forest: {
        lookFor: null,
        area: {
          min: undefined,
          max: undefined,
        },
        type: [],
        essence: [],
      },
      river: {
        lookFor: null,
        length: {
          min: undefined,
          max: undefined,
        },
      },
      searchingArea: {
        communes: [],
        commune: undefined,
        idu: '',
      },
      pagination: {
        take: 100,
      }
    } as SearchQueryVariables & { searchingArea?: { idu: string } }
  },
})

export const useSearchResultsStore = defineStore('results', {
  state: () => {
    return {
      results: [] as SearchQuery['search'] | ParcelleQuery['parcelle'],
      pending: false,
    }
  },
  actions: {
    search() {
      provideApolloClient(apolloClient)
      const searchFilterStore = useSearchFiltersStore()
      const { onResult } =
        (searchFilterStore.$state.searchingArea?.idu?.length ?? 0) > 0
          ? useParcelleQuery({
              idu: searchFilterStore.$state.searchingArea!.idu,
            })
          : useSearchQuery(searchFilterStore.$state)
      this.$state.pending = true
      onResult((data) => {
        if(data.data) {
          this.$state.results = 'search' in data.data ? data.data.search : data.data.parcelle
          this.$state.pending = false
          if('search' in data.data && data.data.search.length === 100) {
            Notify.create({
              message: i18n.global.t('search.limit_reached')
            })
          }
          if('search' in data.data && data.data.search.length === 0) {
            Notify.create({
              message: i18n.global.t('search.no_result')
            })
          }
        }
      })
    },
  },
})
