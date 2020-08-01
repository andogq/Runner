class State {
    constructor(states) {
        this.states = states;

        // Attach listener for popstate event
        window.addEventListener("popstate", this.stateFromUrl.bind(this));

        // Attach listener for auth change
        window.addEventListener("runner_authenticationChange", this.stateFromUrl.bind(this));

        // Load the state from the URL
        this.stateFromUrl();
    }

    go(state, alterHistory = true) {
        if (this.states[state]) {
            let config = this.states[state];

            // Check if the user needs to be authenticated
            if ((window.interfaces.authentication.authenticated && config.authenticated >= 0) || (!window.interfaces.authentication.authenticated && config.authenticated <= 0)) {
                // Switch the state over
                this._state = state;
                if (config.trigger && alterHistory) window.history.pushState(undefined, "", config.trigger);

                // Emit the event
                window.dispatchEvent(new CustomEvent("runner_stateChange", {detail: state}));
            } else if (window.interfaces.authentication.authenticated) this.go("profile");
            else this.go("login");
        } else console.error(`Undefined state ${state}`);
    }

    link(url) {
        let state = this.stateFromTrigger(url);
        if (state) this.go(state);
    }

    back() {
        window.history.back();
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
}

export {State};