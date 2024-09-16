import { $ } from "./utils.js"

const formElement = $("#logins-form");
formElement.addEventListener("submit", async function(event) {
    event.preventDefault();
    
    const formData = new FormData(formElement);

    const url = formElement.action;

    const response = await fetch(url, {

        method: "POST",
        body: new URLSearchParams(formData)
    });

    if (response.ok) {
        console.log("Logged in!");
    }
});