import * as React from "react";
import { SearchContext } from "../google-map/SearchProvider";
import LocationCard, { LocationCardLoader } from "./LocationCard";
import { TemplateMeta } from "../../types";
import { LocationResult } from "../../types/Locator";
type LocationListProps = {
  meta?: TemplateMeta;
  relativePrefixToRoot?:string
  locale?:string
  extention:string
};
const LocationList = ({ meta,locale,extention }: LocationListProps) => {
  const {
    locations,
    isLoading,
    viewportLocations,
    isUpdateListAccordingMarkers,
    showViewportLocations,
  } = React.useContext(SearchContext);
  const [pageLoading, setPageLoading] = React.useState(true);
  React.useEffect(() => {
    if (!isLoading) {
      setPageLoading(false);
    }
  }, [isLoading]);
  return (
    <div className="listing">
      {showViewportLocations && isUpdateListAccordingMarkers
        ? viewportLocations.map((location: LocationResult) => (
            <LocationCard key={location.id} locale={locale} extention={extention} location={location} meta={meta} />
          ))
        : locations.map((location: LocationResult) => (
            <LocationCard key={location.id} locale ={locale} extention={extention} location={location} meta={meta} />
          ))}

      {pageLoading && (
        <>
          <LocationCardLoader />
          <LocationCardLoader />
          <LocationCardLoader />
          <LocationCardLoader />
          <LocationCardLoader />
        </>
      )}
    </div>
  );
};

export default LocationList;
