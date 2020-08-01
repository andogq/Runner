// Imports
import {authentication} from "./js/authentication.js";
import {CardManager} from "./js/cardManager.js";
import {loader} from "./js/loader.js";
import {Map} from "./js/map.js";
import {MapboxAPI} from "./js/mapboxApi.js";
import {Sidebar} from "./js/sidebar.js";
import {State} from "./js/state.js";

// Globals
let map;
const stateConfig = {
    default: {
        authenticated: 0,
        trigger: "/"
    },
    login: {
        authenticated: -1,
        trigger: "/login",
    },
    register: {
        authenticated: -1,
        trigger: "/register",
    },
    profile: {
        authenticated: 1,
        trigger: "/profile",
    }
}

function getKey() {
    return fetch("/mapbox.key").then((res) => {
        return res.text();
    });
}

function init() {
    window.authentication = authentication;
    window.authentication.init();

    window.state = new State(stateConfig);
    window.sidebar = new Sidebar(document.getElementById("sidebar"), {
        "default": [
            "back",
            "hr",
            {
                link: "login",
                icon: "login",
                text: "Login"
            },
            {
                link: "register",
                icon: "add",
                text: "Register"
            }
        ],
        "authenticated": [
            "back",
            "hr",
            {
                link: "logout",
                icon: "cancel",
                text: "Logout"
            }
        ]
    });

    window.cards = new CardManager("container");
    window.addEventListener("runner_stateChange", (e) => {
        // Add listeners for certain cards
        switch (e.detail) {
            case "default": {
                window.cards.clear();
                break;
            }
            case "login": {
                window.cards.set("login");
                break;
            }
            case "register": {
                window.cards.set("register");
            }
        }
    });

    window.loader = loader;
    let loadingId = window.loader.start();

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