class State {
    constructor(states) {
        // Add the listener property to the states
        Object.keys(states).forEach((state) => {
            states[state].listeners = [];
        });
        this.states = states;

        // Attach listener for popstate event
        window.addEventListener("popstate", this.stateFromUrl.bind(this));

        // Attach listener for auth change
        firebase.auth().onAuthStateChanged(this.stateFromUrl.bind(this));

        // Load the state from the URL
        this.stateFromUrl();
    }

    go(state, alterHistory = true) {
        if (this.states[state]) {
            let config = this.states[state];

            // Check if the user needs to be authenticated
            if ((this.authenticated && config.authenticated >= 0) || (!this.authenticated && config.authenticated <= 0)) {
                if (this.current && this.states[this.current].container) {
                    // Hide the current container
                    let oldContainer = `container_${this.states[this.current].container}`;
                    document.getElementById(oldContainer).classList.remove("active");
                }

                if (config.container) {
                    // Show the new container
                    let newContainer = `container_${config.container}`;
                    document.getElementById(newContainer).classList.add("active");
                }

                // Switch the state over
                this._state = state;
                if (config.trigger && alterHistory) window.history.pushState(undefined, "", config.trigger);

                // Run all the listeners
                config.listeners.forEach((callback) => callback());
            } else if (this.authenticated) this.go("profile");
            else this.go("login");
        } else console.error(`Undefined state ${state}`);
    }

    link(url) {
        let state = this.stateFromTrigger(url);
        if (state) this.go(state);
    }

    back() {
        window.location.back();
    }

    listen(state, callback) {
        if (this.states[state]) this.states[state].listeners.push(callback);
    }

    stateFromUrl() {
        // Get the current URL and see if it matches a trigger
        let url = window.location.pathname;

        let state = this.stateFromTrigger(url);
        if (state) this.go(state, false);
    }

    stateFromTrigger(trigger) {
        let state = false;
        Object.keys(this.states).forEach((s) => {
            if (this.states[s].trigger == trigger) state = s;
        });
        return state;
    }

    get current() {
        return this._state;
    }

    get authenticated() {
        return window.firebase.auth().currentUser != null;
    }
}

export {State};