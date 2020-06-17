// Imports
import {Map} from "./js/map.js";
import {Results} from "./js/results.js";

// Globals
const sampleGeocode = {"type":"FeatureCollection","query":["geelong","australia"],"features":[{"id":"place.7689701983884890","type":"Feature","place_type":["place"],"relevance":1,"properties":{"wikidata":"Q231765"},"text":"Geelong","place_name":"Geelong, Victoria, Australia","bbox":[144.290648992,-38.216796993,144.44827904,-38.048004991],"center":[144.3598,-38.1493],"geometry":{"type":"Point","coordinates":[144.3598,-38.1493]},"context":[{"id":"region.9994502542038050","short_code":"AU-VIC","wikidata":"Q36687","text":"Victoria"},{"id":"country.9665923154346070","short_code":"au","wikidata":"Q408","text":"Australia"}]},{"id":"poi.884763321130","type":"Feature","place_type":["poi"],"relevance":0.99,"properties":{"landmark":true,"address":"236-258 Torquay Road","category":"australian restaurant, australian food, restaurant"},"text":"The Grovedale Hotel","place_name":"The Grovedale Hotel, 236-258 Torquay Road, Geelong, Victoria 3216, Australia","center":[144.341205,-38.202868],"geometry":{"coordinates":[144.341205,-38.202868],"type":"Point"},"context":[{"id":"locality.14630044451420140","wikidata":"Q5611478","text":"Grovedale"},{"id":"postcode.11116760620478900","text":"3216"},{"id":"place.7689701983884890","wikidata":"Q231765","text":"Geelong"},{"id":"region.9994502542038050","short_code":"AU-VIC","wikidata":"Q36687","text":"Victoria"},{"id":"country.9665923154346070","short_code":"au","wikidata":"Q408","text":"Australia"}]},{"id":"poi.360777281063","type":"Feature","place_type":["poi"],"relevance":0.99,"properties":{"landmark":true,"address":"10 Hicks St","category":"australian restaurant, australian food, restaurant"},"text":"Lara Hotel","place_name":"Lara Hotel, 10 Hicks St, Geelong, Victoria 3212, Australia","center":[144.420739,-38.022893],"geometry":{"coordinates":[144.420739,-38.022893],"type":"Point"},"context":[{"id":"locality.18180625399985970","text":"Lara"},{"id":"postcode.13295550863795010","text":"3212"},{"id":"place.5363558137884891","text":"Geelong"},{"id":"region.9994502542038050","short_code":"AU-VIC","wikidata":"Q36687","text":"Victoria"},{"id":"country.9665923154346070","short_code":"au","wikidata":"Q408","text":"Australia"}]},{"id":"poi.592705493928","type":"Feature","place_type":["poi"],"relevance":0.99,"properties":{"landmark":true,"address":"66 Pakington St","category":"australian restaurant, australian food, restaurant"},"text":"Zigfrids Dining Hall + Bar","place_name":"Zigfrids Dining Hall + Bar, 66 Pakington St, Geelong, Victoria 3218, Australia","center":[144.34946,-38.13589],"geometry":{"coordinates":[144.34946,-38.13589],"type":"Point"},"context":[{"id":"locality.4940008997469320","wikidata":"Q5529867","text":"Geelong West"},{"id":"postcode.14842880483022240","text":"3218"},{"id":"place.7689701983884890","wikidata":"Q231765","text":"Geelong"},{"id":"region.9994502542038050","short_code":"AU-VIC","wikidata":"Q36687","text":"Victoria"},{"id":"country.9665923154346070","short_code":"au","wikidata":"Q408","text":"Australia"}]},{"id":"poi.816043793805","type":"Feature","place_type":["poi"],"relevance":0.99,"properties":{"landmark":true,"address":"Ryan PL","category":"australian restaurant, australian food, restaurant"},"text":"IGNI","place_name":"IGNI, Ryan PL, Geelong, Victoria 3220, Australia","center":[144.35957,-38.151],"geometry":{"coordinates":[144.35957,-38.151],"type":"Point"},"context":[{"id":"locality.17690333370884890","text":"Geelong"},{"id":"postcode.5473414098384360","text":"3220"},{"id":"place.7689701983884890","wikidata":"Q231765","text":"Geelong"},{"id":"region.9994502542038050","short_code":"AU-VIC","wikidata":"Q36687","text":"Victoria"},{"id":"country.9665923154346070","short_code":"au","wikidata":"Q408","text":"Australia"}]}],"attribution":"NOTICE: © 2020 Mapbox and its suppliers. All rights reserved. Use of this data is subject to the Mapbox Terms of Service (https://www.mapbox.com/about/maps/). This response and the information it contains may not be retained. POI(s) provided by Foursquare."};
let map, results;

function initMapbox() {
    return fetch("/mapbox.key").then((res) => {
        return res.text().then((key) => {
            map = new Map(key, {
                style: "mapbox://styles/mapbox/streets-v11",
                center: {
                    lat: -38.1499,
                    lon: 144.3617
                },
                zoom: 15,
                minZoom: 12
            });
        });
    }).catch((err) => {
        console.error("Something went wrong with retreiving the Mapbox Key:");
        console.error(err);
    });
}

function initDom() {
    document.getElementById("searchText").addEventListener("keyup", () => {
        let term = document.getElementById("searchText").value;

        if (term.length > 0) {
            if (results.hidden) results.show();
            
            map.geocode(term).then(({features}) => {
                results.clear();
                results.add(features);
            });
        } else {
            results.hide();
        }
    });
}

function init() {
    initMapbox().then(() => {
        console.log("Initialisation Complete");
    });

    results = new Results();

    initDom();
}

init();