import { Address, Link } from "@yext/pages/components";
import * as React from "react";
import { TemplateMeta } from "../../types";
import { NearByLocationResult } from "../../types/Locator";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import {
  getDirectionUrl,
  getRecursiveData,
  slugify,
} from "../../config/GlobalFunctions";
import { Coordinate } from "../google-map/SearchProvider";
import { fetch } from "@yext/pages/util";
import { useTranslation } from "react-i18next";
import { LayoutContext } from "../layout/PageLayout";

type NearbyAPIConfig = {
  endpoint:
    | "https://liveapi-sandbox.yext.com/v2/accounts/me/entities/geosearch"
    | "https://liveapi.yext.com/v2/accounts/me/entities/geosearch";
  params: {
    api_key: string;
    entityTypes?: string;
    limit?: string;
    radius?: string;
    savedFilterIds?: string;
    v: string;
  };
};

const getConfig = (api_key: string): NearbyAPIConfig => {
  return {
    endpoint: YEXT_PUBLIC_GEO_SEARCH_END_POINT,
    params: {
      api_key,
      entityTypes: "location",
      limit: "4",
      v: "20220927",
      radius:"2500"
    },
  };
};

type NearbyProps = {
  coordinate: Coordinate;
  id: string;
  meta: TemplateMeta;
  apiKey: string;
  locale:string;
};

const NearByLocation = ({ locale, coordinate, id, apiKey }: NearbyProps) => {
  const { selectedValue } = React.useContext(LayoutContext);
  const [locations, setLocations] = React.useState<NearByLocationResult[]>([]);
  React.useEffect(() => {
    if (!coordinate || !apiKey) {
      return;
    }

    const config = getConfig(apiKey);
    const searchParams = new URLSearchParams({
      ...config.params,
      location: `${coordinate.latitude},${coordinate.longitude}`,
      filter: JSON.stringify({ "meta.id": { "!$eq": `${id}` } }),
      savedFilterIds:YEXT_PUBLIC_SAVEDFILTERID_NEARBY,
      languages:locale
    });

    fetch(`${config.endpoint}?${searchParams.toString()}`)
      .then((resp) => resp.json())
      .then((data) => setLocations(data.response.entities || []))
      .catch((error) => console.error(error));
  }, [coordinate, id, apiKey]);
  const {t} = useTranslation();
  let viewMoreUrl;
  if(selectedValue === 'en'){
    viewMoreUrl ="/"
  }else{
    viewMoreUrl = "/" + selectedValue
  }
  return (
    <div className="nearby-locations">
      <div className="container">
        <h3 className="nearby-locations-title">{t("Nearby Locations")}</h3>
       <div className="justify-center"> 
        <Swiper spaceBetween={50} slidesPerView={3}>
          {locations.map((location) => {
           const  url= `/${locale}/${slugify(location.address.countryCode)}/${slugify(location.address.city)}/${location.slug.toString()}.html`;
            return (
              <SwiperSlide key={location.id}>
                <div className="location-card">
                  <div className="icon-row">
                    <div className="icon addressIcon"></div>
                    <Link className="location-name" href={`${url}`}>
                      {location.name}
                    </Link>
                    <Address address={location.address} />
                  </div>

                  <div className="button-bx-detail">
                    <Link className="button link" href={`${url}`}>
                      {t("View Details")}
                    </Link>
                    <Link
                      data-ya-track="getdirections"
                      eventName={`getdirections`}
                      target="_blank"
                      className="direction button before-icon"
                      href={getDirectionUrl(
                        location.address,
                        location.googlePlaceId
                      )}
                      rel="noopener noreferrer"
                    >
                      {t("Get Direction")}
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        </div>
        <div className="nearby-locations-actions">
          <Link href={viewMoreUrl} className="button link">
            {t("View More")}
          </Link>
        </div>
      </div>
    </div>
  );
};
export default NearByLocation;
