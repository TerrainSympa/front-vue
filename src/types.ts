import {MultiPolygon, Point, MultiLineString} from "geojson";
import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import * as VueCompositionApi from '@vue/composition-api';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type ReactiveFunction<TParam> = () => TParam;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Email: any;
  GeoJSONMultiLineStringScalar: any;
  GeoJSONMultiPolygonScalar: MultiPolygon;
  GeoJSONPointScalar: Point;
  PhoneNumber: any;
  WebsiteUrl: any;
};

/** Area input */
export type AreaInput = {
  circle?: InputMaybe<Circle>;
  commune?: InputMaybe<CommuneInput>;
  communes?: InputMaybe<Array<Scalars['String']>>;
  polygon?: InputMaybe<Polygon>;
};

/** Tell whether you want area as metric or percentage of the parcel */
export enum AreaType {
  Metric = 'Metric',
  Percentage = 'Percentage'
}

/** Base search args */
export type BaseSearchArgs = {
  area?: InputMaybe<MinMax>;
  lookFor?: InputMaybe<Scalars['Boolean']>;
  type?: InputMaybe<Array<Scalars['Int']>>;
};

export type Building = {
  __typename?: 'Building';
  dateConstruction?: Maybe<Scalars['DateTime']>;
  dep: Scalars['String'];
  etat?: Maybe<Scalars['String']>;
  geom?: Maybe<Scalars['GeoJSONMultiPolygonScalar']>;
  gid: Scalars['ID'];
  height?: Maybe<Scalars['Float']>;
  leger?: Maybe<Scalars['Boolean']>;
  materialRoof?: Maybe<Scalars['String']>;
  materialWall?: Maybe<Scalars['String']>;
  nature?: Maybe<Scalars['String']>;
  nbFloor?: Maybe<Scalars['Int']>;
  nbHousing?: Maybe<Scalars['Int']>;
  origin?: Maybe<Scalars['String']>;
  usage1?: Maybe<Scalars['String']>;
  usage2?: Maybe<Scalars['String']>;
};

export type BuildingInParcelle = IInParcelle & {
  __typename?: 'BuildingInParcelle';
  area?: Maybe<Scalars['Float']>;
  dateConstruction?: Maybe<Scalars['DateTime']>;
  dep: Scalars['String'];
  etat?: Maybe<Scalars['String']>;
  geom?: Maybe<Scalars['GeoJSONMultiPolygonScalar']>;
  gid: Scalars['ID'];
  height?: Maybe<Scalars['Float']>;
  leger?: Maybe<Scalars['Boolean']>;
  materialRoof?: Maybe<Scalars['String']>;
  materialWall?: Maybe<Scalars['String']>;
  nature?: Maybe<Scalars['String']>;
  nbFloor?: Maybe<Scalars['Int']>;
  nbHousing?: Maybe<Scalars['Int']>;
  origin?: Maybe<Scalars['String']>;
  parcelleGid: Scalars['ID'];
  usage1?: Maybe<Scalars['String']>;
  usage2?: Maybe<Scalars['String']>;
};

/** Building search args */
export type BuildingSearchArgs = {
  area?: InputMaybe<MinMax>;
  condition?: InputMaybe<Array<Scalars['Int']>>;
  lookFor?: InputMaybe<Scalars['Boolean']>;
  type?: InputMaybe<Array<Scalars['Int']>>;
  usage?: InputMaybe<Array<Scalars['Int']>>;
};

/** Circle input */
export type Circle = {
  center: LatLng;
  radius: Scalars['Float'];
};

export type Commune = {
  __typename?: 'Commune';
  dep: Scalars['String'];
  email?: Maybe<Scalars['Email']>;
  full_name: Scalars['String'];
  geom: Scalars['GeoJSONMultiPolygonScalar'];
  gid: Scalars['Int'];
  insee_com: Scalars['String'];
  nom: Scalars['String'];
  numero?: Maybe<Scalars['PhoneNumber']>;
  population: Scalars['Float'];
  postal_code?: Maybe<Scalars['String']>;
  site?: Maybe<Scalars['WebsiteUrl']>;
};

/** Commune input */
export type CommuneInput = {
  commune: Scalars['String'];
  radius: Scalars['Float'];
};

export type Forest = {
  __typename?: 'Forest';
  composition?: Maybe<Scalars['String']>;
  dep: Scalars['String'];
  essence?: Maybe<Scalars['String']>;
  essence1?: Maybe<Scalars['String']>;
  essence2?: Maybe<Scalars['String']>;
  geom?: Maybe<Scalars['GeoJSONMultiPolygonScalar']>;
  gid: Scalars['ID'];
  type?: Maybe<Scalars['String']>;
};

export type ForestInParcelle = IInParcelle & {
  __typename?: 'ForestInParcelle';
  area?: Maybe<Scalars['Float']>;
  composition?: Maybe<Scalars['String']>;
  dep: Scalars['String'];
  essence?: Maybe<Scalars['String']>;
  essence1?: Maybe<Scalars['String']>;
  essence2?: Maybe<Scalars['String']>;
  geom?: Maybe<Scalars['GeoJSONMultiPolygonScalar']>;
  gid: Scalars['ID'];
  parcelleGid: Scalars['ID'];
  type?: Maybe<Scalars['String']>;
};

/** Forest search args */
export type ForestSearchArgs = {
  area?: InputMaybe<MinMax>;
  essence?: InputMaybe<Array<Scalars['Int']>>;
  lookFor?: InputMaybe<Scalars['Boolean']>;
  type?: InputMaybe<Array<Scalars['Int']>>;
};

export type IInParcelle = {
  gid: Scalars['ID'];
  parcelleGid: Scalars['ID'];
};

/** Filter by type in parcelle */
export enum InParcelleFilter {
  Building = 'Building',
  Forest = 'Forest',
  Plu = 'Plu',
  River = 'River'
}

/** LatLng input */
export type LatLng = {
  lat: Scalars['Float'];
  lng: Scalars['Float'];
};

/** Min max inputs */
export type MinMax = {
  max?: InputMaybe<Scalars['Float']>;
  min?: InputMaybe<Scalars['Float']>;
};

/** Pagination arguments */
export type PaginationArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};

export type Parcelle = {
  __typename?: 'Parcelle';
  area: Scalars['Float'];
  areaBuilding: Scalars['Float'];
  areaForest: Scalars['Float'];
  areaPlu: Scalars['Float'];
  center: Scalars['GeoJSONPointScalar'];
  commune: Commune;
  dep: Scalars['String'];
  geom: Scalars['GeoJSONMultiPolygonScalar'];
  gid: Scalars['ID'];
  idu: Scalars['String'];
  inside: Array<IInParcelle>;
  riverLength: Scalars['Float'];
};


export type ParcelleAreaBuildingArgs = {
  type?: InputMaybe<AreaType>;
};


export type ParcelleAreaForestArgs = {
  type?: InputMaybe<AreaType>;
};


export type ParcelleAreaPluArgs = {
  type?: InputMaybe<AreaType>;
};


export type ParcelleInsideArgs = {
  filter?: InputMaybe<Array<InParcelleFilter>>;
};

/** Forest search args */
export type ParcelleSearchArgs = {
  area?: InputMaybe<MinMax>;
  lookFor?: InputMaybe<Scalars['Boolean']>;
  type?: InputMaybe<Array<Scalars['Int']>>;
};

export type Plu = {
  __typename?: 'Plu';
  geom?: Maybe<Scalars['GeoJSONMultiPolygonScalar']>;
  gid: Scalars['ID'];
  gidPart: Scalars['ID'];
  libelle?: Maybe<Scalars['String']>;
  libelong?: Maybe<Scalars['String']>;
};

export type PluInParcelle = IInParcelle & {
  __typename?: 'PluInParcelle';
  area?: Maybe<Scalars['Float']>;
  geom?: Maybe<Scalars['GeoJSONMultiPolygonScalar']>;
  gid: Scalars['ID'];
  gidPart: Scalars['ID'];
  libelle?: Maybe<Scalars['String']>;
  libelong?: Maybe<Scalars['String']>;
  parcelleGid: Scalars['ID'];
};

/** Polygon input */
export type Polygon = {
  coordinates: Array<LatLng>;
};

export type Query = {
  __typename?: 'Query';
  communesList: Array<Commune>;
  parcelle?: Maybe<Parcelle>;
  pick?: Maybe<Parcelle>;
  search: Array<Parcelle>;
  searchParameters: SearchParameters;
  test: Array<Scalars['String']>;
};


export type QueryParcelleArgs = {
  idu: Scalars['String'];
};


export type QueryPickArgs = {
  coords: LatLng;
};


export type QuerySearchArgs = {
  building?: InputMaybe<BuildingSearchArgs>;
  forest?: InputMaybe<ForestSearchArgs>;
  pagination?: InputMaybe<PaginationArgs>;
  parcelle?: InputMaybe<ParcelleSearchArgs>;
  river?: InputMaybe<RiverSearchArgs>;
  searchingArea?: InputMaybe<AreaInput>;
};

export type River = {
  __typename?: 'River';
  geom?: Maybe<Scalars['GeoJSONMultiLineStringScalar']>;
  gid: Scalars['ID'];
  importance?: Maybe<Scalars['Int']>;
  toponyme?: Maybe<Scalars['String']>;
};

export type RiverInParcelle = IInParcelle & {
  __typename?: 'RiverInParcelle';
  geom?: Maybe<Scalars['GeoJSONMultiLineStringScalar']>;
  gid: Scalars['ID'];
  importance?: Maybe<Scalars['Int']>;
  length?: Maybe<Scalars['Float']>;
  parcelleGid: Scalars['ID'];
  toponyme?: Maybe<Scalars['String']>;
};

/** Forest search args */
export type RiverSearchArgs = {
  length?: InputMaybe<MinMax>;
  lookFor?: InputMaybe<Scalars['Boolean']>;
};

export type SearchParam = {
  __typename?: 'SearchParam';
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  label: Scalars['String'];
};

export type SearchParameters = {
  __typename?: 'SearchParameters';
  buildingCondition: Array<SearchParam>;
  buildingType: Array<SearchParam>;
  buildingUsage: Array<SearchParam>;
  forestEssence: Array<SearchParam>;
  forestType: Array<SearchParam>;
  pluType: Array<SearchParam>;
};

export type ParcelleQueryVariables = Exact<{
  idu: Scalars['String'];
}>;


export type ParcelleQuery = { __typename?: 'Query', parcelle?: { __typename: 'Parcelle', gid: string, geom: MultiPolygon, center: Point, area: number, areaBuilding: number, areaForest: number, areaPlu: number, riverLength: number, areaBuildingPercentage: number, areaForestPercentage: number, areaPluPercentage: number, commune: { __typename?: 'Commune', full_name: string, email?: any | null, numero?: any | null, site?: any | null }, inside: Array<{ __typename: 'BuildingInParcelle', gid: string, usage1?: string | null, usage2?: string | null, dateConstruction?: any | null, leger?: boolean | null, etat?: string | null, nature?: string | null, materialRoof?: string | null, materialWall?: string | null, origin?: string | null, nbFloor?: number | null, nbHousing?: number | null, height?: number | null, parcelleGid: string, area?: number | null, polygonGeom?: MultiPolygon | null } | { __typename: 'ForestInParcelle', gid: string, type?: string | null, essence?: string | null, essence1?: string | null, essence2?: string | null, composition?: string | null, parcelleGid: string, area?: number | null, polygonGeom?: MultiPolygon | null } | { __typename: 'PluInParcelle', libelle?: string | null, area?: number | null, libelong?: string | null, gid: string, polygonGeom?: MultiPolygon | null } | { __typename: 'RiverInParcelle', gid: string, toponyme?: string | null, importance?: number | null, parcelleGid: string, length?: number | null, lineStringGeom?: any | null }> } | null };

export type MyTestQueryVariables = Exact<{ [key: string]: never; }>;


export type MyTestQuery = { __typename?: 'Query', test: Array<string> };

export type SearchQueryVariables = Exact<{
  parcelle?: InputMaybe<ParcelleSearchArgs>;
  forest?: InputMaybe<ForestSearchArgs>;
  building?: InputMaybe<BuildingSearchArgs>;
  river?: InputMaybe<RiverSearchArgs>;
  searchingArea?: InputMaybe<AreaInput>;
  pagination?: InputMaybe<PaginationArgs>;
}>;


export type SearchQuery = { __typename?: 'Query', search: Array<{ __typename?: 'Parcelle', gid: string, idu: string, area: number, geom: MultiPolygon, center: Point }> };

export type PickQueryVariables = Exact<{
  coords: LatLng;
}>;


export type PickQuery = { __typename?: 'Query', pick?: { __typename?: 'Parcelle', gid: string, idu: string, area: number, geom: MultiPolygon, center: Point } | null };

export type SearchParamsQueryVariables = Exact<{ [key: string]: never; }>;


export type SearchParamsQuery = { __typename?: 'Query', searchParameters: { __typename?: 'SearchParameters', forestType: Array<{ __typename?: 'SearchParam', label: string, description?: string | null, idForest: number }>, forestEssence: Array<{ __typename?: 'SearchParam', label: string, description?: string | null, idForest: number }>, buildingType: Array<{ __typename?: 'SearchParam', label: string, description?: string | null, idBuilding: number }>, buildingUsage: Array<{ __typename?: 'SearchParam', description?: string | null, label: string, idBuildingUsage: number }>, buildingCondition: Array<{ __typename?: 'SearchParam', label: string, description?: string | null, idBuildingCondition: number }>, pluType: Array<{ __typename?: 'SearchParam', label: string, description?: string | null, idPlu: number }> } };

export type CommunesListQueryVariables = Exact<{ [key: string]: never; }>;


export type CommunesListQuery = { __typename?: 'Query', communesList: Array<{ __typename?: 'Commune', gid: number, full_name: string }> };


export const ParcelleDocument = gql`
    query parcelle($idu: String!) {
  parcelle(idu: $idu) {
    __typename
    gid
    geom
    center
    area
    areaBuilding
    areaBuildingPercentage: areaBuilding(type: Percentage)
    areaForest
    areaForestPercentage: areaForest(type: Percentage)
    areaPlu
    areaPluPercentage: areaPlu(type: Percentage)
    riverLength
    commune {
      full_name
      email
      numero
      site
    }
    inside {
      __typename
      gid
      ... on BuildingInParcelle {
        gid
        usage1
        usage2
        dateConstruction
        leger
        etat
        nature
        materialRoof
        materialWall
        origin
        nbFloor
        nbHousing
        height
        polygonGeom: geom
        parcelleGid
        area
      }
      ... on RiverInParcelle {
        gid
        toponyme
        importance
        lineStringGeom: geom
        parcelleGid
        length
      }
      ... on ForestInParcelle {
        gid
        type
        essence
        essence1
        essence2
        composition
        polygonGeom: geom
        parcelleGid
        area
      }
      ... on PluInParcelle {
        libelle
        area
        polygonGeom: geom
        libelong
      }
    }
  }
}
    `;

/**
 * __useParcelleQuery__
 *
 * To run a query within a Vue component, call `useParcelleQuery` and pass it any options that fit your needs.
 * When your component renders, `useParcelleQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useParcelleQuery({
 *   idu: // value for 'idu'
 * });
 */
export function useParcelleQuery(variables: ParcelleQueryVariables | VueCompositionApi.Ref<ParcelleQueryVariables> | ReactiveFunction<ParcelleQueryVariables>, options: VueApolloComposable.UseQueryOptions<ParcelleQuery, ParcelleQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<ParcelleQuery, ParcelleQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<ParcelleQuery, ParcelleQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<ParcelleQuery, ParcelleQueryVariables>(ParcelleDocument, variables, options);
}
export function useParcelleLazyQuery(variables: ParcelleQueryVariables | VueCompositionApi.Ref<ParcelleQueryVariables> | ReactiveFunction<ParcelleQueryVariables>, options: VueApolloComposable.UseQueryOptions<ParcelleQuery, ParcelleQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<ParcelleQuery, ParcelleQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<ParcelleQuery, ParcelleQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<ParcelleQuery, ParcelleQueryVariables>(ParcelleDocument, variables, options);
}
export type ParcelleQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<ParcelleQuery, ParcelleQueryVariables>;
export const MyTestDocument = gql`
    query myTest {
  test
}
    `;

/**
 * __useMyTestQuery__
 *
 * To run a query within a Vue component, call `useMyTestQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyTestQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useMyTestQuery();
 */
export function useMyTestQuery(options: VueApolloComposable.UseQueryOptions<MyTestQuery, MyTestQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<MyTestQuery, MyTestQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<MyTestQuery, MyTestQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<MyTestQuery, MyTestQueryVariables>(MyTestDocument, {}, options);
}
export function useMyTestLazyQuery(options: VueApolloComposable.UseQueryOptions<MyTestQuery, MyTestQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<MyTestQuery, MyTestQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<MyTestQuery, MyTestQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<MyTestQuery, MyTestQueryVariables>(MyTestDocument, {}, options);
}
export type MyTestQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<MyTestQuery, MyTestQueryVariables>;
export const SearchDocument = gql`
    query search($parcelle: ParcelleSearchArgs, $forest: ForestSearchArgs, $building: BuildingSearchArgs, $river: RiverSearchArgs, $searchingArea: AreaInput, $pagination: PaginationArgs) {
  search(
    parcelle: $parcelle
    forest: $forest
    building: $building
    river: $river
    searchingArea: $searchingArea
    pagination: $pagination
  ) {
    gid
    idu
    area
    geom
    center
  }
}
    `;

/**
 * __useSearchQuery__
 *
 * To run a query within a Vue component, call `useSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useSearchQuery({
 *   parcelle: // value for 'parcelle'
 *   forest: // value for 'forest'
 *   building: // value for 'building'
 *   river: // value for 'river'
 *   searchingArea: // value for 'searchingArea'
 *   pagination: // value for 'pagination'
 * });
 */
export function useSearchQuery(variables: SearchQueryVariables | VueCompositionApi.Ref<SearchQueryVariables> | ReactiveFunction<SearchQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<SearchQuery, SearchQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<SearchQuery, SearchQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<SearchQuery, SearchQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<SearchQuery, SearchQueryVariables>(SearchDocument, variables, options);
}
export function useSearchLazyQuery(variables: SearchQueryVariables | VueCompositionApi.Ref<SearchQueryVariables> | ReactiveFunction<SearchQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<SearchQuery, SearchQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<SearchQuery, SearchQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<SearchQuery, SearchQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<SearchQuery, SearchQueryVariables>(SearchDocument, variables, options);
}
export type SearchQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<SearchQuery, SearchQueryVariables>;
export const PickDocument = gql`
    query pick($coords: LatLng!) {
  pick(coords: $coords) {
    gid
    idu
    area
    geom
    center
  }
}
    `;

/**
 * __usePickQuery__
 *
 * To run a query within a Vue component, call `usePickQuery` and pass it any options that fit your needs.
 * When your component renders, `usePickQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = usePickQuery({
 *   coords: // value for 'coords'
 * });
 */
export function usePickQuery(variables: PickQueryVariables | VueCompositionApi.Ref<PickQueryVariables> | ReactiveFunction<PickQueryVariables>, options: VueApolloComposable.UseQueryOptions<PickQuery, PickQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<PickQuery, PickQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<PickQuery, PickQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<PickQuery, PickQueryVariables>(PickDocument, variables, options);
}
export function usePickLazyQuery(variables: PickQueryVariables | VueCompositionApi.Ref<PickQueryVariables> | ReactiveFunction<PickQueryVariables>, options: VueApolloComposable.UseQueryOptions<PickQuery, PickQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<PickQuery, PickQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<PickQuery, PickQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<PickQuery, PickQueryVariables>(PickDocument, variables, options);
}
export type PickQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<PickQuery, PickQueryVariables>;
export const SearchParamsDocument = gql`
    query searchParams {
  searchParameters {
    forestType {
      idForest: id
      label
      description
    }
    forestEssence {
      idForest: id
      label
      description
    }
    buildingType {
      idBuilding: id
      label
      description
    }
    buildingUsage {
      idBuildingUsage: id
      description
      label
    }
    buildingCondition {
      idBuildingCondition: id
      label
      description
    }
    pluType {
      idPlu: id
      label
      description
    }
  }
}
    `;

/**
 * __useSearchParamsQuery__
 *
 * To run a query within a Vue component, call `useSearchParamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchParamsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useSearchParamsQuery();
 */
export function useSearchParamsQuery(options: VueApolloComposable.UseQueryOptions<SearchParamsQuery, SearchParamsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<SearchParamsQuery, SearchParamsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<SearchParamsQuery, SearchParamsQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<SearchParamsQuery, SearchParamsQueryVariables>(SearchParamsDocument, {}, options);
}
export function useSearchParamsLazyQuery(options: VueApolloComposable.UseQueryOptions<SearchParamsQuery, SearchParamsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<SearchParamsQuery, SearchParamsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<SearchParamsQuery, SearchParamsQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<SearchParamsQuery, SearchParamsQueryVariables>(SearchParamsDocument, {}, options);
}
export type SearchParamsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<SearchParamsQuery, SearchParamsQueryVariables>;
export const CommunesListDocument = gql`
    query CommunesList {
  communesList {
    gid
    full_name
  }
}
    `;

/**
 * __useCommunesListQuery__
 *
 * To run a query within a Vue component, call `useCommunesListQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommunesListQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useCommunesListQuery();
 */
export function useCommunesListQuery(options: VueApolloComposable.UseQueryOptions<CommunesListQuery, CommunesListQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<CommunesListQuery, CommunesListQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<CommunesListQuery, CommunesListQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<CommunesListQuery, CommunesListQueryVariables>(CommunesListDocument, {}, options);
}
export function useCommunesListLazyQuery(options: VueApolloComposable.UseQueryOptions<CommunesListQuery, CommunesListQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<CommunesListQuery, CommunesListQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<CommunesListQuery, CommunesListQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<CommunesListQuery, CommunesListQueryVariables>(CommunesListDocument, {}, options);
}
export type CommunesListQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<CommunesListQuery, CommunesListQueryVariables>;