const containerId = "results";

class Results {
    constructor() {
        this.el = document.getElementById(containerId);

        this.hide();
    }

    add(results) {
        results.forEach((result) => {
            let el = document.createElement("div");
            el.classList.add("result");

            let p = document.createElement("p");
            p.innerText = result.place_name;
            el.appendChild(p);

            this.el.appendChild(el);
        });
    }

    hide() {
        return new Promise((resolve) => {
            this.el.style.opacity = 0;
            this.el.addEventListener("transitionend", resolve, true);
        }).then(() => {
            this.el.classList.add("hidden")
            this.hidden = true;
        });
    }

    show() {
        return new Promise((resolve) => {
            this.el.classList.remove("hidden");
            this.el.style.opacity = 1;
            this.el.addEventListener("transitionend", resolve, true);
        }).then(() => {
            this.hidden = false;
        });
    }

    clear() {
        this.el.innerHTML = "";
    }
}

export {Results};