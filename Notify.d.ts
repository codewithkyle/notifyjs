interface NotificationButton {
    label: string;
    callback: Function;
    ariaLabel?: string;
}
interface SnackbarNotification {
    message: string;
    duration?: number;
    closeable?: boolean;
    buttons?: Array<NotificationButton>;
    position?: string;
    element?: HTMLElement;
    force?: boolean;
}
export declare class NotificationManager {
    private _queue;
    private _callback;
    private _isRunning;
    private _time;
    constructor();
    private handleCloseClickEvent;
    private handleActionButtonClick;
    private activateButton;
    private createNotification;
    private removeNotification;
    private startCallback;
    private stopCallback;
    private animationFrameCallback;
    private validateNotification;
    notify(notification: SnackbarNotification): void;
}
export {};
