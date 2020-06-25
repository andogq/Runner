// Imports
import {Map} from "./js/map.js";
import {MapboxAPI} from "./js/mapboxApi.js";
import {state} from "./js/state.js";
import {authentication} from "./js/authentication.js";
import {loader} from "./js/loader.js";

// Globals
let map;

function getKey() {
    return fetch("/mapbox.key").then((res) => {
        return res.text();
    });
}

function initElements() {
    // Make a elements change the state
    [...document.getElementsByTagName("a")].forEach((el) => {
        el.addEventListener("click", (e) => {
            e.preventDefault();
            let href = new URL(el.href);
            window.state.set(href.pathname.replace(/^\//, ""));
        });
    });
}

function init() {
    window.state = state;
    // Refresh the page state
    window.state.set(window.state.get());

    window.authentication = authentication;
    window.authentication.init();

    window.loader = loader;
    let loadingId = window.loader.start();

    initElements();

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
            window.loader.stop(loadingId);
        });
    }).catch((err) => {
        console.error("Something went wrong whilst initiating", err);
    });
}

init();