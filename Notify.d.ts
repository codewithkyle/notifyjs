declare type NotificationButton = {
    label: string;
    callback: Function;
    ariaLabel?: string;
};
declare type SnackbarNotification = {
    message: string;
    duration?: number;
    closeable?: boolean;
    buttons?: Array<NotificationButton>;
    position?: string;
    element?: HTMLElement;
    force?: boolean;
};
declare class NotificationManager {
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
declare const notify: (notification: SnackbarNotification) => void;
export { NotificationManager, notify };
