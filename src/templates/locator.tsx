/**
 * This is an example of how to create a static template that uses getStaticProps to retrieve data.
 */
import * as React from "react";
import "../index.css";
import {
  Template,
  GetPath,
  GetHeadConfig,
  HeadConfig,
  TransformProps,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import PageLayout from "../components/layout/PageLayout";
import favicon from "../assets/images/favicon.ico";
import {
  SearchHeadlessProvider,
  provideHeadless,
} from "@yext/search-headless-react";
import SearchProvider from "../components/google-map/SearchProvider";
import { TemplateMeta } from "../types";
import "../i18n";
import { LocatorDocument } from "../types/Locator";
import ListLayout from "../components/locator/ListLayout";
import MapWrapper from "../components/google-map/MapWrapper";
import { withTranslation, useTranslation } from "react-i18next";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import Chat from "../components/common/Chat";

/**
 * Not required depending on your use case.
 */
export const config: TemplateConfig = {
  // The name of the feature. If not set the name of this file will be used (without extension).
  // Use this when you need to override the feature name.
  stream: {
    $id: "locator",
    filter: {
      entityIds: ["globaldata"],
    },
    fields: ["id", "uid", "meta", "name", "c_selectlanguage","c_helpTitle","c_helpLinks", "c_home","c_useMyLocation", "slug","c_sunday","c_tuesday","c_thursday","c_saturday","c_friday","c_wednesday","c_monday"],
    localization: {
      locales: ["en", "fr", "it", "ja", "de"],
      primary: false,
    },
  }, 
  alternateLanguageFields: ["slug", "name", "id"],
};

/**
 * Used to either alter or augment the props passed into the template at render time.
 * This function will be run during generation and pass in directly as props to the default
 * exported function.
 *
 * This can be used when data needs to be retrieved from an external (non-Knowledge Graph)
 * source. This example calls a public API and returns the data.
 *
 * If the page is truly static this function is not necessary.
 */
export const transformProps: TransformProps<TemplateProps> = async (data) => {
  return { ...data };
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
export const getPath: GetPath<TemplateProps> = ({ document, __meta }) => {
  return __meta.mode === "development"
    ? `${document.meta.locale}/${document.slug}`
    : `${document.meta.locale == "en" ? "index.html" : `${document.locale}`}`;
};

/**
 * This allows the user to define a function which will take in their template
 * data and produce a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document's <head> tag.
 * This can include the title, meta tags, script tags, etc.
 */
export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: "Locator Page Example",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: "Static page example meta description.",
        },
      },
      {
        type: "link",
        attributes: {
          rel: "icon",
          type: "image/x-icon",
          href: favicon,
        },
      },
    ],
  };
};

interface LocatorTemplateProps extends TemplateRenderProps {
  __meta: TemplateMeta;
  document: LocatorDocument;
  path: string;
}
/**
 * This is the main template. It can have any name as long as it's the default export.
 * The props passed in here are the direct result from `transformProps`.
 */
const Router = typeof document !== "undefined" ? BrowserRouter : StaticRouter;
const Locator: Template<LocatorTemplateProps> = ({
  document,
  __meta,
  path,
}: LocatorTemplateProps) => {
  const { _site, meta, alternateLanguageFields } = document;
  const { i18n } = useTranslation();
  i18n.changeLanguage(`${document.meta.locale}`);
  console.log("document", document);
  const searcher = provideHeadless({
    experienceKey: YEXT_PUBLIC_ANSWER_SEARCH_EXPERIENCE_KEY,
    apiKey: YEXT_PUBLIC_ANSWER_SEARCH_API_KEY,
    verticalKey: YEXT_PUBLIC_ANSWER_SEARCH_VERTICAL_KEY,
    locale: document.meta.locale,
    environment: YEXT_PUBLIC_UNIVERSE,
    experienceVersion: YEXT_PUBLIC_ANSWER_SEARCH_EXPERIENCE_VERSION,
    endpoints: {
      verticalSearch: YEXT_PUBLIC_VERTICAL_SEARCH_END_POINT,
    },
  });

  const [isMapView, setIsMapView] = React.useState(false);
  const url: string =
    __meta.mode === "development"
      ? `${document.slug}`
      : `${
          document.meta.locale == "en"
            ? "/"
            : `${document.meta.locale}`
        }`;

  return (
    <Router location={url}>
      <SearchHeadlessProvider searcher={searcher}>
        <Routes>
          <Route
            path={url}
            element={
              <SearchProvider
              language={document.meta.locale}
              defaultCoordinates={{
                latitude: parseFloat(YEXT_PUBLIC_DEFAULT_LATITUDE),
                longitude: parseFloat(YEXT_PUBLIC_DEFAULT_LONGITUDE),
              }}
              mapboxAccessToken={YEXT_PUBLIC_MAP_BOX_API_KEY}
              googleApiKey={YEXT_PUBLIC_GOOGLE_API_KEY}
              limit={parseInt(YEXT_PUBLIC_PAGE_LIMIT)}
              autoLoadAllResult={false}
              isUseAlternateResult={{ limit: 1, show: true }}
              mapType="google"
              autocompleteType="google"
              isFilterEnable={false}
              isUpdateListAccordingMarkers={true}
            >
              <PageLayout
                _site={_site}
                alternateLanguageFields={alternateLanguageFields}
                meta={__meta}
                path={path}
                template="locatorSearch"
                document={document}
                locale={meta.locale}
              >
                <main className="main-content">
                  <section className="listing-map" id="main">
                    <div className="mobile-view-map lg:hidden">
                      <button
                        type="button"
                        className="map-link"
                        onClick={() => setIsMapView(!isMapView)}
                      >
                        {isMapView ? "Hide Map" : "Show Map"}
                      </button>
                    </div>
                    <div className={`map-block ${isMapView ? "show" : ""}`}>
                      <MapWrapper _site={_site} />
                    </div>
                    <ListLayout
                      showNoRecordMessage={true}
                      c_useMyLocation={_site.c_useMyLocation}
                      meta={__meta}
                      locale={document.meta.locale}
                      extention={".html"}
                    />
                  </section>
                  <Chat/>
                </main>
              </PageLayout>
            </SearchProvider>
            }
          />
           
        </Routes>
      </SearchHeadlessProvider>
    </Router>
  );
};

export default withTranslation()(Locator);
