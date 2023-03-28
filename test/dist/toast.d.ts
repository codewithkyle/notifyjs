import type { ToastNotification } from "./types";
declare class Toaster {
    private toastQueue;
    private time;
    constructor();
    private loop;
    push(settings: Partial<ToastNotification>): void;
    private getShell;
}
declare const toaster: Toaster;
export default toaster;
