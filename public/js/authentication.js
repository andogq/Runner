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
    login() {
        this.clearErrors();

        let emailEl = document.getElementById("input_login_email");
        let passwordEl = document.getElementById("input_login_password");

        let email = emailEl.value;
        let password = passwordEl.value;

        return firebase.auth().signInWithEmailAndPassword(email, password).then((credential) => {
            console.log(credential);
        }).catch((e) => {
            let emailError = emailEl.parentElement.children[2];
            let passwordError = passwordEl.parentElement.children[2];

            switch (e.code) {
                case "auth/invalid-email": {
                    emailError.innerHTML = e.message;
                    emailEl.classList.add("error");
                    break;
                }
                case "auth/user-disabled": {
                    emailError.innerHTML = e.message;
                    emailEl.classList.add("error");
                    break;
                }
                case "auth/user-not-found": {
                    emailError.innerHTML = e.message;
                    emailEl.classList.add("error");
                    break;
                }
                case "auth/wrong-password": {
                    passwordError.innerHTML = e.message;
                    passwordEl.classList.add("error");
                    break;
                }
            }
        });
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
    }
}

export {authentication};