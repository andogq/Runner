// Imports
import {Map} from "./js/map.js";
import {MapboxAPI} from "./js/mapboxApi.js";
import {state} from "./js/state.js";

// Globals
let map;

function getKey() {
    return fetch("/mapbox.key").then((res) => {
        return res.text();
    });
}

function init() {
    window.state = state;

    getKey().then((key) => {
        window.api = new MapboxAPI(key);
        
        map = new Map(key, {
            style: "mapbox://styles/mapbox/streets-v11",
            center: {
                lat: -38.1499,
                lon: 144.3617
            },
            zoom: 15,
            minZoom: 12
        });
        map.load().then(() => {
            console.log("Map loaded");
        });
    }).catch((err) => {
        console.error("Something went wrong whilst initiating", err);
    });
}

init();