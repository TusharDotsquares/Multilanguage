import React, { useContext } from "react";
import LocationList from "./LocationList";
import ViewMore from "./ViewMore";
import Facets from "./Facets";
import AutoSuggestions from "../google-map/components/AutoSuggestions";
import { SearchContext } from "../google-map/SearchProvider";
import NoRecordFound from "./NoRecordFound";
import { TemplateMeta } from "../../types";

interface ListLayoutProps {
  meta: TemplateMeta;
  message?: string;
  locale?: string;
  extention:string
  showNoRecordMessage?: boolean;
  c_useMyLocation:string
}

function ListLayout({
  meta,
  locale,
  message = "",
  extention = "", 
  showNoRecordMessage = false,
  c_useMyLocation
}: ListLayoutProps) {
  const { isFilterEnable, noRecordFound } = useContext(SearchContext);
  const [activeFacet, setActiveFacet] = React.useState<number | null>(null);
  return (
    <div className="listing-block">
      <AutoSuggestions c_useMyLocation={c_useMyLocation} locale={locale} />
      {isFilterEnable && (
        <Facets
          activeFacet={activeFacet}
          setActiveFacet={setActiveFacet}
          searchOnChange={true}
        />
      )}
      {showNoRecordMessage && noRecordFound && (
        <NoRecordFound message={message} />
      )}
      <LocationList meta={meta} locale={locale} extention={extention}/>
      <ViewMore />
    </div>
  );
}

export default ListLayout;
