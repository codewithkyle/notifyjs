import type { SonnerNotification } from "./types";
declare class Sonner extends HTMLElement {
    private previous;
    private queue;
    private doUpdate;
    private skipNextUpdate;
    private timeoutID;
    constructor();
    connectedCallback(): void;
    private collapse;
    private expand;
    private loop;
    private reconcile;
    private first;
    push(settings: Partial<SonnerNotification>): void;
    private insert;
}
declare const sonner: Sonner;
export default sonner;
