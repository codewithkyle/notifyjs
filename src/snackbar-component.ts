import { SnackbarNotification } from "./types";

export class SnackbarComponent extends HTMLElement {
    private settings: SnackbarNotification;
    constructor(snackbar: SnackbarNotification) {
        super();
        this.settings = snackbar;
        this.render();
    }

    private handleActionButtonClick: EventListener = (e: Event) => {
        const target = e.currentTarget as HTMLElement;
        const index = parseInt(target.dataset.index);
        this.settings.buttons[index].callback();
    };

    private handleCloseClickEvent: EventListener = () => {
        this.remove();
    };

    private render() {
        this.dataset.uid = this.settings.uid;

        for (let i = 0; i < this.settings.classes.length; i++) {
            this.classList.add(this.settings.classes[i]);
        }

        const message = document.createElement("p");
        message.innerText = this.settings.message;
        if (this.settings.closeable || this.settings.buttons.length){
            message.setAttribute("role", "alertdialog");
        }else{
            message.setAttribute("role", "alert");
        }
        this.appendChild(message);

        if (this.settings.closeable || this.settings.buttons.length) {
            const actionsWrapper = document.createElement("snackbar-actions");

            if (this.settings.buttons.length) {
                for (let i = 0; i < this.settings.buttons.length; i++) {
                    const button = document.createElement("button");
                    button.innerText = this.settings.buttons[i].label;
                    button.dataset.index = `${i}`;

                    for (let k = 0; k < this.settings.buttons[i].classes.length; k++) {
                        button.classList.add(this.settings.buttons[i].classes[k]);
                    }

                    if (this.settings.buttons[i].ariaLabel) {
                        button.setAttribute("aria-label", this.settings.buttons[i].ariaLabel);
                    }

                    button.addEventListener("click", this.handleActionButtonClick);

                    actionsWrapper.appendChild(button);
                }
            }

            if (this.settings.closeable) {
                const closeButton = document.createElement("button");
                closeButton.setAttribute("aria-label", "close notification");
                closeButton.className = "close js-snackbar-close";
                closeButton.innerHTML =
                    '<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="times" class="svg-inline--fa fa-times fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"></path></svg>';
                closeButton.addEventListener("click", this.handleCloseClickEvent);
                actionsWrapper.appendChild(closeButton);
            }

            this.appendChild(actionsWrapper);
        }
    }

    connectedCallback(){
        if (this.settings.autofocus){
            const closeButton:HTMLButtonElement = this.querySelector(".js-snackbar-close");
            if (closeButton){
                closeButton.focus();
            }
        }
        if (this.settings.buttons.length) {
            for (let i = 0; i < this.settings.buttons.length; i++) {
                if (this.settings.buttons[i].autofocus){
                    const button:HTMLButtonElement = this.querySelector(`button[data-index="${i}"]`);
                    if (button){
                        button.focus();
                        break;
                    }
                }
            }
        }
    }
}
