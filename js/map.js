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
}

export {Map};