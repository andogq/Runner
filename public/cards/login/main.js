let el;

function login() {
    // Clear errors
    Object.keys(el.error).forEach((elName) => {
        let e = el.error[elName];

        // Remove the error on the inputs
        e.classList.remove("error");
        // Clear the error text
        e.parentElement.children[2].innerText = ""
    });

    let email = el.email.value;
    let password = el.password.value;

    window.authentication.login(email, password).then(() => console.log("Success!")).catch((error) => {
        console.log(error);

        if (error.email) {
            el.email.classList.add("error");
            el.error.email.innerText = error.email;
        }

        if (error.password) {
            el.password.classList.add("error");
            el.error.password.innerText = error.password;
        }
    });
}

function init(container) {
    el = {
        container,
        email: container.querySelector("#input_login_email"),
        password: container.querySelector("#input_login_password")
    };
    el.error = {
        email: el.email.parentElement.children[2],
        password: el.password.parentElement.children[2]
    };

    el.container.querySelector("#button_login").addEventListener("click", login);
    el.container.addEventListener("keypress", (e) => {
        if (e.key == "Enter") login();
    });
};

function update() {}

export {init, update}