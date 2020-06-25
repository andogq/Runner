const loaderId = "loader";

let loader = {
    ids: [],
    start: function() {
        function generateId() {
            return Math.floor(Math.random() * Math.pow(10, 10)).toString(16);
        }
        let id = generateId();

        while (this.ids.indexOf(id) != -1) id = generateId();
        
        if (this.ids.length == 0) document.getElementById(loaderId).classList.add("animate");
        this.ids.push(id);

        return id;
    },
    stop: function(id) {
        let index = this.ids.indexOf(id);

        if (index != -1) {
            this.ids.splice(index);

            if (this.ids.length == 0) document.getElementById(loaderId).classList.remove("animate");
        }
    }
}

export {loader};