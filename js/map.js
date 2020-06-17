const APIBase = "https://api.mapbox.com";
const elementId = "map";

class Map {
    constructor(key, options = {}) {
        this.key = key;

        mapboxgl.accessToken = this.key;
        this.map = new mapboxgl.Map({
            container: elementId,
            ...options
        });
    }

    geocode(term) {
        let endpoint = "mapbox.places";

        return fetch(`${APIBase}/geocoding/v5/${endpoint}/${term}.json?access_token=${mapboxgl.accessToken}`).then((res) => {
            return res.text().then((text) => JSON.parse(text));
        });
    }
}

export {Map};