import {$} from "./utils.js";

const logout_button = $("#logout-button");
logout_button.addEventListener("click", function(event) {
    window.location.href = window.location.origin;
    console.log(event);
});