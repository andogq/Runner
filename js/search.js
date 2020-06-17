import {Element} from "./element.js";

const resultsId = "results";
const searchTextId = "searchText";

class Search {
    constructor(key) {
        this.key = key;

        this.results = new Element(resultsId);
        this.searchText = document.getElementById(searchTextId);

        this.hidden = true;

        this.searchText.addEventListener("keyup", () => {
            let query = this.searchText.value;

            if (query.length > 0) {
                this.search(query).then(() => this.show());
            } else {
                this.hide();
            }
        });
    }

    search(term) {
        return window.api.search(term).then((results) => {
            this.clear();

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

                    if (typeof this.selectionCallback == "function") {
                        let coordinates = el.children[1].value;
                        
                        this.selectionCallback(JSON.parse(coordinates));

                        this.searchText.value = el.children[0].innerText;
                        this.hide();
                    }
                });
    
                this.results.el.appendChild(el);
            });
        });
    }

    clear() {
        this.results.el.innerHTML = "";
    }
}

export {Search};