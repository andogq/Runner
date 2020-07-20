let authentication = {
    register() {
        this.clearErrors();

        let emailEl = document.getElementById("input_register_email");
        let passwordEl = document.getElementById("input_register_password");

        let email = emailEl.value;
        let password = passwordEl.value;

        return firebase.auth().createUserWithEmailAndPassword(email, password).then((credential) => {
            console.log(credential);
        }).catch((e) => {
            let emailError = emailEl.parentElement.children[2];
            let passwordError = passwordEl.parentElement.children[2];

            switch (e.code) {
                case "auth/email-already-in-use": {
                    emailError.innerHTML = e.message;
                    emailEl.classList.add("error");
                    break;
                }
                case "auth/invalid-email": {
                    emailError.innerHTML = e.message;
                    emailEl.classList.add("error");
                    break;
                }
                case "auth/weak-password": {
                    passwordError.innerHTML = e.message;
                    passwordEl.classList.add("error");
                    break;
                }
                default: {
                    console.error("Uncaught error: ", e);
                }
            }
        });
    },
    login(email, password) {
        let loadId = window.loader.start();

        return firebase.auth().signInWithEmailAndPassword(email, password).then(this.postLogin).catch((e) => {
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
    postLogin() {
        console.log(window.firebase.auth().currentUser);
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