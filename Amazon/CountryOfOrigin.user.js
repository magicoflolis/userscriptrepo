// ==UserScript==
// @name         [GitHub] Country of origin for Amazon products
// @description  userscript to fetch and display the country of origin for amazon products. initially developed to make boycotting the CCP more easy.
// @author       Sidem, calne_ca, magicoflolis
// @icon         https://www.amazon.com/favicon.ico
// @version      2.1.2
// @namespace    https://greasyfork.org/scripts/416635
// @license      GPL-3.0-only
// @include      https://www.amazon.*/gp/product/*
// @include      https://www.amazon.*/*/dp/*
// @exclude      https://www.amazon.ca/*
// @grant        none
// ==/UserScript==

(() => {
  'use strict';
  const log = (msg) => {
      return console.log("[Debug]", msg);
    },
    qs = (element) => {
      return document.querySelector(element);
    },
    productTitle = qs("#productTitle"),
    countryCodes = {"AF": "Afghanistan","AL": "Albania","DZ": "Algeria","AS": "American Samoa","AD": "Andorra","AO": "Angola","AI": "Anguilla","AQ": "Antarctica","AG": "Antigua and Barbuda","AR": "Argentina","AM": "Armenia","AW": "Aruba","AU": "Australia","AT": "Austria","AZ": "Azerbaijan","BS": "Bahamas","BH": "Bahrain","BD": "Bangladesh","BB": "Barbados","BY": "Belarus","BE": "Belgium","BZ": "Belize","BJ": "Benin","BM": "Bermuda","BT": "Bhutan","BO": "Bolivia","BA": "Bosnia and Herzegovina","BW": "Botswana","BV": "Bouvet Island","BR": "Brazil","IO": "British Indian Ocean Territory","BN": "Brunei Darussalam","BG": "Bulgaria","BF": "Burkina Faso","BI": "Burundi","KH": "Cambodia","CM": "Cameroon","CA": "Canada","CV": "Cape Verde","KY": "Cayman Islands","CF": "Central African Republic","TD": "Chad","CL": "Chile","CN": "China","CX": "Christmas Island","CC": "Cocos (Keeling) Islands","CO": "Colombia","KM": "Comoros","CG": "Congo","CD": "Congo, the Democratic Republic of the","CK": "Cook Islands","CR": "Costa Rica","CI": "Cote D'Ivoire","HR": "Croatia","CU": "Cuba","CY": "Cyprus","CZ": "Czech Republic","DK": "Denmark","DJ": "Djibouti","DM": "Dominica","DO": "Dominican Republic","EC": "Ecuador","EG": "Egypt","SV": "El Salvador","GQ": "Equatorial Guinea","ER": "Eritrea","EE": "Estonia","ET": "Ethiopia","FK": "Falkland Islands (Malvinas)","FO": "Faroe Islands","FJ": "Fiji","FI": "Finland","FR": "France","GF": "French Guiana","PF": "French Polynesia","TF": "French Southern Territories","GA": "Gabon","GM": "Gambia","GE": "Georgia","DE": "Germany","GH": "Ghana","GI": "Gibraltar","GR": "Greece","GL": "Greenland","GD": "Grenada","GP": "Guadeloupe","GU": "Guam","GT": "Guatemala","GN": "Guinea","GW": "Guinea-Bissau","GY": "Guyana","HT": "Haiti","HM": "Heard Island and McDonald Islands","VA": "Holy See (Vatican City State)","HN": "Honduras","HK": "Hong Kong","HU": "Hungary","IS": "Iceland","IN": "India","ID": "Indonesia","IR": "Iran, Islamic Republic of","IQ": "Iraq","IE": "Ireland","IL": "Israel","IT": "Italy","JM": "Jamaica","JP": "Japan","JO": "Jordan","KZ": "Kazakhstan","KE": "Kenya","KI": "Kiribati","KP": "North Korea","KR": "South Korea","KW": "Kuwait","KG": "Kyrgyzstan","LA": "Lao People's Democratic Republic","LV": "Latvia","LB": "Lebanon","LS": "Lesotho","LR": "Liberia","LY": "Libya","LI": "Liechtenstein","LT": "Lithuania","LU": "Luxembourg","MO": "Macao","MG": "Madagascar","MW": "Malawi","MY": "Malaysia","MV": "Maldives","ML": "Mali","MT": "Malta","MH": "Marshall Islands","MQ": "Martinique","MR": "Mauritania","MU": "Mauritius","YT": "Mayotte","MX": "Mexico","FM": "Micronesia, Federated States of","MD": "Moldova, Republic of","MC": "Monaco","MN": "Mongolia","MS": "Montserrat","MA": "Morocco","MZ": "Mozambique","MM": "Myanmar","NA": "Namibia","NR": "Nauru","NP": "Nepal","NL": "Netherlands","NC": "New Caledonia","NZ": "New Zealand","NI": "Nicaragua","NE": "Niger","NG": "Nigeria","NU": "Niue","NF": "Norfolk Island","MK": "North Macedonia, Republic of","MP": "Northern Mariana Islands","NO": "Norway","OM": "Oman","PK": "Pakistan","PW": "Palau","PS": "Palestinian Territory, Occupied","PA": "Panama","PG": "Papua New Guinea","PY": "Paraguay","PE": "Peru","PH": "Philippines","PN": "Pitcairn","PL": "Poland","PT": "Portugal","PR": "Puerto Rico","QA": "Qatar","RE": "Reunion","RO": "Romania","RU": "Russia","RW": "Rwanda","SH": "Saint Helena","KN": "Saint Kitts and Nevis","LC": "Saint Lucia","PM": "Saint Pierre and Miquelon","VC": "Saint Vincent and the Grenadines","WS": "Samoa","SM": "San Marino","ST": "Sao Tome and Principe","SA": "Saudi Arabia","SN": "Senegal","SC": "Seychelles","SL": "Sierra Leone","SG": "Singapore","SK": "Slovakia","SI": "Slovenia","SB": "Solomon Islands","SO": "Somalia","ZA": "South Africa","GS": "South Georgia and the South Sandwich Islands","ES": "Spain","LK": "Sri Lanka","SD": "Sudan","SR": "Suriname","SJ": "Svalbard and Jan Mayen","SZ": "Eswatini","SE": "Sweden","CH": "Switzerland","SY": "Syrian Arab Republic","TW": "Taiwan","TJ": "Tajikistan","TZ": "Tanzania, United Republic of","TH": "Thailand","TL": "Timor-Leste","TG": "Togo","TK": "Tokelau","TO": "Tonga","TT": "Trinidad and Tobago","TN": "Tunisia","TR": "Turkey","TM": "Turkmenistan","TC": "Turks and Caicos Islands","TV": "Tuvalu","UG": "Uganda","UA": "Ukraine","AE": "United Arab Emirates","GB": "UK","US": "USA","UM": "United States Minor Outlying Islands","UY": "Uruguay","UZ": "Uzbekistan","VU": "Vanuatu","VE": "Venezuela","VN": "Vietnam","VG": "Virgin Islands, British","VI": "Virgin Islands, U.S.","WF": "Wallis and Futuna","EH": "Western Sahara","YE": "Yemen","ZM": "Zambia","ZW": "Zimbabwe","AX": "Åland Islands","BQ": "Bonaire, Sint Eustatius and Saba","CW": "Curaçao","GG": "Guernsey","IM": "Isle of Man","JE": "Jersey","ME": "Montenegro","BL": "Saint Barthélemy","MF": "Saint Martin (French part)","RS": "Serbia","SX": "Sint Maarten (Dutch part)","SS": "South Sudan","XK": "Kosovo"};
  let applyLogoSprite = () => {
      let amazonLogo = qs("#amazonOriginalProduct");
      if (amazonLogo != null) {
        amazonLogo.style.objectFit = "none";
        amazonLogo.style.objectPosition = "-2px -71px";
        amazonLogo.style.width = "55px";
        amazonLogo.style.height = "28px";
      }
    },
    codeToFlag = (isoCode, countryName, sellerName) => {
      return (sellerName.includes("Amazon")) ? `<img id='amazonOriginalProduct' src='https://m.media-amazon.com/images/G/01/AUIClients/AmazonUIIcon-beacon_light_1x-2767b239bb9543c0a4af44c843ab017f27080532._V2_.png' title='${sellerName}'>` :
      (isoCode != "") ? `<img src='https://flagcdn.com/w40/${isoCode.toLowerCase()}.png' title='${countryName}, ${sellerName}'>` : `<div id="amazonOriginalProduct">Not Found/Error</div>`
    },
    thirdPartySeller = qs("#sellerProfileTriggerId"),
    siteLinks = document.getElementsByClassName("a-link-normal");
    productTitle.innerHTML = "<img src='https://images-eu.ssl-images-amazon.com/images/G/03/javascripts/lib/popover/images/snake._CB485935607_.gif' width='25' height='25'> " + productTitle.innerText;
  if (!thirdPartySeller) {
    for (let link of siteLinks) {
      link.href.endsWith("ref=dp_merchant_link") ? (thirdPartySeller = link) : false;
    }
  }
  if (thirdPartySeller) {
    fetch(thirdPartySeller.href).then(r => r.text()).then((template) => {
      let sellerPageDOM = new DOMParser().parseFromString(template, 'text/html'),
        items = sellerPageDOM.getElementsByClassName("a-list-item"),
        sellerName = sellerPageDOM.getElementById("sellerName").innerText,
        originCountry = "",
        originCountryCode = "";
      for (let i of items) {
        if (countryCodes.hasOwnProperty(i.innerText)) {
          originCountryCode = i.innerText;
          (originCountryCode == "CN") ? (originCountry = `☠ ${originCountry} ☠`) : (originCountry = countryCodes[i.innerText]);
        }
      }
      productTitle.innerHTML = `${codeToFlag(originCountryCode, originCountry, sellerName)} ${productTitle.innerText}`
    }).catch((r) => {
      log(r);
    });
  } else {
    productTitle.innerHTML = `${codeToFlag("", "", "Amazon")} ${productTitle.innerText}`
  }
  applyLogoSprite()
})();