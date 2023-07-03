import { Hours } from "@yext/search-headless-react";
import { DirectoryParent } from "./DirectoryParent";
import { Coordinate } from "../components/google-map/SearchProvider";
import { AddressType } from "@yext/pages/components";
import { DirectoryChild } from "./DirectoryChild";
import { E164Number } from "libphonenumber-js/types";
import { Alternatelng } from "./Locator";

export type MapTypes = "google" | "mapbox";
export type AutocompleteTypes = "google" | "mapbox" | "yext";
export interface SiteData {
  id: string;
  slug: string;
  name: string;
  c_sunday:string,
  c_monday:string,
  c_tuesday:string,
  c_wednesday:string,
  c_thursday:string,
  c_friday:string,
  c_saturday:string,

}
export type DayOfWeekNames = [
  string, // Sunday
  string, // Monday
  string, // Tuesday
  string, // Wednesday
  string, // Thursday
  string, // Friday
  string  // Saturday
];

export interface TemplateMeta {
  mode: "development" | "production";
}

export interface EntityType {
  id: string;
}
export interface EntityMeta {
  id: string;
  entityType: EntityType;
  locale: string;
}

export interface CountryDocument {
  name: string;
  slug: string;
  meta: EntityMeta;
  _site: SiteData;
  dm_directoryChildren:DirectoryChild[]
  dm_directoryParents:DirectoryParent[]
  alternateLanguageFields?:Alternatelng
}

export interface StateDocument {
  name: string;
  id:string;
  slug: string;
  meta: EntityMeta;
  _site: SiteData;
  dm_directoryChildren: DirectoryChild[];
  dm_directoryParents:DirectoryParent[]
  alternateLanguageFields?:Alternatelng
}

export interface CityDocument {
  id:string;
  name: string;
  slug: string;
  meta: EntityMeta;
  _site: SiteData;
  dm_directoryChildren: LocationDocument[];
  dm_directoryParents:DirectoryParent[];
  alternateLanguageFields?:Alternatelng
}

export interface LocationDocument {
  meta: EntityMeta;
  _site: SiteData;
  id: string;
  name: string;
  slug: string;
  address: AddressType;
  description:string;
  hours: Hours;
  additionalHoursText: string;
  yextDisplayCoordinate: Coordinate;
  alternateLanguageFields?:Alternatelng
  googlePlaceId: string;
  mainPhone: E164Number;
  dm_directoryParents: DirectoryParent[];
}
