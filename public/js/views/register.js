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

const register_student_form = $("#register-student-form");
const register_company_form = $("#register-company-form");

const user_selection_button = $("#user-selection-button");
user_selection_button.addEventListener("click", function(event) {
    register_company_form.classList.add("hidden");
    register_student_form.classList.remove("hidden");
});

const company_selection_button = $("#company-selection-button");
company_selection_button.addEventListener("click", function(event) {
    register_student_form.classList.add("hidden");
    register_company_form.classList.remove("hidden");
});

const register_forms = $s(".register-form");
const notifications_container = $("#notifications-container");
register_forms.forEach(function(form) {
    form.addEventListener("submit", async function(event) {
        event.preventDefault();
        
        const form_data = new FormData(form);
    
        const url = form.action;
    
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
});
