import type { NotificationButton, Notification } from "./types";

class Notifications {
    private notifications: Array<Notification>;
    private time: number;

    constructor() {
        this.notifications = [];
        this.time = performance.now();
        this.loop();
        window.addEventListener("notify:alert", (e:CustomEvent) => {
            if (e?.detail) this.push(e.detail);
        });
    }

    private loop() {
        const newTime = performance.now();
        const deltaTime = (newTime - this.time) / 1000;
        this.time = newTime;
        if (document.hasFocus()) {
            for (let i = this.notifications.length - 1; i >= 0; i--) {
                if (this.notifications[i]?.duration && this.notifications[i]?.duration !== Infinity) {
                    this.notifications[i].duration -= deltaTime;
                    if (this.notifications[i].timer) {
                        const scale = this.notifications[i].duration / this.notifications[i].timerDuration;
                        if (this.notifications[i].timer === "vertical") {
                            this.notifications[i].timerEl.style.transform = `scaleY(${scale})`;
                        } else {
                            this.notifications[i].timerEl.style.transform = `scaleX(${scale})`;
                        }
                    }
                    if (this.notifications[i].duration <= 0) {
                        this.notifications[i].el.remove();
                        this.notifications.splice(i, 1);
                    }
                }
            }
        }
        window.requestAnimationFrame(this.loop.bind(this));
    }

    public push(settings: Partial<Notification>) {
        const notification: Notification = Object.assign(
            {
                title: "Title Required",
                message: "Notificaitons require a message.",
                closeable: true,
                icon: null,
                duration: 30,
                classes: [],
                el: null,
                timerEl: null,
                autofocus: true,
                buttons: [],
                timer: null,
                timerDuration: 30,
            },
            settings
        );

        if (!Array.isArray(notification.buttons)) {
            notification.buttons = [notification.buttons];
        }

        if (!Array.isArray(notification.classes)) {
            notification.classes = [notification.classes];
        }

        if ((notification.duration !== Infinity && notification.timer === "vertical") || notification.timer === "horizontal") {
            notification.timerDuration = notification.duration;
        }

        notification.el = new NotificationComponent(notification);
        if (notification.timer) {
            notification.timerEl = notification.el.querySelector("notification-timer");
        }
        this.notifications.push(notification);
        const shell = this.getShell();
        shell.appendChild(notification.el);
    }

    private getShell(): HTMLElement {
        const shell: HTMLElement = document.body.querySelector("notifications-component") || document.createElement("notifications-component");
        if (!shell.isConnected) {
            document.body.appendChild(shell);
        }
        return shell;
    }

    public append(el: HTMLElement) {
        const shell = this.getShell();
        shell.appendChild(el);
    }
}

class NotificationComponent extends HTMLElement {
    private settings: Notification;
    constructor(notification: Notification) {
        super();
        this.settings = notification;
        this.render();
    }

    private handleCloseClickEvent: EventListener = () => {
        this.remove();
    };

    private handleActionButtonClick: EventListener = (e: Event) => {
        const target = e.currentTarget as HTMLElement;
        const index = parseInt(target.dataset.index);
        this.settings.buttons[index].callback();
        this.remove();
    };

    private render() {
        for (let i = 0; i < this.settings.classes.length; i++) {
            this.classList.add(this.settings.classes[i]);
        }
        this.innerHTML = `
            ${this.settings.icon ? `
                <i>${this.settings.icon}</i>
            ` : ""}
            <copy-wrapper>
                <h3 role="${this.settings.closeable ? "alertdialog" : "alert"}">${this.settings.title}</h3>
                <p>${this.settings.message}</p>
                ${this.settings.buttons.length ? `
                    <notification-actions>
                    ${this.settings.buttons.map((button:NotificationButton, index:number) => {
                        return `<button class="${button.classes?.join(" ")}" data-index="${index}" ${button?.ariaLabel ? `aria-label="${button.ariaLabel}"` : ""}>${button.label}</button>`;
                    })}
                    </notification-actions>
            ` : ""}
            </copy-wrapper>
            ${this.settings.closeable ? `
                <button aria-label="close notification" class="close js-notification-close">
                    <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="times" class="svg-inline--fa fa-times fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"></path></svg>
                </button>
            ` : ""}
            ${this.settings.timer ? `
                <notification-timer class="${this.settings.timer}" style="transform: ${this.settings.timer === "horizontal" ? "scaleX(1)" : "scaleY(1)"};"></notification-timer>
            ` : ""}
        `;
        this.querySelectorAll("button[data-index]").forEach(button => {
            button.addEventListener("click", this.handleActionButtonClick);
        });
        const closeBttn = this.querySelector(".js-notification-close");
        if (closeBttn){
            closeBttn.addEventListener("click", this.handleCloseClickEvent);
        }
    }

    connectedCallback(){
        if (this.settings.autofocus){
            const closeButton:HTMLButtonElement = this.querySelector(".js-notification-close");
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
                        button.focus();
                        break;
                    }
                }
            }
        }
    }
}
if (!customElements.get("notification-component")) {
    customElements.define("notification-component", NotificationComponent);
}

const notifications = new Notifications();
export default notifications;
