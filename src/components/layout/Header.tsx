import * as React from "react";
import { ChangeEvent } from 'react';
import { Link } from "@yext/pages/components";
import { CityDocument, CountryDocument, LocationDocument, SiteData, StateDocument, TemplateMeta } from "../../types";
import logo from "../../assets/images/logo.jpg";
import { Alternatelng, LocatorDocument } from "../../types/Locator";
import { slugify, updatelocale } from "../../config/GlobalFunctions";
import {useNavigate} from 'react-router-dom';
import { NavigateFunction } from 'react-router-dom';
import { LayoutContext } from "./PageLayout";

// Define the type for navigate
export type Navigate = NavigateFunction;


interface HeaderProps {
  _site?: SiteData;
  meta: TemplateMeta;
  template: string;
  path: string;
  document:LocationDocument|CityDocument|StateDocument|LocatorDocument|CountryDocument  
  alternateLanguageFields?: Alternatelng;
  devLink?: string;
  locale?: string;
}

const Header = (props: HeaderProps) => {
  const { meta, locale,_site,template,alternateLanguageFields,document } = props;
  const navigation = [
    { name:_site?.c_home, href: "/" },
   
  ];
  const [languagesdata, setLanguagesData] = React.useState([]);
  const { selectedValue,setSelectedValue } = React.useContext(LayoutContext);
  React.useEffect(() => {
    const parameter = locale;
    const keys = alternateLanguageFields ? Object.keys(alternateLanguageFields!) : [];
    const updatedLanguagesData = [...keys, parameter];
    setLanguagesData(updatedLanguagesData  as never[]);
    setSelectedValue(locale!);
  }, []);


  const updateUrl = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);
    const language = slugify(e.target.value); 
    updatelocale(language,template,meta,document);

  };
  let url;
  
  return (
    <header className={`site-header ${meta.mode}`}>
      <div className="container">
        <div className="row">
          <div className="logo">
            <a href="#">
              <img src={logo} alt="logo" />
            </a>
          </div>
          <div className="header-menu">
            <ul>
             {navigation.map((link) => {
              if(meta.mode==="development"){
                if(selectedValue ==="en"){
                url = "?locale=" + link.href
                }else{
                url = "?locale=" + selectedValue
                }
              }else{
                if(selectedValue ==="en"){
                url = link.href  
                }else{
                  url = link.href + selectedValue 
                }
              }
             return(<li key={link.href}>
                  <Link href={url} className="">
                    {link.name}
                  </Link>
                </li>)
              })}
            </ul>
          </div>
        </div>
        <div className="Chnage-language">
            <div>
                <label htmlFor="dropdown">{_site?.c_selectlanguageHeading} </label>
                <select id="dropdown" value={selectedValue} onChange={updateUrl}>
                {languagesdata.map((res,index) => {
                return (  
                <option key={index} value={res}>{res}</option>
                );
                })}
                </select>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
