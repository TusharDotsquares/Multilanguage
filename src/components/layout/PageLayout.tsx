import * as React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { CityDocument, CountryDocument, LocationDocument, SiteData, StateDocument, TemplateMeta } from "../../types";
import { Alternatelng, LocatorDocument } from "../../types/Locator";
import { string } from "prop-types";

export interface PageLayoutProps {
  children?: React.ReactNode;
  _site?: SiteData;
  meta: TemplateMeta;
  alternateLanguageFields?:Alternatelng;
  template: string;
  path:string;
  document:LocationDocument|CityDocument|StateDocument|LocatorDocument|CountryDocument
  devLink?: string;
  locale?: string;
}
interface LayoutContextType {
  setSelectedValue: (value: string) => void;
  selectedValue:string
}

export const LayoutContext = React.createContext<LayoutContextType>({
  selectedValue:'',
  setSelectedValue: function (): void {
    throw new Error("Function not implemented.");
  }
});


const PageLayout = ({
  children,
  _site,
  meta,
  alternateLanguageFields,
  template,
  path,
  devLink,
  document,
  locale,
}: PageLayoutProps) => {
  const [selectedValue, setSelectedValue] = React.useState('');
  const data = {
    selectedValue,
    setSelectedValue
  };
  return (
    <LayoutContext.Provider value={data}>   
     <div className="page-wrapper">
      <Header
        _site={_site}
        meta={meta}
        alternateLanguageFields={alternateLanguageFields}
        template={template}
        document={document}
        path={path}
        locale={locale}
        devLink={devLink}
      />
      {children}
      <Footer
        _site={_site}
        meta={meta}
        template={template}
        locale={locale}
        devLink={devLink}
      />
    </div>
    </LayoutContext.Provider>
  );
};

export default PageLayout;
