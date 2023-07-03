import * as React from "react";
import {
  Template,
  GetPath,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
import favicon from "../assets/images/favicon.ico";
import {
  CityDocument,
  EntityMeta,
  LocationDocument,
  TemplateMeta,
} from "../types";
import PageLayout from "../components/layout/PageLayout";
import "../index.css";
import { Address, Link } from "@yext/pages/components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";

export const config: TemplateConfig = {
  stream: {
    $id: "city",
    filter: {
      entityTypes: ["ce_city"],
    },
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "slug",

      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.meta.entityType",
      "dm_directoryParents.dm_directoryParents.name",
      "dm_directoryParents.dm_directoryParents.slug",
      "dm_directoryParents.dm_directoryParents.meta.entityType",

      /* DM children */
      "dm_directoryChildren.name",
      "dm_directoryChildren.meta.entityType",
      "dm_directoryChildren.slug",
      "dm_directoryChildren.hours",
      "dm_directoryChildren.address",
      "dm_directoryChildren.id",
      "dm_directoryChildren.yextDisplayCoordinate",
    ],
    localization: {
      locales:["en","fr", "it", "ja", "de"],
      primary: false,
    },
  },
  alternateLanguageFields: ["slug", "name", "id"],
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
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
    return `${document.meta.locale}/${parent.join("/")}/${document.slug.toString()}.html`;
  } else {
    return `${document.slug.toString()}.html`;
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
      {
        type: "link",
        attributes: {
          rel: "icon",
          type: "image/png",
          href: favicon,
        },
      },

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

interface CityTemplateProps extends TemplateRenderProps {
  __meta: TemplateMeta;
  document: CityDocument;
}
const Router = typeof document !== "undefined" ? BrowserRouter : StaticRouter;
const City: Template<CityTemplateProps> = ({
  document,
  __meta,
  path
}: CityTemplateProps) => {
  const { meta, _site, slug, dm_directoryChildren,dm_directoryParents } = document;
  let url ="";
  if(__meta.mode === "development"){
    url =`${document?.slug.toString()}`;
  }
  else if (
   dm_directoryParents &&
   dm_directoryParents != "undefined"
  ) {
    const parent: string[] = [];
    dm_directoryParents?.map(
      (i: { meta: EntityMeta; slug: string; name: string }) => {
        parent.push(i.slug);
      }
    );
    url= `${parent.join("/")}/${document.slug.toString()}.html`;
  } else {
    url= `${document.slug.toString()}.html`;
  }
  return (
    <Router location={url}>
    <div id="main">
    <Routes>
        <Route
            path={url}
            element={
      <PageLayout
        _site={_site}
        meta={__meta}
        path={path}
        template="country"
        locale={meta.locale}
        devLink={slug}
      >
        <h1>City</h1>
        <h3>Locations</h3>
        <div className="city-locations">
          <div className="container">
            {dm_directoryChildren &&
              dm_directoryChildren.map((location: LocationDocument) => {
                const url = location.slug;

                return (
                  <div className="city-location" key={location.id}>
                    <div className="location-card">
                      <div className="icon-row">
                        <div className="icon addressIcon"></div>
                        <Link className="location-name" href={`/${url}`}>
                          {location.name}
                        </Link>
                        <Address address={location.address} />
                      </div>
                      <div className="button-bx-detail">
                        <Link className="button link" href={`/${url}`}>
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </PageLayout>}/>
      </Routes>
    </div>
    </Router>
  );
};
export default City;
