type NotificationButton = {
    label: string;
    callback: Function;
    ariaLabel?: string;
    classes?: string[];
};

type SnackbarNotification = {
    message: string;
    uid: string;
    duration?: number;
    closeable?: boolean;
    buttons?: Array<NotificationButton>;
    force?: boolean;
    classes?: string[];
    el: HTMLElement;
};

type ToasterNotification = {
    title: string;
    message: string;
    closeable?: boolean;
    icon?: string;
    duration?: number;
    classes?: string[];
    uid: string;
    el: HTMLElement;
};

declare const snackbar: (settings: SnackbarNotification) => void;
declare const toast: (settings: ToasterNotification) => void;
