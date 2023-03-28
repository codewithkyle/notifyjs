import type { ToastNotification } from "./types";

class Toaster {
    private toastQueue: Array<ToastNotification>;
    private time: number;

    constructor() {
        this.toastQueue = [];
        this.time = performance.now();
        this.loop();
    }

    private loop() {
        const newTime = performance.now();
        const deltaTime = (newTime - this.time) / 1000;
        this.time = newTime;
        if (document.hasFocus()) {
            for (let i = this.toastQueue.length - 1; i >= 0; i--) {
                this.toastQueue[i].duration -= deltaTime;
                if (this.toastQueue[i].duration <= 0) {
                    this.toastQueue[i].el.remove();
                    this.toastQueue.splice(i, 1);
                }
            }
        }
        window.requestAnimationFrame(this.loop.bind(this));
    }

    public push(settings: Partial<ToastNotification>) {
        const toast: ToastNotification = Object.assign(
            {
                message: "Toast notificaitons require a message",
                el: null,
                duration: 30,
                classes: [],
            },
            settings
        );

        if (toast.duration === Infinity || typeof toast.duration !== "number") {
            console.warn("Toast duration must be a number");
            toast.duration = 30;
        }
        if (!Array.isArray(toast.classes)) {
            toast.classes = [toast.classes];
        }

        const el = document.createElement("output");
        el.role = "status";
        el.innerHTML = toast.message;
        // @ts-ignore
        el.classList.add(toast.classes);
        toast.el = el;
        this.toastQueue.push(toast);
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
}
const toaster = new Toaster();
export default toaster;
