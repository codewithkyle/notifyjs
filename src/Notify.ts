import { NotificationManager } from "./notification-manager";

const globalManager = new NotificationManager();

/**
 * @deprecated Use `snackbar()` instead
 */
const notify: (notification: {
    message: string;
    duration?: number;
    closeable?: boolean;
    buttons?: Array<{
        label: string;
        callback: Function;
        ariaLabel?: string;
        classes?: Array<string> | string;
    }>;
    force?: boolean;
    classes?: Array<string> | string;
}) => void = globalManager.notify.bind(globalManager);

const snackbar: (notification: {
    message: string;
    duration?: number;
    closeable?: boolean;
    buttons?: Array<{
        label: string;
        callback: Function;
        ariaLabel?: string;
        classes?: Array<string> | string;
    }>;
    force?: boolean;
    classes?: Array<string> | string;
}) => void = globalManager.snackbar.bind(globalManager);

const toast: (notification: {
    title: string;
    message: string;
    closeable?: boolean;
    icon?: string;
    duration?: number;
    classes?: string[];
    element?: HTMLElement;
}) => void = globalManager.toast.bind(globalManager);

export { NotificationManager, notify, toast, snackbar };
