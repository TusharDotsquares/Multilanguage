import * as React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { CityDocument, LocationDocument, SiteData, StateDocument, TemplateMeta } from "../../types";
import { Alternatelng, LocatorDocument } from "../../types/Locator";

export interface PageLayoutProps {
  children?: React.ReactNode;
  _site?: SiteData;
  meta: TemplateMeta;
  alternateLanguageFields?:Alternatelng;
  template?: string;
  path:string;
  document?:LocationDocument|CityDocument|StateDocument|LocatorDocument
  devLink?: string;
  locale?: string;
}

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
  return (
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
  );
};

export default PageLayout;
