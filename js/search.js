const containerId = "searchContainer";
const resultsId = "results";
const searchTextId = "searchText";

class Search {
    constructor(key) {
        this.key = key;

        this.container = document.getElementById(containerId);
        this.results = document.getElementById(resultsId);
        this.searchText = document.getElementById(searchTextId);

        this.hidden = false;
        this.hide();

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
    
                this.results.appendChild(el);
            });
        });
    }

    hide() {
        if (this.hidden) return Promise.resolve();
        else return new Promise((resolve) => {
            this.results.style.opacity = 0;
            this.results.addEventListener("transitionend", resolve, true);
        }).then(() => {
            this.results.classList.add("hidden");
            this.hidden = true;
        });
    }

    show() {
        if (!this.hidden) return Promise.resolve();
        else return new Promise((resolve) => {
            this.results.classList.remove("hidden");
            this.results.style.opacity = 1;
            this.results.addEventListener("transitionend", resolve, true);
        }).then(() => {
            this.hidden = false;
        });
    }

    clear() {
        this.results.innerHTML = "";
    }
}

export {Search};