const elementId = "map";

class Map {
    constructor(key, options = {}) {
        this.key = key;
        this.start = {
            lat: 1000,
            lon: 1000
        }

        mapboxgl.accessToken = this.key;
        this.map = new mapboxgl.Map({
            container: elementId,
            ...options
        });
    }
}

export {Map};