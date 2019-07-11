interface NotifyOptions{
    message: string;
    actions?: Array<{ label:string, value:string }>;
    callback?: Function;
    duration?: number;
    closeable?: boolean;
}