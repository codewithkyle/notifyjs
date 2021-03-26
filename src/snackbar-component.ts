import { SnackbarNotification, NotificationButton } from "./types";

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
        this.remove();
    };

    private handleCloseClickEvent: EventListener = () => {
        this.remove();
    };

    private render() {
        this.dataset.uid = this.settings.uid;
        for (let i = 0; i < this.settings.classes.length; i++) {
            this.classList.add(this.settings.classes[i]);
        }
        this.innerHTML = `
            <p role="${this.settings.closeable || this.settings.buttons.length ? "alertdialog" : "alert"}">${this.settings.message}</p>
            ${this.settings.closeable || this.settings.buttons.length ? `
                <snackbar-actions>
                    ${this.settings.buttons.map((button:NotificationButton, index:number) => {
                        return `<button ${button?.ariaLabel ? `aria-label="${button.ariaLabel}"` : ""} data-index="${index}" class="${button.classes?.join(" ")}">${button.label}</button>`;
                    })}
                    ${this.settings.closeable ? `
                        <button aria-label="close notification" class="close js-snackbar-close">
                            <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="times" class="svg-inline--fa fa-times fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"></path></svg>
                        </button>
                    ` : ""}
                </snackbar-actions>
            ` : ""}
        `;
        this.querySelectorAll("button[data-index]").forEach(button => {
            button.addEventListener("click", this.handleActionButtonClick);
        });
        const closeBttn = this.querySelector(".close");
        if (closeBttn){
            closeBttn.addEventListener("click", this.handleCloseClickEvent);
        }
    }

    connectedCallback(){
        if (this.settings.autofocus){
            const closeButton:HTMLButtonElement = this.querySelector(".js-snackbar-close");
            if (closeButton){
                // @ts-ignore
                document.activeElement.blur();
                closeButton.focus();
            }
        }
        if (this.settings.buttons.length) {
            for (let i = 0; i < this.settings.buttons.length; i++) {
                if (this.settings.buttons[i]?.autofocus){
                    const button:HTMLButtonElement = this.querySelector(`button[data-index="${i}"]`);
                    if (button){
                        // @ts-ignore
                        document.activeElement.blur();
                        button.focus();
                        break;
                    }
                }
            }
        }
    }
}
