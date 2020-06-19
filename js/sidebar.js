import {Element} from "./element.js";

let dom = {};
let params = {
    start: undefined,
    distance: undefined
}

function search(term) {
    return window.api.search(term).then((results) => {
        dom.results.clear();

        results.forEach((result) => {
            let el = document.createElement("div");
            el.classList.add("result");

            let p = document.createElement("p");
            p.innerText = result.place_name;
            el.appendChild(p);

            let [lon, lat] = result.geometry.coordinates;
            let coords = document.createElement("input");
            coords.type = "hidden";
            coords.value = JSON.stringify({lon, lat});
            el.appendChild(coords);

            el.addEventListener("click", (e) => {
                let el = e.target;

                while (!el.classList.contains("result")) el = el.parentElement;

                let coordinates = el.children[1].value;
                
                params.start = JSON.parse(coordinates);

                dom.searchText.value = el.children[0].innerText;

                dom.results.hide().then(() => dom.distance.show());
            });

            dom.results.appendChild(el);
        });
    });
}

function init() {
    dom.results = new Element("results");
    dom.searchText = new Element("searchText");
    dom.distance = new Element("distanceContainer");

    dom.searchText.addEventListener("keyup", () => {
        let query = dom.searchText.value;

        if (query.length > 0) {
            search(query).then(() => dom.results.show());
        } else {
            dom.results.hide();
        }
    });
}

export {init};