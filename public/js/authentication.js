let authentication = {
    register(firstname, lastname, email, password) {
        let loadId = window.loader.start();

        return firebase.auth().createUserWithEmailAndPassword(email, password).catch((e) => {
            let emailError;
            let passwordError;

            switch (e.code) {
                case "auth/email-already-in-use":
                case "auth/invalid-email": {
                    emailError = e.message;
                    break;
                }
                case "auth/weak-password": {
                    passwordError = e.message;
                    break;
                }
            }

            throw({email: emailError, password: passwordError});
        }).finally(() => window.loader.stop(loadId));
    },
    login(email, password) {
        let loadId = window.loader.start();

        return firebase.auth().signInWithEmailAndPassword(email, password).catch((e) => {
            let emailError;
            let passwordError;

            switch (e.code) {
                case "auth/invalid-email":
                case "auth/user-disabled":
                case "auth/user-not-found": {
                    emailError = e.message;
                    break;
                }
                case "auth/wrong-password": {
                    passwordError = e.message;
                    break;
                }
            }

            throw({email: emailError, password: passwordError});
        }).finally(() => window.loader.stop(loadId));
    },
    clearErrors() {
        [...document.getElementById("container").getElementsByClassName("authentication")].forEach((el) => {
            [...el.getElementsByClassName("error")].forEach((e) => {
                e.classList.remove("error");
                e.parentElement.children[2].innerHTML = "";
            });
        });
    },
    init() {
        document.getElementById("button_login").addEventListener("click", this.login.bind(this));
        document.getElementById("button_register").addEventListener("click", this.register.bind(this));

        window.firebase.auth().onAuthStateChanged(() => {
            // Check login
            if (window.firebase.auth().currentUser != null) this.postLogin();
        });
    }
}

export {authentication};