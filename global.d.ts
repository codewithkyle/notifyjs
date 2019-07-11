export { Notify };

export as namespace Notify;

declare class Notify {
    constructor(options:Notify.NotifyOptions);
}

declare namespace Notify{
    export interface NotifyOptions{
        message: string;
        actions?: Array<{ label:string, value:string }>;
        callback?: Function;
        duration?: number;
        closeable?: boolean;
    }
}