import type { SonnerNotification } from "./types";

class Sonner extends HTMLElement {
    private previous: number|undefined;
    private queue: Array<SonnerNotification>;
    private doUpdate: boolean;
    private skipNextUpdate: boolean;
    private timeoutID: number|undefined;

    constructor() {
        super();
        this.previous = undefined;
        this.queue = Array(3).fill(null);
        this.doUpdate = true;
        this.skipNextUpdate = false;
        this.timeoutID = undefined;
    }

    connectedCallback() {
        document.addEventListener("visibilitychange", () => {
            this.doUpdate = !document.hidden;
            if (!this.doUpdate) this.skipNextUpdate = true;
        });
        this.addEventListener("mouseenter", () => {
            this.doUpdate = false;
            this.skipNextUpdate = true;
            this.classList.add("expand");
            this.expand();
            if (this.timeoutID !== undefined) {
                clearTimeout(this.timeoutID);
            }
        });
        this.addEventListener("mouseleave", () => {
            this.timeoutID = setTimeout(()=>{
                this.collapse();
                this.doUpdate = true;
                this.classList.remove("expand");
                this.timeoutID = undefined;
            }, 80);
        });
        window.addEventListener("notify:sonner", (e:CustomEvent) => {
            if (e?.detail) this.push(e.detail);
        });
        window.requestAnimationFrame(this.first.bind(this));
    }

    private collapse() {
        for (let i = 0; i < 3; i++) {
            if (this.queue[i] === null) continue;
            this.queue[i].el.collapse();
        }
        this.style.height = "0px";
    }

    private expand() {
        let bottomOffset = 0;
        for (let i = 0; i < 3; i++) {
            if (this.queue[i] === null) continue;
            this.queue[i].el.expand(bottomOffset);
            // @ts-ignore
            bottomOffset += this.queue[i].el.height + 8;
        }
        this.style.height = `${bottomOffset}px`;
    }

    private loop(ts:number) {
        const dt = (ts - this.previous) * 0.001;
        this.previous = ts;

        if (this.doUpdate) {
            if (!this.skipNextUpdate) {
                for (let i = 0; i < 3; i++) {
                    if (this.queue[i] !== null) {
                        if (this.queue[i].el.isConnected) {
                            this.queue[i]?.el?.update(dt);
                        } else {
                            this.queue[i] = null;
                        }
                    }
                }
                this.reconcile();
            } else {
                this.skipNextUpdate = false;
            }
        }

        window.requestAnimationFrame(this.loop.bind(this));
    }

    private reconcile() {
        for (let i = 2; i >= 0; i--) {
            if (this.queue[i] === null) continue;
            else if (i === 0) break;

            if (this.queue[i-1] === null) {
                this.queue[i-1] = this.queue[i];
                this.queue[i] = null;
            }
        }
        for (let i = 0; i < 3; i++) {
            if (this.queue[i] !== null) {
                this.queue[i].el.updateIndex(i);
            }
        }
    }

    private first(ts:number) {
        this.previous = ts;
        window.requestAnimationFrame(this.loop.bind(this));
    }

    public push(settings:Partial<SonnerNotification>) {
        const toast:SonnerNotification = Object.assign({
            heading: "",
            message: "",
            el: null,
            duration: 5,
            classes: [],
            button: {
                callback: ()=>{},
                label: "",
                classes: "",
                event: null,
                eventData: null,
            },
        }, settings);

        if (toast.duration === Infinity || typeof toast.duration !== "number") {
            console.warn("Sonner duration must be a number. Defaulting to 5 seconds.");
            toast.duration = 5;
        }
        if (!Array.isArray(toast.classes)) {
            toast.classes = [toast.classes];
        }
        if (typeof toast.button?.callback !== "function") {
            toast.button.callback = ()=>{};
        }
        if (!toast.button?.classes) {
            toast.button.classes = [];
        }
        if (!Array.isArray(toast.button.classes)) {
            toast.button.classes = [toast.button.classes];
        }
        toast.el = new SonnerToast(toast);
        this.insert(toast);
    }

    private insert(toast:SonnerNotification) {
        if (this.queue[2] !== null) {
            this.queue[2]?.el?.delete();
        }
        if (this.queue[1] !== null) {
            this.queue[2] = this.queue[1];
        }
        if (this.queue[0] !== null) {
            this.queue[1] = this.queue[0];
        }
        this.queue[0] = toast;
        this.appendChild(this.queue[0].el);
    }
}
if (!customElements.get("sonner-component")) {
    customElements.define("sonner-component", Sonner);
}
const sonner = new Sonner();
document.body.appendChild(sonner);
export default sonner;

class SonnerToast extends HTMLElement {
    private settings: SonnerNotification;
    private life: number;
    private height: number;
    private y: number;
    private offset: number;
    private index: number;
    private dead: boolean;
    private scale: number;
    private isExpanded: boolean;
    private expandedOffset: number;

    constructor(toast:SonnerNotification){
        super();
        this.settings = toast;
        this.life = toast.duration;
        this.height = 66;
        this.y = 0;
        this.offset = 0;
        this.index = 0;
        this.dead = false;
        this.scale = 1;
        this.isExpanded = false;
        this.expandedOffset = 0;

        this.style.setProperty("--y", "0");
        this.style.setProperty("--opacity", "1");
        this.style.setProperty("--offset", "0px");
        this.style.setProperty("--scale", "1");
    }

    connectedCallback() {
        this.innerHTML = `
            <copy-wrapper>
                ${this.renderHeading()}
                ${this.renderMessage()}
            </copy-wrapper>
            ${this.renderButton()}
        `;
        const buttonEl = this.querySelector("button");
        if (buttonEl) {
            buttonEl.addEventListener("click", ()=>{
                this.settings.button.callback();
                if (this.settings.button?.event !== null) {
                    window.dispatchEvent(new CustomEvent(this.settings.button.event, {
                        detail: this.settings.button?.eventData ?? null,
                    }));
                }
                this.delete();
            });
        }
        const bounds = this.getBoundingClientRect();
        this.height = bounds.height;
        const anim = this.animate([
            { opacity: 0, transform: `translateY(100%)` },
            { opacity: 1, transform: `translateY(0px)` }
        ], {
            duration: 300,
            fill: 'forwards',
            easing: "cubic-bezier(0.0, 0.0, 0.2, 1)",
        });
        anim.finished.then(() => {
            this.style.setProperty("--y", `${this.y}px`);
            this.style.setProperty("--opacity", "1");
            anim.cancel();
        });
    }

    private renderHeading() {
        if (this.settings.heading?.length) {
            return `<h3>${this.settings.heading}</h3>`
        }
        return ""
    }

    private renderMessage() {
        if (this.settings.message?.length) {
            return `<p>${this.settings.message}</p>`
        }
        return ""
    }

    private renderButton() {
        if (this.settings.button?.label) {
            // @ts-ignore
            return `<button class="${this.settings.button.classes.join(' ')}">${this.settings.button.label}</button>`;
        }
        return "";
    }

    public expand(bottomOffset:number) {
        this.isExpanded = true;
        this.expandedOffset = bottomOffset;
        this.style.setProperty("--offset", `${0}px`);
        this.style.setProperty("--scale", "1");
        this.style.setProperty("--y", `-${bottomOffset}px`);
    }

    public collapse() {
        this.style.setProperty("--offset", `-${this.offset}px`);
        this.style.setProperty("--scale", `${this.scale}`);
        this.style.setProperty("--y", `${this.y}px`);
    }

    public updateIndex(index:number) {
        this.index = index;
        switch(index) {
            case 0:
                this.style.zIndex = "3";
                break;
            case 1:
                this.style.zIndex = "2";
                break;
            case 2:
                this.style.zIndex = "1";
                break;
        }
        this.offset = 16 * this.index;
        this.scale = 1 - (0.05 * index);
        this.style.setProperty("--offset", `-${this.offset}px`);
        this.style.setProperty("--scale", `${this.scale}`);
    }

    public update(dt:number) {
        this.life -= dt;
        if (this.life <= 0 && this.isConnected && !this.dead) {
            this.dead = true;
            this.delete();
        }
    }

    public delete() {
        this.dead = true;
        let anim;
        if (this.isExpanded) {
            this.style.transformOrigin = "center";
            anim = this.animate([
                { opacity: 1, },
                { opacity: 0, }
            ], {
                duration: 150,
                fill: 'forwards',
                easing: "cubic-bezier(0.4, 0.0, 1, 1)",
            });
        } else {
            this.style.setProperty("--offset", `-${this.offset}px`);
            anim = this.animate([
                { opacity: 1, transform: `scale(${this.scale}) translateY(${this.y}px) translateY(-${this.offset}px)` },
                { opacity: 0, transform: `scale(${this.scale - 0.05}) translateY(${this.y}px) translateY(-${this.offset}px)` }
            ], {
                duration: 200,
                fill: 'forwards',
                easing: "cubic-bezier(0.4, 0.0, 1, 1)",
            });
        }
        anim.finished.then(() => {
            this.remove();
        });
    }
}
if (!customElements.get("sonner-toast-component")) {
    customElements.define("sonner-toast-component", SonnerToast);
}
