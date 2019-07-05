/**
 * Trigger a popup snackbar notification to inform the user of a change.
 * To force the user to acknowledge the notification set the `duration` to `Infinity`.
 * Otherwise the minimum duration allowed is `4000` (4 seconds) and the maximum is `10000` (10 seconds).
 * @param message - the `string` to be displayed to the user.
 * @param action - an optional action `button`.
 * @param duration - the time (in milliseconds) the notification will be displayed before the Node is removed from the DOM. Defaults to `4000`.
 * @see https://material.io/develop/web/components/snackbars/
 * @example new Notify({ message: 'The content on this page is out of date.' });
 */
export class Notify{

    private _notification:HTMLElement;
    private _callback:Function;

    public timeout:WindowTimers;

    constructor(options:NotifyOptions){
        if(!options){
            console.error('No options object provided');
            return;
        }
        this.clearExistingNotifications();
        this.createNotification(options);
    }

    private handleAction:EventListener = (e:Event)=>{
        e.preventDefault();
        const button = document.body.querySelector('user-notification button');
        button.removeEventListener('click', this.handleAction);
        this._callback();

        if('remove' in HTMLElement.prototype){
            this._notification.remove();
        }else{
            this._notification.style.display = 'none !important';
        }
    }

    private handleTimeout():void{
        const button = document.body.querySelector('user-notification button');
        if(button){
            button.removeEventListener('click', this.handleAction);
        }

        if('remove' in HTMLElement.prototype){
            this._notification.remove();
        }else{
            this._notification.style.display = 'none !important';
        }
    }

    private clearExistingNotifications():void{
        const existingNotification:Array<HTMLElement> = Array.from(document.body.querySelectorAll('user-notification'));
        for(let i = 0; i < existingNotification.length; i++){
            if('remove' in HTMLElement.prototype){
                existingNotification[i].remove();
            }else{
                existingNotification[i].style.display = 'none !important';
            }
        }
    }

    private createNotification(options:NotifyOptions):void{
        const notification = document.createElement('user-notification');
        
        const message = document.createElement('p');
        message.innerText = options.message;
        notification.append(message);

        if(options.action){
            const action = document.createElement('button');
            action.innerText = options.action.label;
            this._callback = options.action.callback;
            notification.append(action);
        }

        if(options.duration){
            if(options.duration !== Infinity){
                let duration = options.duration;

                if(duration < 4000){
                    duration = 4000;
                }
                else if(duration > 10000){
                    duration = 10000;
                }

                this.timeout = setTimeout(()=>{ this.handleTimeout(); }, duration);
            }else{
                
            }
        }else{
            this.timeout = setTimeout(()=>{ this.handleTimeout(); }, 4000);
        }
        notification.classList.add('is-infinite');
        document.body.append(notification);
        this._notification = notification;
        const button = document.body.querySelector('user-notification button');
        if(button){
            button.addEventListener('click', this.handleAction);
        }
    }
}