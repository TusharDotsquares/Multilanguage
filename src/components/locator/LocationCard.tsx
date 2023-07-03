import * as React from "react";
import { SearchContext } from "../google-map/SearchProvider";
import { Address, Link } from "@yext/pages/components";
import { LocationResult } from "../../types/Locator";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getDirectionUrl, slugify } from "../../config/GlobalFunctions";
import { EntityMeta, TemplateMeta } from "../../types";
import { useTranslation } from "react-i18next";

type LocationCardProps = {
  location: LocationResult;
  meta?: TemplateMeta;
  locale?:string
  extention:string
};

const LocationCard = ({ location ,locale,extention}: LocationCardProps) => {
  const {
    setInfoWindowContent,
    infoWindowContent,
    setHoveredLocation,
    hoveredLocation,
  } = React.useContext(SearchContext);
  const cardRef = React.useRef<HTMLDivElement>(null);
  let url = "";
  if (
    location.rawData.dm_directoryParents &&
    location.rawData.dm_directoryParents != "undefined"
  ) {
    const parent: string[] = [];
    location.rawData.dm_directoryParents?.slice(1).map(
      (i: { meta: EntityMeta; slug: string; name: string }) => {
        parent.push(slugify(i.name));
      }
    );
    url= `${locale}/${parent.join("/")}/${location.rawData.slug.toString()}`;
  } else {
    url= `${location.rawData.slug.toString()}`;
  }

console.log('location.rawData', location.rawData)
  const {t} = useTranslation();
  const scrollIntoView = (element: HTMLDivElement, offset: number) => {
    const elementPosition = element.getBoundingClientRect().top;
    /* const elementBottom = element.getBoundingClientRect().bottom;
    const scrollHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    );
    const windowHeight = window.innerHeight;
    const max = scrollHeight - windowHeight;
    console.log(
      "elementBottom",
      scrollHeight,
      elementBottom,

      elementPosition,
      window.pageYOffset
    ); */
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  React.useEffect(() => {
    if (
      infoWindowContent &&
      infoWindowContent.id === location.id &&
      cardRef.current
    ) {
      scrollIntoView(cardRef.current, 80);
    }
  }, [infoWindowContent]);
  return (
    <div
      ref={cardRef}
      className={`location-card ${
        hoveredLocation === location.id ||
        (infoWindowContent && infoWindowContent.id === location.id)
          ? "active"
          : ""
      }`}
      onClick={() => {
        setInfoWindowContent(location);
      }}
      onMouseOver={() => setHoveredLocation(location.id)}
      onMouseOut={() => {
        if (hoveredLocation === location.id) {
          setHoveredLocation(null);
        }
      }}
    >
      <div className="icon-row">
        <div className="icon addressIcon"></div>
        <Link className="location-name" href={`${url}${extention}`}>
          {location.rawData.name}
        </Link>
        <Address
          address={location.rawData.address}
        />
      </div>
      <div className="button-bx-detail">
        <Link className="button link" href={`${url}${extention}`}>
          {t("View Details")}
        </Link>
        <Link
          className="button link"
          href={getDirectionUrl(
            location.rawData.address,
            location.rawData.googlePlaceId
          )}
        >
          {t("Get Direction")}
        </Link>
      </div>
    </div>
  );
};

export const LocationCardLoader = () => {
  return (
    <div className="location-card">
      <Skeleton height={25} enableAnimation />
      <Skeleton count={3} width={"50%"} enableAnimation />

      <Skeleton
        enableAnimation
        width={140}
        height={40}
        style={{ paddingTop: 20, borderRadius: 0 }}
      />
    </div>
  );
};

export default LocationCard;
