interface NotifyOptions{
    message: string;
    action?: { label:string, callback:Function },
    duration?: number
}