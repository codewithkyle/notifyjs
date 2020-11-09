export type NotificationButton = {
    label: string;
    callback: Function;
    ariaLabel?: string;
    classes?: string[];
    autofocus?: boolean;
};

export type SnackbarNotification = {
    message: string;
    uid: string;
    duration?: number;
    closeable?: boolean;
    buttons?: Array<NotificationButton>;
    force?: boolean;
    classes?: string[];
    el: HTMLElement;
    autofocus?: boolean;
};

export type ToasterNotification = {
    title: string;
    message: string;
    closeable?: boolean;
    icon?: string;
    duration?: number;
    classes?: string[];
    uid: string;
    el: HTMLElement;
    timerEl?: HTMLElement;
    autofocus?: boolean;
    buttons?: Array<NotificationButton>;
    timer?: "vertical" | "horizontal";
    timerDuration?: number;
};
