import { $ } from "./utils.js"

const formElement = $("#login-form");
formElement.addEventListener("submit", async function(event) {
    event.preventDefault();
    
    const formData = new FormData(formElement);

    const url = formElement.action;

    const response = await fetch(url, {

        method: "POST",
        body: new URLSearchParams(formData)
    });

    if (response.ok) {
        const url = `${window.location.origin}/offers`;
        window.location.replace(url);
    }
});