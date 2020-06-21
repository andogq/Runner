let state = {
    get: function() {
        return window.location.pathname.replace(/^\//, "");
    },
    set: function(newState = "", noPush = false) {
        if (!noPush) window.history.pushState(undefined, "", "/" + newState);

        // Remove old active containers
        let active = [...document.getElementById("container").getElementsByClassName("active")];
        if (active) active.forEach((container) => {
            container.classList.remove("active");
        });
    
        // Add the new container
        let newActive = document.getElementById(`container_${newState}`);
        if (newActive) newActive.classList.add("active");
    }
}

window.addEventListener("popstate", (e) => state.set(state.get(), true));

export {state};