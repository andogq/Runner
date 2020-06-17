class Element {
    constructor(id) {
        this.el = document.getElementById(id);

        this.hidden = this.el.classList.contains("hidden");
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
}

export {Element};