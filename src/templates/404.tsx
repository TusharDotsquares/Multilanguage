import * as React from "react";
import "../index.css";
import {
  Template,
  GetPath,
  GetHeadConfig,
  HeadConfig,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import PageLayout from "../components/layout/PageLayout";
import favicon from "../assets/images/favicon.ico";
import { TemplateMeta } from "../types";
import { FourOhFourDocument } from "../types/Locator";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
export const config: TemplateConfig = {
  name: "404",
};

export const getPath: GetPath<TemplateProps> = () => {
  return `404.html`;
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: "404 Page",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
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

interface FourOhFourProps extends TemplateRenderProps {
  __meta: TemplateMeta;
  document: FourOhFourDocument;
  path:string
}
const Router = typeof document !== "undefined" ? BrowserRouter : StaticRouter;
const FourOhFour: Template<FourOhFourProps> = ({
  __meta,
  document,
  path
}: FourOhFourProps) => {
 const url = "404.html";
  return (
    <>
  <Router location={url}>
      <Routes>
        <Route
          path={url}
          element={
          <PageLayout _site={document._site} meta={__meta} path={path}>
            <div className="centered-container">
              <div className="flex justify-center items-center text-2xl bg-gray-200 h-60 rounded-md shadow-md">
                <p>This page does not exist.</p>
              </div>
            </div>
          </PageLayout>}/>
      </Routes>
   </Router>
    </>
  );
};

export default FourOhFour;
