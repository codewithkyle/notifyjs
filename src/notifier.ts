import { SnackbarNotification, ToasterNotification, NotificationButton } from "./types";
import { SnackbarComponent } from "./snackbar-component";
import { ToastComponent } from "./toast-component";

export class Notifier {
    private snackbarQueue: Array<SnackbarNotification>;
    private toaster: Array<ToasterNotification>;
    private time: number;

    constructor() {
        this.snackbarQueue = [];
        this.toaster = [];
        this.time = performance.now();
        this.loop();
    }

    private uid(): string {
        return new Array(4)
            .fill(0)
            .map(() => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16))
            .join("-");
    }

    private loop() {
        const newTime = performance.now();
        const deltaTime = (newTime - this.time) / 1000;
        this.time = newTime;
        if (document.hasFocus()) {
            for (let i = this.toaster.length - 1; i >= 0; i--) {
                if (this.toaster[i]?.duration && this.toaster[i]?.duration !== Infinity) {
                    this.toaster[i].duration -= deltaTime;
                    if (this.toaster[i].duration <= 0) {
                        this.toaster[i].el.remove();
                        this.toaster.splice(i, 1);
                    }
                }
            }
            if (this.snackbarQueue.length) {
                if (!this.snackbarQueue[0].el) {
                    this.snackbarQueue[0].el = new SnackbarComponent(this.snackbarQueue[0]);
                    document.body.appendChild(this.snackbarQueue[0].el);
                }
                if (this.snackbarQueue[0]?.duration && this.snackbarQueue[0]?.duration !== Infinity) {
                    this.snackbarQueue[0].duration -= deltaTime;
                    if (this.snackbarQueue[0].duration <= 0) {
                        this.snackbarQueue[0].el.remove();
                        this.snackbarQueue.splice(0, 1);
                    }
                }
            }
        }
        window.requestAnimationFrame(this.loop.bind(this));
    }

    public snackbar(settings: Partial<SnackbarNotification>) {
        const snackbar: Partial<SnackbarNotification> = {};

        if (!settings?.message || settings?.message?.length === 0) {
            console.error("Snackbar notificaitons require a message");
            return;
        }

        snackbar.message = settings.message;
        snackbar.uid = this.uid();
        snackbar.el = null;

        let classes: Array<string> = [];
        if (settings?.classes) {
            if (Array.isArray(settings.classes)) {
                classes = settings.classes;
            } else {
                classes = [settings.classes];
            }
        }
        snackbar.classes = classes;

        if (typeof settings?.duration === "number" || settings?.duration === Infinity) {
            snackbar.duration = settings.duration;
        } else {
            snackbar.duration = 3;
        }

        if (typeof settings?.closeable !== "undefined" && typeof settings?.closeable === "boolean") {
            snackbar.closeable = settings?.closeable;
        } else {
            snackbar.closeable = true;
        }

        if (typeof settings?.force !== "undefined" && typeof settings?.force === "boolean") {
            snackbar.force = settings?.force;
        } else {
            snackbar.force = false;
        }

        if (typeof settings?.autofocus !== "undefined" && typeof settings?.autofocus === "boolean"){
            snackbar.autofocus = settings.autofocus;
        }else{
            snackbar.autofocus = true;
        }

        let buttons: Array<NotificationButton> = [];
        if (settings?.buttons) {
            if (Array.isArray(settings.buttons)) {
                buttons = settings.buttons;
            } else {
                buttons = [settings.buttons];
            }
        }
        snackbar.buttons = buttons;
        for (let i = 0; i < snackbar.buttons.length; i++) {
            if (snackbar.buttons[i]?.classes) {
                if (Array.isArray(snackbar.buttons[i].classes)) {
                    snackbar.buttons[i].classes = snackbar.buttons[i].classes;
                } else {
                    // @ts-ignore
                    snackbar.buttons[i].classes = [snackbar.buttons[i].classes];
                }
            } else {
                snackbar.buttons[i].classes = [];
            }
            if (!snackbar.buttons[i]?.ariaLabel) {
                snackbar.buttons[i].ariaLabel = null;
            }
            if (!snackbar.buttons[i]?.label) {
                console.error("Snackbar buttons require a label");
                snackbar.buttons[i].label = null;
            }
            if (!snackbar.buttons[i]?.callback) {
                console.error("Snackbar buttons require a callback function");
                snackbar.buttons[i].callback = () => {};
            }
            if (!snackbar.buttons[i]?.autofocus){
                snackbar.buttons[i].autofocus = false;
            }else{
                snackbar.autofocus = false;
            }
        }

        if (snackbar.force && this.snackbarQueue.length) {
            this.snackbarQueue[0].el.remove();
            this.snackbarQueue.splice(0, 1, snackbar as SnackbarNotification);
        } else {
            this.snackbarQueue.push(snackbar as SnackbarNotification);
        }
    }

    public toast(settings: Partial<ToasterNotification>) {
        const toast: Partial<ToasterNotification> = {};

        if (!settings?.message || settings?.message?.length === 0) {
            console.error("Toast notificaitons require a message");
            return;
        } else if (!settings?.title || settings?.title?.length === 0) {
            console.error("Toast notificaitons require a title");
            return;
        }

        toast.title = settings.title;
        toast.message = settings.message;
        toast.uid = this.uid();

        let classes: Array<string> = [];
        if (settings?.classes) {
            if (Array.isArray(settings.classes)) {
                classes = settings.classes;
            } else {
                classes = [settings.classes];
            }
        }
        toast.classes = classes;

        if (typeof settings?.duration === "number" || settings?.duration === Infinity) {
            toast.duration = settings.duration;
        } else {
            toast.duration = 3;
        }

        if (typeof settings?.closeable !== "undefined" && typeof settings?.closeable === "boolean") {
            toast.closeable = settings.closeable;
        } else {
            toast.closeable = true;
        }

        if (settings?.icon && typeof settings?.icon === "string") {
            toast.icon = settings.icon;
        } else {
            toast.icon = null;
        }

        if (typeof settings?.autofocus !== "undefined" && typeof settings?.autofocus === "boolean"){
            toast.autofocus = settings.autofocus;
        }else{
            toast.autofocus = false;
        }

        toast.el = new ToastComponent(toast as ToasterNotification);
        this.toaster.push(toast as ToasterNotification);

        let shell = document.body.querySelector("toaster-component") || null;
        if (!shell) {
            shell = document.createElement("toaster-component");
            document.body.appendChild(shell);
        }
        shell.appendChild(toast.el);
    }
}
