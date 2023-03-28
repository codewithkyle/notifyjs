import type { Notification } from "./types";
declare class Notifications {
    private notifications;
    private time;
    constructor();
    private loop;
    push(settings: Partial<Notification>): void;
    private getShell;
    append(el: HTMLElement): void;
}
declare const notifications: Notifications;
export default notifications;
