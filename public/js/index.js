import {$, $s} from "./utils.js";

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

const user_selection_button = $("#user-selection-button");
user_selection_button.addEventListener("click", function(event) {
    password_label.classList.remove("hidden");
});

const company_selection_button = $("#company-selection-button");
company_selection_button.addEventListener("click", function(event) {
    password_label.classList.add("hidden");
});