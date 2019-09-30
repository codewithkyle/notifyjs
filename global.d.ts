interface NotificationButton
{
    label: string,
    callback: Function,
    ariaLabel?: string,
}

interface SnackbarNotification
{
    message: string,
    duration?: number,
    closeable?: boolean,
    buttons?: Array<NotificationButton>,
    position?: string,
    element?: HTMLElement,
    force?: boolean,
}

interface VerificationResponse
{
    validNotification: SnackbarNotification,
    warnings: Array<string>,
}