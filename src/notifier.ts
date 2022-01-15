import { SnackbarNotification, ToasterNotification } from "./types";
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
                    if (this.toaster[i].timer) {
                        const scale = this.toaster[i].duration / this.toaster[i].timerDuration;
                        if (this.toaster[i].timer === "vertical") {
                            this.toaster[i].timerEl.style.transform = `scaleY(${scale})`;
                        } else {
                            this.toaster[i].timerEl.style.transform = `scaleX(${scale})`;
                        }
                    }
                    if (this.toaster[i].duration <= 0) {
                        this.toaster[i].el.remove();
                        this.toaster.splice(i, 1);
                    }
                }
            }
            if (this.snackbarQueue.length) {
                if (!this.snackbarQueue?.[0]?.el) {
                    this.snackbarQueue[0].el = new SnackbarComponent(this.snackbarQueue[0]);
                    document.body.appendChild(this.snackbarQueue[0].el);
                }
                if (this.snackbarQueue[0]?.duration && this.snackbarQueue[0]?.duration !== Infinity && this.snackbarQueue[0]?.el?.isConnected) {
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
        const snackbar: SnackbarNotification = Object.assign(
            {
                message: "Snackbar notificaitons require a message",
                uid: this.uid(),
                el: null,
                duration: 30,
                closeable: true,
                buttons: [],
                force: true,
                classes: [],
                autofocus: true,
            },
            settings
        );

        if (!Array.isArray(snackbar.buttons)) {
            snackbar.buttons = [snackbar.buttons];
        }

        if (!Array.isArray(snackbar.classes)) {
            snackbar.classes = [snackbar.classes];
        }

        if (snackbar.force && this.snackbarQueue.length) {
            if (this.snackbarQueue[0]?.el?.isConnected) {
                this.snackbarQueue[0].el.remove();
            }
            this.snackbarQueue.splice(0, 1, snackbar);
        } else {
            this.snackbarQueue.push(snackbar);
        }
    }

    public toast(settings: Partial<ToasterNotification>) {
        const toast: ToasterNotification = Object.assign(
            {
                title: "Title Required",
                message: "Toast notificaitons require a message",
                closeable: true,
                icon: null,
                duration: 30,
                classes: [],
                uid: this.uid(),
                el: null,
                timerEl: null,
                autofocus: true,
                buttons: [],
                timer: null,
                timerDuration: 30,
            },
            settings
        );

        if (!Array.isArray(toast.buttons)) {
            toast.buttons = [toast.buttons];
        }

        if (!Array.isArray(toast.classes)) {
            toast.classes = [toast.classes];
        }

        if ((toast.duration !== Infinity && toast.timer === "vertical") || toast.timer === "horizontal") {
            toast.timerDuration = toast.duration;
        }

        toast.el = new ToastComponent(toast);
        if (toast.timer) {
            toast.timerEl = toast.el.querySelector("toast-timer");
        }
        this.toaster.push(toast);
        const shell = this.getShell();
        shell.appendChild(toast.el);
    }

    private getShell(): HTMLElement {
        const shell: HTMLElement = document.body.querySelector("toaster-component") || document.createElement("toaster-component");
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
