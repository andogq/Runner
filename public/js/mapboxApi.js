const APIBase = "https://api.mapbox.com";

class MapboxAPI {
    constructor(key) {
        this.key = key;
    }

    search(term) {
        let endpoint = "mapbox.places";

        return this.get(`/geocoding/v5/${endpoint}/${term}.json`).then((results) => results.features);
    }

    route(points) {
        let coordinates = points.map((point) => {
            return `${point.lon},${point.lat}`;
        }).join(";");

        return this.get(`/directions/v5/mapbox/walking/${coordinates}?geometries=geojson&continue_straight=true`).then((route) => route.routes[0].geometry);
    }

    get(endpoint) {
        let accessToken = `${endpoint.indexOf("?") == -1 ? "?" : "&"}access_token=${this.key}`;
        return fetch(`${APIBase}${endpoint}${accessToken}`).then((res) => {
            return res.text().then((text) => JSON.parse(text));
        });
    }
}

export {MapboxAPI};