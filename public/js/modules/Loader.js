class Loader {
    constructor(id) {
        this.el = document.getElementById(id);
        this.ids = [];
    }

    start() {
        function generateId() {
            return Math.floor(Math.random() * Math.pow(10, 10)).toString(16);
        }
        let id = generateId();

        while (this.ids.indexOf(id) != -1) id = generateId();
        
        if (this.ids.length == 0) this.el.classList.add("animate");
        this.ids.push(id);

        return id;
    }

    stop(id) {
        let index = this.ids.indexOf(id);

        if (index != -1) {
            this.ids.splice(index);

            if (this.ids.length == 0) this.el.classList.remove("animate");
        }
    }
}

export {Loader};