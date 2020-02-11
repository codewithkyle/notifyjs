import { NotificationManager } from "./notification-manager";

const globalManager = new NotificationManager();

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

export { NotificationManager, notify };
