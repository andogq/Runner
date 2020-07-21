let el;

function register() {
    // Clear errors
    Object.keys(el.error).forEach((elName) => {
        let e = el.error[elName];

        // Remove the error on the inputs
        e.classList.remove("error");
        // Clear the error text
        e.parentElement.children[2].innerText = ""
    });

    let firstname = el.firstname.value;
    let lastname = el.lastname.value;
    let email = el.email.value;
    let password = el.password.value;

    window.authentication.register(firstname, lastname, email, password).then(() => console.log("Success!")).catch((error) => {
        console.log(error);

        if (error.firstname) {
            el.firstname.classList.add("error");
            el.error.firstname.innerText = error.firstname;
        }
        if (error.lastname) {
            el.lastname.classList.add("error");
            el.error.lastname.innerText = error.lastname;
        }
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
        error: {}
    };

    ["firstname", "lastname", "email", "password"].forEach((type) => {
        el[type] = el.container.querySelector(`#input_register_${type}`);
        el.error[type] = el[type].parentElement.children[2];
    });

    el.container.querySelector("#button_register").addEventListener("click", register);
    el.container.addEventListener("keypress", (e) => {
        if (e.key == "Enter") register();
    });
};

function update() {}

export {init, update}