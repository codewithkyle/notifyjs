type NotificationButton = {
    label: string;
    callback: Function;
    ariaLabel?: string;
    classes?: Array<string> | string;
};

type SnackbarNotification = {
    message: string;
    duration?: number;
    closeable?: boolean;
    buttons?: Array<NotificationButton>;
    position?: string;
    element?: HTMLElement;
    force?: boolean;
    classes?: Array<string> | string;
};

type VerificationResponse = {
    validNotification: SnackbarNotification;
    warnings: Array<string>;
};

type ToasterNotification = {
    title: string;
    message: string;
    closeable?: boolean;
    icon?: string;
    duration?: number;
    classes?: string[];
    element?: HTMLElement;
};

export class NotificationManager {
    private _queue: Array<SnackbarNotification>;
    private _callback: Function;
    private _time: number;
    private toaster: Array<ToasterNotification>;

    constructor() {
        this._queue = [];
        this._callback = () => {};
        this._time = 0;
        this.toaster = [];
        this.startCallback();
    }

    private handleCloseClickEvent: EventListener = this.removeNotification.bind(this);
    private handleActionButtonClick: EventListener = this.activateButton.bind(this);

    private activateButton(e: Event): void {
        const buttonEl = e.currentTarget as HTMLButtonElement;
        const button = this._queue[0].buttons[parseInt(buttonEl.dataset.index)];
        button.callback();
        this.removeNotification();
    }

    private createNotification(notification: SnackbarNotification): void {
        const el = document.createElement("snackbar-component");

        /** @deprecated */
        el.setAttribute("position", notification.position);

        for (let i = 0; i < notification?.classes?.length; i++) {
            el.classList.add(notification.classes[i]);
        }

        const message = document.createElement("p");
        message.innerText = notification?.message;
        el.appendChild(message);

        if (notification?.closeable || notification?.buttons?.length) {
            const actionsWrapper = document.createElement("snackbar-actions");

            if (notification?.buttons?.length) {
                for (let i = 0; i < notification.buttons.length; i++) {
                    const button = document.createElement("button");
                    button.innerText = notification.buttons[i].label;
                    button.dataset.index = `${i}`;

                    for (let k = 0; k < notification.buttons[i].classes.length; k++) {
                        button.classList.add(notification.buttons[i].classes[k]);
                    }

                    if (notification.buttons[i].ariaLabel) {
                        button.setAttribute("aria-label", notification.buttons[i].ariaLabel);
                    }

                    button.addEventListener("click", this.handleActionButtonClick);

                    actionsWrapper.appendChild(button);
                }
            }

            if (notification?.closeable) {
                const closeButton = document.createElement("close-button");
                closeButton.setAttribute("aria-label", "close notification");
                closeButton.setAttribute("aria-pressed", "false");
                closeButton.setAttribute("role", "button");
                closeButton.innerHTML =
                    '<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="times" class="svg-inline--fa fa-times fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"></path></svg>';
                closeButton.addEventListener("click", this.handleCloseClickEvent);
                actionsWrapper.appendChild(closeButton);
            }

            el.appendChild(actionsWrapper);
        }

        document.body.appendChild(el);
        notification.element = el;
    }

    private removeNotification(): void {
        this._queue[0].element.remove();
        this._queue.splice(0, 1);
        if (this._queue.length !== 0) {
            this.createNotification(this._queue[0]);
        }
    }

    private startCallback(): void {
        this._callback = this.animationFrameCallback.bind(this);
        this._time = performance.now();
        this._callback();
        if (this._queue.length) {
            this.createNotification(this._queue[0]);
        }
    }

    private animationFrameCallback(): void {
        const newTime = performance.now();
        const deltaTime = (newTime - this._time) / 1000;
        this._time = newTime;

        if (document.hasFocus()) {
            if (this._queue.length) {
                if (this._queue[0].duration !== Infinity) {
                    this._queue[0].duration -= deltaTime;
                    if (this._queue[0].duration <= 0) {
                        this.removeNotification();
                    }
                }
            }
            if (this.toaster.length) {
                for (let i = 0; i < this.toaster.length; i++) {
                    this.toaster[i].duration -= deltaTime;
                    if (this.toaster[i].duration <= 0) {
                        this.removeToasterNotification(this.toaster[i], i);
                    }
                }
            }
        }

        window.requestAnimationFrame(() => {
            this._callback();
        });
    }

    private validateNotification(notification: SnackbarNotification): Promise<string | VerificationResponse> {
        return new Promise((resolve, reject) => {
            const newNotification: Partial<SnackbarNotification> = {};
            let warnings: Array<string> = [];

            if (notification.element) {
                reject("Notifications create their own HTMLElement, do not provide one.");
            }

            if (!notification.message) {
                reject("Notifications require a message.");
            } else {
                newNotification.message = notification.message;
            }

            if (notification.closeable) {
                newNotification.closeable = notification.closeable;
            } else {
                newNotification.closeable = false;
            }

            if (notification.duration) {
                newNotification.duration = notification.duration;

                if (notification.duration === Infinity && newNotification.closeable) {
                    newNotification.duration = Infinity;
                }
            } else {
                newNotification.duration = 10;
            }

            if (notification.position) {
                warnings.push("The position property is deprecated");
                if (notification.position.match("top")) {
                    newNotification.position = "top";
                } else if (notification.position.match("bottom")) {
                    newNotification.position = "bottom";
                } else {
                    newNotification.position = "bottom";
                }

                if (notification.position.match("left")) {
                    newNotification.position += " left";
                } else if (notification.position.match("right")) {
                    newNotification.position += " right";
                } else if (notification.position.match("center")) {
                    newNotification.position += " center";
                } else {
                    newNotification.position += " center";
                }
            } else {
                newNotification.position = "bottom center";
            }

            if (notification.position) {
                warnings.push("The position property is deprecated");
                if (notification.position.match("top")) {
                    newNotification.position = "top";
                } else if (notification.position.match("bottom")) {
                    newNotification.position = "bottom";
                } else {
                    newNotification.position = "bottom";
                }

                if (notification.position.match("left")) {
                    newNotification.position += " left";
                } else if (notification.position.match("right")) {
                    newNotification.position += " right";
                } else if (notification.position.match("center")) {
                    newNotification.position += " center";
                } else {
                    newNotification.position += " center";
                }
            } else {
                newNotification.position = "bottom center";
            }

            if (notification.buttons) {
                const buttons: Array<NotificationButton> = [];

                for (let i = 0; i < notification.buttons.length; i++) {
                    const button: Partial<NotificationButton> = {};
                    const newWarnings: Array<string> = [];

                    if (notification.buttons[i].label) {
                        button.label = notification.buttons[i].label;
                    } else {
                        newWarnings.push("Buttons require a label.");
                    }

                    if (notification.buttons[i].callback) {
                        if (typeof notification.buttons[i].callback === "function") {
                            button.callback = notification.buttons[i].callback;
                        } else {
                            newWarnings.push("Buttons callbacks must be a function.");
                        }
                    } else {
                        newWarnings.push("Buttons require a callback function.");
                    }

                    if (notification.buttons[i].ariaLabel) {
                        button.ariaLabel = notification.buttons[i].ariaLabel;
                    }

                    if (notification.buttons[i].classes) {
                        if (typeof notification.buttons[i].classes === "string") {
                            // @ts-ignore
                            button.classes = [notification.buttons[i].classes];
                        } else if (Array.isArray(notification.buttons[i].classes)) {
                            button.classes = notification.buttons[i].classes;
                        } else {
                            reject("Notification classes must be a string or an array of strings.");
                        }
                    } else {
                        button.classes = [];
                    }

                    warnings = [...warnings, ...newWarnings];
                    if (newWarnings.length === 0) {
                        // @ts-ignore
                        buttons.push(button);
                    }
                }

                if (buttons.length) {
                    newNotification.buttons = buttons;
                }
            } else {
                newNotification.buttons = [];
            }

            if (notification.force) {
                newNotification.force = notification.force;
            } else {
                newNotification.force = false;
            }

            if (notification?.classes) {
                if (typeof notification.classes === "string") {
                    newNotification.classes = [notification.classes];
                } else if (Array.isArray(notification.classes)) {
                    newNotification.classes = notification.classes;
                } else {
                    reject("Notification classes must be a string or an array of strings.");
                }
            } else {
                newNotification.classes = [];
            }

            // @ts-ignore
            resolve({ validNotification: newNotification, warnings: warnings });
        });
    }

    public notify(notification: SnackbarNotification): void {
        this.validateNotification(notification)
            .then((response: VerificationResponse) => {
                if (this._queue.length === 0 || !response.validNotification.force) {
                    this._queue.push(response.validNotification);
                    if (this._queue.length === 1) {
                        this.createNotification(this._queue[0]);
                    }
                } else if (this._queue.length > 0 && response.validNotification.force) {
                    this._queue.splice(1, 0, response.validNotification);
                    this.removeNotification();
                }
                if (response.warnings.length !== 0) {
                    for (let i = 0; i < response.warnings.length; i++) {
                        console.warn(`NotifyJS: ${response.warnings[i]}`);
                    }
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    public snackbar = this.notify;

    private removeToasterNotification(notification: ToasterNotification, id: number) {
        notification.element.remove();
        this.toaster.splice(id, 1);
    }
    private handleToastClose: EventListener = (e: Event) => {
        const target = e.currentTarget as HTMLButtonElement;
        const id = parseInt(target.parentElement.dataset.id);
        this.removeToasterNotification(this.toaster[id], id);
    };

    private createToast(notification: ToasterNotification) {
        const el = document.createElement("toast-component");

        for (let i = 0; i < notification?.classes?.length; i++) {
            el.classList.add(notification.classes[i]);
        }

        if (notification?.icon) {
            const icon = document.createElement("i");
            icon.innerHTML = notification.icon;
            el.appendChild(icon);
        }

        const copyWrapper = document.createElement("copy-wrapper");
        const title = document.createElement("h3");
        title.innerText = notification?.title;
        copyWrapper.appendChild(title);
        const message = document.createElement("p");
        message.innerText = notification?.message;
        copyWrapper.appendChild(message);
        el.appendChild(copyWrapper);

        if (notification?.closeable) {
            const closeButton = document.createElement("button");
            closeButton.setAttribute("aria-label", "close notification");
            closeButton.innerHTML =
                '<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="times" class="svg-inline--fa fa-times fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"></path></svg>';
            closeButton.addEventListener("click", this.handleToastClose);
            el.appendChild(closeButton);
        }

        return el;
    }

    public toast(notification: ToasterNotification): void {
        let shell = document.body.querySelector("toaster-component") || null;
        if (!shell) {
            shell = document.createElement("toaster-component");
            document.body.appendChild(shell);
        }

        const notificationEl = this.createToast(notification);
        notificationEl.dataset.id = `${this.toaster.length}`;
        notification.element = notificationEl;

        if (notification?.duration && !isNaN(notification.duration)) {
            notification.duration = notification.duration;
        } else {
            notification.duration = 4;
        }

        this.toaster.push(notification);
        shell.appendChild(notificationEl);
    }
}
