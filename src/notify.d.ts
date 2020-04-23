export type NotificationButton = {
    label: string;
    callback: Function;
    ariaLabel?: string;
    classes?: string[];
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
};
