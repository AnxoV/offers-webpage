import {$, $s} from "../utils.js";
import TextNotification from "../components/textNotification.js";

const user_selection_buttons = $s("#user-selection-container > .button");
user_selection_buttons.forEach(function(button) {
    button.addEventListener("click", function(event) {

        user_selection_buttons.forEach(function(button) {
            button.classList.add("button-hollow");
        });

        button.classList.remove("button-hollow");
    });
});

const password_label = $("label[for='password']");
const password_input = $("input[type='password']", password_label);
const login_form = $("#login-form");

const user_selection_button = $("#user-selection-button");
user_selection_button.addEventListener("click", function(event) {
    password_label.classList.remove("hidden");
    password_input.setAttribute("required", "");
    login_form.action = "/auth"
});

const company_selection_button = $("#company-selection-button");

company_selection_button.addEventListener("click", function(event) {
    password_label.classList.add("hidden");
    password_input.removeAttribute("required");
    login_form.action = "/emailauth"
});

const notifications_container = $("#notifications-container");
login_form.addEventListener("submit", async function(event) {
    event.preventDefault();
    
    const form_data = new FormData(login_form);

    const url = login_form.action;

    const response = await fetch(url, {
        method: "POST",
        body: new URLSearchParams(form_data)
    });

    if (!response.ok) {
        const notification = new TextNotification(
            "Usuario o contraseña incorrectos",
            "warning"
        );
        notifications_container.appendChild(notification);
        return;
    }

    const redirect = `${window.location.origin}/offers`;
    window.location.replace(redirect);
});