class Map {
    constructor(id, key, options = {}) {
        this.id = id;
        this.key = key;
        this.options = options;

        this.points = [];

        mapboxgl.accessToken = this.key;
    }

    load() {
        return new Promise((resolve) => {
            this.map = new mapboxgl.Map({
                container: this.id,
                ...this.options
            });
            
            this.map.on("load", resolve);
        }).then(() => {
            this.map.addSource("points", {
                type: "geojson",
                data: {
                    type: "FeatureCollection",
                    features: []
                }
            });
            this.map.addLayer({
                id: "points",
                source: "points",
                type: "circle",
                paint: {
                    "circle-radius": 10,
                    "circle-color": "#ff0000"
                }
            });

            this.map.addSource("route", {
                type: "geojson",
                data: {
                    type: "Feature",
                    geometry: {
                        type: "LineString",
                        coordinates: []
                    }
                }
            });
            this.map.addLayer({
                id: "route",
                source: "route",
                type: "line",
                layout: {
                    "line-join": "round",
                    "line-cap": "round"
                },
                paint: {
                    "line-color": "#ff0000",
                    "line-width": 10
                }
            });
        });
    }

    generate(point) {
        // Will be changed
        let distance = 1;
        let numPoints = 3;
        let mInDegree = 111.3;

        let points = [point];

        for (let i = 0; i < numPoints; i++) {
            // Generate a random point in a circle
            let r = distance / mInDegree;
            let w = r * Math.sqrt(Math.random());
            let t = 2 * Math.PI * Math.random();
            let x = w * Math.cos(t);
            let y = w * Math.sin(t);

            points.push({
                lat: point.lat + y,
                lon: point.lon + (x / Math.cos(point.lat))
            });
        }

        points.push(point);

        window.api.route(points).then((line) => {
            this.map.getSource("route").setData({
                type: "Feature",
                geometry: line
            });
        });
    }

    updatePoints() {
        let data = this.points.map((point) => {
            return {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [point.lon, point.lat]
                }
            }
        });

        this.map.getSource("points").setData({
            type: "FeatureCollection",
            features: data
        });
    }
}

export {Map};