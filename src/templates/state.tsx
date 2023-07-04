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
import { EntityMeta, StateDocument, TemplateMeta } from "../types";
import PageLayout from "../components/layout/PageLayout";
import "../index.css";
import { Link } from "@yext/pages/components";
import { DirectoryChild } from "../types/DirectoryChild";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
export const config: TemplateConfig = {
  stream: {
    $id: "region",
    filter: {
      entityTypes: ["ce_region"],
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

      /* DM children */
      "dm_directoryChildren.name",
      "dm_directoryChildren.slug",
      "dm_directoryChildren.meta.entityType",
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

interface StateTemplateProps extends TemplateRenderProps {
  __meta: TemplateMeta;
  document: StateDocument;
  path:string
}
const Router = typeof document !== "undefined" ? BrowserRouter : StaticRouter;

const State: Template<StateTemplateProps> = ({
  document,
  __meta,
  path
}: StateTemplateProps) => {
  const { meta, _site, slug, dm_directoryChildren,dm_directoryParents,alternateLanguageFields } = document;
   let url="";
   if (__meta.mode === "development") {
    url= document.slug;
  } else if (
   dm_directoryParents &&
   dm_directoryParents != "undefined"
  ) {
    const parent: string[] = [];
   dm_directoryParents?.slice(1).map(
      (i: { meta: EntityMeta; slug: string; name: string }) => {
        parent.push(i.slug);
      }
    );
    url= `${document.meta.locale}/${parent.join("/")}/${document.slug.toString()}.html`;
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
        alternateLanguageFields={alternateLanguageFields}
        template="country"
        document={document}
        locale={meta.locale}
        devLink={slug}
      >
        <h1>State</h1>

        <div className="directory-children">
          {dm_directoryChildren &&
            dm_directoryChildren.map((region: DirectoryChild) => {
              const url = region.slug;

              return (
                <div className="directory-children-card" key={region.slug}>
                  <Link className="directory-children-name" href={`/${url}`}>
                    {region.name}
                  </Link>
                </div>
              );
            })}
        </div>
      </PageLayout>}/>
      </Routes>
    </div>
    </Router>
  );
};
export default State;
