let map;

function initMapbox() {
    return fetch("/mapbox.key").then((res) => {
        return res.text().then((key) => {
            mapboxgl.accessToken = key;
            map = new mapboxgl.Map({
                container: "map",
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
function init() {
    initMapbox().then(() => {
        console.log("Initialisation Complete");
    });
}

init();