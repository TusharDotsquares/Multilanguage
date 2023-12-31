import * as React from "react";
import { Address, Link } from "@yext/pages/components";
import { LocationResult } from "../../types/Locator";
import { SiteData } from "../../types";
import { useTranslation } from "react-i18next";

export type InfowindowProps = {
  location: LocationResult;
  _site: SiteData;
};

const Infowindow = ({ location }: InfowindowProps) => {
  const url = location.rawData.slug;
  const {t} = useTranslation();
  return (
    <div className="infowindow-content">
      <div className="icon-row">
        <div className="icon addressIcon"></div>
        <Link className="location-name" href={`/${url}`}>
          {location.rawData.name}
        </Link>
        <Address address={location.rawData.address} />
      </div>
      <div className="button-bx-detail">
        <Link className="button link" href={`/${url}`}>
          {t("View Details")}
        </Link>
      </div>
    </div>
  );
};

export default Infowindow;
