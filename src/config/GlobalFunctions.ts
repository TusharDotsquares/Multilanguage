import defaultMarker from "../assets/images/default-marker.png";
import hoverMarker from "../assets/images/hover-marker.png";
import userMarker from "../assets/images/user-marker.png";
import cluster from "../assets/images/cluster.png";
import {
  Alternatelng,
  LocationResult,
  LocatorDocument,
} from "../types/Locator";
import {
  CityDocument,
  CountryDocument,
  EntityMeta,
  LocationDocument,
  SiteData,
  StateDocument,
  TemplateMeta,
} from "../types";
import { BreadcrumbItem } from "../components/common/Breadcrumbs";
import { AddressType } from "@yext/pages/components";
import { Coordinate } from "../components/google-map/SearchProvider";
import { Navigate } from "../components/layout/Header";

type LinkParams = {
  link: string;
  mode?: string;
  template?: string;
  locale?: string;
  devLink?: string;
};
// type UseLocationType = {
//   pathname: string;
//   search: string;
//   state: any;
//   hash: string;
//   key: string;
// };

type SlugInfo = { slug?: string; id: string; name: string };

interface AlternateSlug {
  [key: string]: SlugInfo;
}
interface updatelocaleProps {
  _site?: SiteData;
  meta: TemplateMeta;
  template?: string;
  path: string;
  alternateLanguageFields?: Alternatelng;
  devLink?: string;
  locale?: string;
  alternateSlug?: AlternateSlug;
}

export function slugify(slugString: string) {
  slugString.toLowerCase().toString();
  slugString = slugString.replace(/[&/\\#^+()$~%.'":*?<>{}!@]/, "");
  slugString = slugString.replaceAll("  ", "-");
  slugString = slugString.replaceAll(" ", "-");
  slugString = slugString.replaceAll("---", "-");
  slugString = slugString.replaceAll("--", "-");
  slugString = slugString.replaceAll("'", "");
  return slugString.toLowerCase();
}



export const updatelocale = (
  locale: string,
  template:string,
  meta:TemplateMeta,
  document:LocationDocument|CityDocument|StateDocument|LocatorDocument|CountryDocument
) => {
  let redirectUrl ="";
  const data = document.alternateLanguageFields && document.alternateLanguageFields[locale];
  const {address,slug}= data || {};
  if(template === "location"){
    if (meta.mode === "development") {
      redirectUrl = `${document?.slug.toString()}?locale=${locale}`;
    } else {
      redirectUrl = `${locale}/${slugify(address.countryCode)}/${slugify(address.city)}/${slug?.toString()}.html`;
    } 
  }
  else if(template === "country"){
    if (meta.mode === "development") {
      redirectUrl = `${document?.slug.toString()}?locale=${locale}`;
    } else {
      redirectUrl = `${locale}/${slug?.toString()}.html`;
    } 
  }
 else if(template === "city"){
    if (meta.mode != "development") {
      redirectUrl = `${document?.slug.toString()}?locale=${locale}`;
    } else {
      if (
        document.dm_directoryParents &&
        document.dm_directoryParents != "undefined"
      ) {
        const parent: string[] = [];
        document.dm_directoryParents?.slice(1).map(
          (i: { meta: EntityMeta; slug: string; name: string }) => {
            parent.push(i.slug);
          }
        );
      redirectUrl =`${locale}/${parent.join("/")}/${document.slug?.toString()}.html`;
    } 
  }
} else  if(template === "locatorSearch"){
    if (meta.mode === "development") {
      redirectUrl = `${document?.slug.toString()}?locale=${locale}`;
    } else {
      redirectUrl =`${
         locale == "en"
          ? ""
          : `${locale}`
      }`;
    } 
  }

  window.location.href = `/${redirectUrl}`
  // window.location.reload();

};


export const getLink = <Document>(document: Document, meta: TemplateMeta, isRecursive = true, skip = 0, useHtml = false, useBaseUrl = false) => {
  const isDevelopment = meta.mode === "development" || false;
  let url = `${isDevelopment ? "" : "/"}${document.slug}`;
  if (!isDevelopment && isRecursive) {
    url = getRecursiveData(document, meta, skip, useHtml, useBaseUrl);
  }
  return `${url}`;
};

export const getRecursiveData = <DataType>(element: DataType, meta: TemplateMeta, skip = 0, useHtml = false, useBaseUrl = false) => {
  let slug = useBaseUrl ? YEXT_PUBLIC_WEBSITE_URL : "";
  const isDevelopment = meta.mode === "development" || false;
  if (isDevelopment) {
    slug = element.slug;
  } else {
    if (element.dm_directoryParents) {
      element.dm_directoryParents.forEach((e: DataType, index: number) => {
        if (index >= skip) {
          slug += `/${e.slug}`;
        }
      });
    }
    slug += `/${element.slug}${useHtml && !isDevelopment ? ".html" : ""}`;
  }
  return slug;
};


export const getBreadcrumb = <DataType, Document>(
  data: DataType[],
  document: Document,
  meta: TemplateMeta,
  isRecursive = true,
  skip = 0,
  useHtml = false,
  basePrefix = "",
  baseName = ""
) => {
  const breadcrumbs: BreadcrumbItem[] = [];
  const isDevelopment = meta.mode === "development" || false;
  if (isRecursive) {
    data.forEach((element: DataType, index: number) => {
      if (index >= skip && index !== 0) {
        const slug = getRecursiveData<DataType>(element, meta, skip, useHtml, true);
        breadcrumbs.push({
          slug: slug,
          name: element.name,
        });
      } else if (index === 0 && basePrefix) {
        breadcrumbs.push({
          slug: basePrefix,
          name: baseName ? baseName : element.name,
        });
      } else if (index === 0) {
        const slug = getRecursiveData<DataType>(element, meta, skip, useHtml, true);
        breadcrumbs.push({
          slug: slug,
          name: baseName ? baseName : element.name,
        });
      }
    });

    breadcrumbs.push({
      slug: getRecursiveData(document, meta, skip, useHtml, true),
      name: document.name,
    });
  } else {
    let slug = YEXT_PUBLIC_WEBSITE_URL;
    data.forEach((element: DataType, index: number) => {
      if (element.slug && index >= skip) {
        slug += `/${element.slug}${useHtml && !isDevelopment ? ".html" : ""}`;
        breadcrumbs.push({
          slug: slug,
          name: element.name,
        });
      } else if (index === 0) {
        breadcrumbs.push({
          slug: basePrefix,
          name: baseName ? baseName : element.name,
        });
      }
    });

    breadcrumbs.push({
      slug: slug + `/${document.slug}${useHtml && !isDevelopment ? ".html" : ""}`,
      name: document.name,
    });
  }

  return breadcrumbs;
};

export const getPosition = (result: LocationResult) => {
  const lat = result.rawData.yextDisplayCoordinate.latitude;
  const lng = result.rawData.yextDisplayCoordinate.longitude;
  return { lat, lng };
};

export const getDirectionUrl = (
  address: AddressType,
  googlePlaceId = "",
  userLocation: null | Coordinate = null
) => {
  let address_string = "";
  if (address.line1) {
    address_string += address.line1 + ",";
  }
  if (address.line2) {
    address_string += address.line2 + ",";
  }
  if (address.city) {
    address_string += address.city + ",";
  }
  if (address.region) {
    address_string += address.region + ",";
  }
  if (address.postalCode) {
    address_string += address.postalCode + ",";
  }
  address_string += address.countryCode;
  address_string = address_string.replace("undefined,", "");

  let directionUrl =
    `https://www.google.com/maps/dir/?api=1&destination=` +
    encodeURIComponent(address_string);

  if (googlePlaceId) {
    directionUrl += `&destination_place_id=${googlePlaceId}`;
  }

  if (userLocation && userLocation.latitude && userLocation.longitude) {
    directionUrl += `&origin=${userLocation.latitude},${userLocation.longitude}`;
  }
  return directionUrl;
};

export const getClusterIcon = () => {
  return cluster;
};

export const getUserIcon = () => {
  return userMarker;
};

export const getMarkerPin = (
  result: LocationResult,
  isActive = false,
  isHover = false
) => {
  let marker = defaultMarker;
  if (isHover) {
    marker = hoverMarker;
  } else if (isActive) {
    marker = hoverMarker;
  }
  const m_icon = {
    url: marker,
    id: result.id,
  };
  return m_icon;
};

export const getOgTags = (
  title: string,
  description: string,
  url: string,
  image: string
) => {
  return [
    {
      type: "meta",
      attributes: {
        property: "og:title",
        content: title,
      },
    },
    {
      type: "meta",
      attributes: {
        property: "og:description",
        content: description,
      },
    },
    {
      type: "meta",
      attributes: {
        property: "og:url",
        content: url,
      },
    },

    {
      type: "meta",
      attributes: {
        property: "og:image",
        content: image,
      },
    },
  ];
};
