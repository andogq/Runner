// Imports
import {Map} from "./js/map.js";
import {Search} from "./js/search.js";

// Globals
let map, search;

function getKey() {
    return fetch("/mapbox.key").then((res) => {
        return res.text();
    });
}

function init() {
    getKey().then((key) => {
        search = new Search(key);

        map = new Map(key, {
            style: "mapbox://styles/mapbox/streets-v11",
            center: {
                lat: -38.1499,
                lon: 144.3617
            },
            zoom: 15,
            minZoom: 12
        });
    }).catch((err) => {
        console.error("Something went wrong whilst initiating");
        console.error(err);
    });
}

init();