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
import { EntityMeta, TemplateMeta } from "../types";
import { CountryDocument } from "../types/index";
import PageLayout from "../components/layout/PageLayout";
import "../index.css";
import { Link } from "@yext/pages/components";
import { DirectoryChild } from "../types/DirectoryChild";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import { slugify } from "../config/GlobalFunctions";
/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "country",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "slug",

      "dm_directoryParents.name",
      "dm_directoryParents.slug",

      /* DM children */
      "dm_directoryChildren.name",
      "dm_directoryChildren.slug",
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityTypes: ["ce_country"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales:["en","fr", "it", "ja", "de"],
      primary: false,
    },
  },
  alternateLanguageFields: ["slug", "name", "id"],
};

export const getPath: GetPath<TemplateProps> = ({ document, __meta }) => {
  if (__meta.mode === "development") {
    return document.slug;
  } else {
    if (
      document.dm_directoryParents &&
      document.dm_directoryParents != "undefined"
    ) {
      const parent: string[] = [];
      document.dm_directoryParents?.slice(1).map(
        (i: { meta: EntityMeta; slug: string; name: string }) => {
          parent.push(slugify(i.slug));
        }
      );
      return `${document.meta.locale}/${parent.join("/")}/${document.slug.toString()}.html`;
    } else {
      return `${document.slug.toString()}.html`;
    }
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
interface CountryTemplateProps extends TemplateRenderProps {
  __meta: TemplateMeta;
  document: CountryDocument;
}
const Router = typeof document !== "undefined" ? BrowserRouter : StaticRouter;
const country: Template<CountryTemplateProps> = ({
  document,
  __meta,
  path
}: CountryTemplateProps) => {
  const { _site, meta, slug, dm_directoryChildren,dm_directoryParents } = document;
  let url ="";
  if (__meta.mode === "development") {
    url= document.slug;
  } else {
    if (
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
        <h1>Country</h1>

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

export default country;
