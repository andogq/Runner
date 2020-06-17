const containerId = "searchContainer";
const resultsId = "results";
const searchTextId = "searchText";

const APIBase = "https://api.mapbox.com";

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
        let endpoint = "mapbox.places";

        return fetch(`${APIBase}/geocoding/v5/${endpoint}/${term}.json?access_token=${this.key}`).then((res) => {
            return res.text().then((text) => JSON.parse(text).features);
        }).then((results) => {
            this.clear();

            results.forEach((result) => {
                let el = document.createElement("div");
                el.classList.add("result");
    
                let p = document.createElement("p");
                p.innerText = result.place_name;
                el.appendChild(p);
    
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