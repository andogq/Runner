class Sidebar {
    constructor(id, states) {
        this.states = states;
        this.container = document.getElementById(id);

        this.switch(Object.keys(this.states)[0]);
    }

    createButton(id, icon, text) {
        let el = document.createElement("div");
        el.id = `button_${id}`;

        let iconEl = document.createElement("span");
        iconEl.classList.add("material-icons");
        iconEl.innerText = icon;

        let textEl = document.createElement("h6");
        textEl.innerText = text;

        el.appendChild(iconEl);
        el.appendChild(textEl);

        return el;
    }

    switch(state) {
        if (this.states[state]) {
            // Clear the container
            this.container.innerText = "";

            this.states[state].forEach((button) => {
                let el;
                if (button == "hr") el = document.createElement("hr");
                else if (button == "back") {
                    el = this.createButton("back", "arrow_back", "Back");
                    el.addEventListener("click", () => window.modules.state.back());
                } else {
                    el = this.createButton(button.link, button.icon, button.text)
                    el.addEventListener("click", () => window.modules.state.go(button.link));
                }
                this.container.appendChild(el);
            });
        }
    }
}

export {Sidebar};