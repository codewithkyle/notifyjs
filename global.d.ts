export { Notify as default };

export as namespace Notify;

declare class Notify {
    constructor(options:Notify.NotifyOptions);
}

declare namespace Notify{
    export interface NotifyOptions{
        message: string;
        action?: { label:string, callback:Function },
        duration?: number
    }
}