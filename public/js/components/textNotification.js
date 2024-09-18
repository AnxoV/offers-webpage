export default class TextNotification extends HTMLElement {
    constructor(text, type = "default") {
        super();
        this.text = text;
        this.type = type;
    }

    connectedCallback() {
        this.innerHTML = `
            <span id="wrapper">
                ${this.text}
            </span>
            <button class="button button-transparent" id="close-notification-button">
                <img src="/media/svg/cross.svg" alt="close" class="icon">
            </button>
        `;

        this.setAttribute("type", this.type);

        this.addEventListener("click", function(event) {
            this.remove();
        });

        setTimeout(() => {
            this.remove();
        }, 500000000);
    }
}

customElements.define("text-notification", TextNotification);