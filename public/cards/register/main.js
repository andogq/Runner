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

    let name = el.name.value;
    let email = el.email.value;
    let password = el.password.value;

    ["name", "email", "password", "button"].forEach((type) => el[type].disabled = true);

    window.interfaces.authentication.register(name, email, password).then(() => console.log("Success!")).catch((error) => {
        console.log(error);

        Object.keys(error).forEach((type) => {
            if (error[type] != undefined) {
                el.error[type].innerText = error[type];
                el.error[type].classList.add("error");
            }
        });
    }).finally(() => ["name", "email", "password", "button"].forEach((type) => el[type].disabled = false));
}

function init(container) {
    el = {
        container,
        error: {},
        button: container.querySelector("#button_register")
    };

    ["name", "email", "password"].forEach((type) => {
        el[type] = el.container.querySelector(`#input_register_${type}`);
        el.error[type] = el[type].parentElement.children[2];
    });

    el.button.addEventListener("click", register);
    el.container.addEventListener("keypress", (e) => {
        if (e.key == "Enter") register();
    });
};

function update() {}

export {init, update}