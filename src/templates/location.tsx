import * as React from "react";
import {
  Template,
  GetPath,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
  TransformProps,
} from "@yext/pages";
// import favicon from "../assets/images/favicon.ico";
import { DayOfWeekNames, EntityMeta, LocationDocument, TemplateMeta } from "../types";
import PageLayout from "../components/layout/PageLayout";
import { withTranslation, useTranslation } from "react-i18next";
import Breadcrumbs, { BreadcrumbItem } from "../components/common/Breadcrumbs";
import {
  AnalyticsProvider,
  AnalyticsScopeProvider,
} from "@yext/pages/components";
import "../i18n";
import Information from "../components/location/Information";
import NearByLocation from "../components/location/NearByLocation";
import "../index.css";
import { getBreadcrumb } from "../config/GlobalFunctions";
import { NearByLocationResult } from "../types/Locator";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import Chat from "../components/common/Chat";

export const config: TemplateConfig = {
  stream: {
    $id: "location",
    filter: {
      entityTypes: ["location"],
      savedFilterIds:['1315509542']
    },
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "slug",
      "address",
      "hours",
      "description",
      "additionalHoursText",
      "googlePlaceId",
      "yextDisplayCoordinate",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.meta.entityType",
      "dm_directoryParents.dm_directoryParents.name",
      "dm_directoryParents.dm_directoryParents.slug",
      "dm_directoryParents.dm_directoryParents.meta.entityType",
      "dm_directoryParents.dm_directoryParents.dm_directoryParents.name",
      "dm_directoryParents.dm_directoryParents.dm_directoryParents.slug",
      "dm_directoryParents.dm_directoryParents.dm_directoryParents.meta.entityType",
    ],
    localization: {
      locales: ["en", "fr", "it", "ja", "de"],
      primary: false,
    },
  },
  alternateLanguageFields: ["slug", "name", "id","address"],
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  if (
    document.dm_directoryParents &&
    document.dm_directoryParents != "undefined"
  ) {
    const parent: string[] = [];
    document.dm_directoryParents
      ?.slice(1)
      .map((i: { meta: EntityMeta; slug: string; name: string }) => {
        parent.push(i.slug);
      });
    return `${document.meta.locale}/${parent.join(
      "/"
    )}/${document.slug.toString()}.html`;
  } else {
    return `${document.meta.locale}/${document?.slug.toString()}.html`;
  }
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  const metaTitle = `Dotsquares | ${document.name}`;
  return {
    title: metaTitle,
    charset: "UTF-8",
    viewport:
      "width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1, user-scalable=0",
    tags: [
      // {
      //   type: "link",
      //   attributes: {
      //     rel: "icon",
      //     type: "image/png",
      //     href: favicon,
      //   },
      // },

      {
        type: "meta",
        attributes: {
          name: "author",
          content: "Dotsquares",
        },
      },
      {
        type: "meta",
        attributes: {
          name: "robots",
          content: `${"noindex, nofollow"}`,
        },
      },
    ],
  };
};

type TransformData = TemplateRenderProps & {
  externalApiData: NearByLocationResult[];
  breadcrumbs: BreadcrumbItem[];
};
export const transformProps: TransformProps<TransformData> = async (data) => {
  const document = data.document as LocationDocument;
  const directoryParents = document.dm_directoryParents || [];
  const breadcrumbs = getBreadcrumb(
    directoryParents,
    document,
    data.__meta,
    false,
    1,
    false
  );
  return { ...data, breadcrumbs };
};

interface LocationTemplateProps extends TransformData {
  __meta: TemplateMeta;
  document: LocationDocument;
}
const Router = typeof document !== "undefined" ? BrowserRouter : StaticRouter;
const Location: Template<LocationTemplateProps> = ({
  document,
  __meta,
  breadcrumbs,
  path,
}: LocationTemplateProps) => {
  const { meta, _site, slug, alternateLanguageFields } = document;
  const { i18n } = useTranslation();
  i18n.changeLanguage(`${document.meta.locale}`);
  let url = "";
  if (__meta.mode === "development") {
    url = `${document?.slug.toString()}`;
  } else if (
    document.dm_directoryParents &&
    document.dm_directoryParents != "undefined"
  ) {
    const parent: string[] = [];
    document.dm_directoryParents?.slice(1).map(
      (i: { meta: EntityMeta; slug: string; name: string }) => {
        parent.push(i.slug);
      }
    );
    url = `${document.meta.locale}/${parent.join("/")}/${document.slug.toString()}.html`;
  } else {
    url = `${document.meta.locale}/${document?.slug.toString()}.html`;
  }

  const defaultDayOfWeekNames:DayOfWeekNames = [
    _site.c_sunday,
    _site.c_monday,
    _site.c_tuesday,
    _site.c_wednesday,
    _site.c_thursday,
    _site.c_friday,
    _site.c_saturday,
  ];
  
  return (
    <Router location={url}>
      <div id="main">
        <AnalyticsProvider
          templateData={{ document, __meta }}
          enableDebugging={YEXT_PUBLIC_ANALYTICS_ENABLE_DEBUGGING}
          enableTrackingCookie={YEXT_PUBLIC_ANALYTICS_ENABLE_TRACKING_COOKIE}
        >
          <AnalyticsScopeProvider name={document.name}>
            <Routes>
              <Route
                path={url}
                element={
                  <PageLayout
                    _site={_site}
                    meta={__meta}
                    path={path}
                    document={document}
                    alternateLanguageFields={alternateLanguageFields}
                    template="location"
                    locale={meta.locale}
                    devLink={slug}
                  >
                    <Breadcrumbs
                      baseUrl={`/${document.meta.locale == "en" ? '':`${document.meta.locale}.html`}`}
                      breadcrumbs={breadcrumbs}
                    />
                    <Information document={document} _site={_site} defaultDayOfWeekNames={defaultDayOfWeekNames} />

                    <NearByLocation
                      apiKey={YEXT_PUBLIC_ANSWER_SEARCH_API_KEY}
                      coordinate={document.yextDisplayCoordinate}
                      id={document.id}
                      meta={__meta}
                      locale={document.meta.locale}
                    />
                    <Chat/>
                  </PageLayout>
                }
              />
            </Routes>
          </AnalyticsScopeProvider>
        </AnalyticsProvider>
      </div>
    </Router>
  );
};
export default withTranslation()(Location);
