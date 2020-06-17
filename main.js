let map;

function initMapbox() {
    return fetch("/mapbox.key").then((res) => {
        return res.text().then((key) => {
            mapboxgl.accessToken = key;
            map = new mapboxgl.Map({
                container: "map",
                style: "mapbox://styles/mapbox/streets-v11"
            });
        });
    });
}
function init() {
    initMapbox().then(() => {
        console.log("Initialisation Complete");
    });
}

init();