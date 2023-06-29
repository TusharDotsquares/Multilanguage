import * as React from "react";
import { ChangeEvent } from 'react';
import { Link } from "@yext/pages/components";
import { CityDocument, LocationDocument, SiteData, StateDocument, TemplateMeta } from "../../types";
import logo from "../../assets/images/logo.jpg";
import { Alternatelng, LocatorDocument } from "../../types/Locator";
import { slugify, updatelocale } from "../../config/GlobalFunctions";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "#" },
];

interface HeaderProps {
  _site?: SiteData;
  meta: TemplateMeta;
  template?: string;
  path: string;
  document?:LocationDocument|CityDocument|StateDocument|LocatorDocument 
  alternateLanguageFields?: Alternatelng;
  devLink?: string;
  locale?: string;
}

const Header = (props: HeaderProps) => {
  const { meta, locale,alternateLanguageFields,document } = props;
  const [languagesdata, setLanguagesData] = React.useState([]);
  const [selectedValue, setSelectedValue] = React.useState('');
  React.useEffect(() => {
    const parameter = locale;
    const keys = alternateLanguageFields ? Object.keys(alternateLanguageFields!) : [];
    const updatedLanguagesData = [...keys, parameter];
    setLanguagesData(updatedLanguagesData  as never[]);
    setSelectedValue(parameter);
  }, []);

  React.useEffect(()=>{
   setSelectedValue(selectedValue);
  },[selectedValue])

  const updateUrl = (e: ChangeEvent<HTMLSelectElement>) => {

    setSelectedValue(e.target.value);
    const language = slugify(e.target.value); 
    console.log('props', props)
    updatelocale(language, props,document);

  };
console.log('selectedValue', selectedValue)
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
              {navigation.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="Chnage-language">
            <div>
                <label htmlFor="dropdown">Select an option: </label>
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
