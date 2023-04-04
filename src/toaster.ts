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
        for (let i = this.toastQueue.length - 1; i >= 0; i--) {
            this.toastQueue[i].duration -= deltaTime;
            if (this.toastQueue[i].duration <= 0) {
                if (this.toastQueue[i].el.isConnected) {
                    this.toastQueue[i].el.remove();
                }
                this.toastQueue.splice(i, 1);
            }
        }
        window.requestAnimationFrame(this.loop.bind(this));
    }

    public push(settings: Partial<ToastNotification>) {
        const toast: ToastNotification = Object.assign(
            {
                message: "Toast notificaitons require a message",
                el: null,
                duration: 5,
                classes: [],
            },
            settings
        );

        if (toast.duration === Infinity || typeof toast.duration !== "number") {
            console.warn("Toast duration must be a number");
            toast.duration = 5;
        }
        if (!Array.isArray(toast.classes)) {
            toast.classes = [toast.classes];
        }

        const el = document.createElement("output");
        el.role = "status";
        el.innerHTML = toast.message;
        if (toast.classes.length) {
            el.classList.add(...toast.classes);
        }
        toast.el = el;
        toast.el.addEventListener("click", () => {
            toast.el.remove();
            this.toastQueue.splice(this.toastQueue.indexOf(toast), 1);
        });
        this.toastQueue.push(toast);
        this.flip(el);
    }

    private flip(el: HTMLElement) {
        const shell = this.getShell();
        const first = shell.offsetHeight
        shell.appendChild(el);
        const last = shell.offsetHeight
        const invert = last - first
        const animation = shell.animate([
            { transform: `translateY(${invert}px)` },
            { transform: 'translateY(0)' }
        ], {
            duration: 150,
            easing: 'ease-out',
        });
        animation.startTime = document.timeline.currentTime;
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
