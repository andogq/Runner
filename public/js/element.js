class Element {
    constructor(id) {
        this.el = document.getElementById(id);

        this.hidden = this.el.classList.contains("hidden");
    }
    
    hide() {
        if (this.hidden) return Promise.resolve();
        else return new Promise((resolve) => {
            this.el.style.opacity = 0;
            this.addEventListener("transitionend", resolve, true);
        }).then(() => {
            this.el.classList.add("hidden");
            this.hidden = true;
        });
    }

    show() {
        if (!this.hidden) return Promise.resolve();
        else return new Promise((resolve) => {
            this.el.classList.remove("hidden");
            this.el.style.opacity = 1;
            this.addEventListener("transitionend", resolve, true);
        }).then(() => {
            this.hidden = false;
        });
    }

    appendChild(child) {
        this.el.appendChild(child);
    }

    clear() {
        this.innerHTML = "";
    }

    addEventListener(event, callback, options) {
        this.el.addEventListener(event, callback, options);
    }

    get value() {
        return this.el.value;
    }
    set value(value) {
        this.el.value = value;
    }

    get innerHTML() {
        return this.el.innerHTML;
    }
    set innerHTML(innerHTML) {
        this.el.innerHTML = innerHTML;
    }
}

export {Element};