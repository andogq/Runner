// Imports
import {Authentication} from "/js/interfaces/Authentication.js";
import {Mapbox} from "/js/interfaces/Mapbox.js";

import {CardManager} from "/js/modules/CardManager.js";
import {Loader} from "/js/modules/Loader.js";
import {Map} from "/js/modules/Map.js";
import {Sidebar} from "/js/modules/Sidebar.js";
import {State} from "/js/modules/State.js";

function init() {
    // Load all the interfaces
    window.interfaces = {
        authentication: new Authentication()
    };

    // Load all the modules
    window.modules = {
        cardManager: new CardManager("container"),
        loader: new Loader("loader"),
        map: new Map("map", {
            style: "mapbox://styles/mapbox/streets-v11",
            center: {
                lat: -38.1499,
                lon: 144.3617
            },
            zoom: 15,
            minZoom: 12
        }),
        sidebar: new Sidebar("sidebar", {
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
        }),
        state: new State({
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
        })
    };

    // Load the mapbox key and initialise the module and interface
    fetch("/mapbox.key").then(async (res) => {
        window.interfaces.mapbox = new Mapbox(await res.text());

        window.modules.map.load();
    });

    window.addEventListener("runner_stateChange", (e) => {
        // Add listeners for certain cards
        switch (e.detail) {
            case "default": {
                window.modules.cardManager.clear();
                break;
            }
            case "login": {
                window.modules.cardManager.set("login");
                break;
            }
            case "register": {
                window.modules.cardManager.set("register");
            }
        }
    });
}

init();