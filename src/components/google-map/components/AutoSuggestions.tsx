import * as React from "react";
import { SearchContext } from "../SearchProvider";
import GoogleAutoSuggestions from "./GoogleAutoSuggestions";
import YextAutoSuggestions from "./YextAutoSuggestions";

interface AutoSuggestionProps {
  locale: string;
  c_useMyLocation:string
}
const AutoSuggestions = ({ locale ,c_useMyLocation}: AutoSuggestionProps) => {
  const { autocompleteType } = React.useContext(SearchContext);

  return autocompleteType === "google" ? (
    <GoogleAutoSuggestions c_useMyLocation={c_useMyLocation} />
  ) : (
    <YextAutoSuggestions locale={locale} />
  );
};

export default AutoSuggestions;
