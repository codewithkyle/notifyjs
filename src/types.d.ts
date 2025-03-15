export type NotificationButton = {
    label: string;
    callback: Function;
    ariaLabel?: string;
    classes?: string[];
    autofocus?: boolean;
};

export type SnackbarNotification = {
    message: string;
    duration?: number;
    closeable?: boolean;
    buttons?: Array<NotificationButton>;
    force?: boolean;
    classes?: string[];
    el: HTMLElement;
    autofocus?: boolean;
};

export type Notification = {
    title: string;
    message: string;
    closeable?: boolean;
    icon?: string;
    duration?: number;
    classes?: string[];
    el: HTMLElement;
    timerEl?: HTMLElement;
    autofocus?: boolean;
    buttons?: Array<NotificationButton>;
    timer?: "vertical" | "horizontal";
    timerDuration?: number;
};

export type ToastNotification = {
    message: string,
    el: HTMLElement,
    duration: number,
    classes: string | string[],
}

export type SonnerNotification = {
    heading: string,
    message: string,
    el: SonnerToast,
    duration: number,
    classes: Array<string>|string,
    button: {
        callback: Function,
        label: string,
        classes: Array<string>|string,
    }
}

export interface SonnerToast extends HTMLElement {
    expand: (offset:number)=>void,
    collapse: Function,
    delete: ()=>void,
    update: (dt:number)=>void,
    updateIndex: (idx:number)=>void,
}
