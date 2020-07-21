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
    init() {
        window.firebase.auth().onAuthStateChanged(() => {
            // Check login
            console.log("Login change");
        });
    }
}

export {authentication};