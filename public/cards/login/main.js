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

    ["email", "password", "button"].forEach((type) => el[type].disabled = true);

    window.interfaces.authentication.login(email, password).then(() => console.log("Success!")).catch((error) => {
        console.log(error);

        Object.keys(error).forEach((type) => {
            if (type != undefined) {
                el[type].classList.add("error");
                el.error[type].innerText = error[type];
            }
        });
    }).finally(() => ["email", "password", "button"].forEach((type) => el[type].disabled = false));
}

function init(container) {
    el = {
        container,
        error: {},
        button: container.querySelector("#button_login")
    };
    
    ["email", "password"].forEach((type) => {
        el[type] = el.container.querySelector(`#input_login_${type}`);
        el.error[type] = el[type].parentElement.children[2];
    });

    el.button.addEventListener("click", login);
    el.container.addEventListener("keypress", (e) => {
        if (e.key == "Enter") login();
    });
};

function update() {}

export {init, update}