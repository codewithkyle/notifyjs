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

    private static CLOSE:string = '<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="times" class="svg-inline--fa fa-times fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"></path></svg>';

    private _notification:HTMLElement;
    private _callback:Function;

    public timeout:WindowTimers;

    constructor(options:NotifyOptions){
        if(!options){
            console.error('No options object provided');
            return;
        }
        this._callback = options.callback;
        this.clearExistingNotifications();
        this.createNotification(options);
    }

    private handleAction:EventListener = (e:Event)=>{
        e.preventDefault();
        const target = <HTMLElement>e.currentTarget;
        this.removeEvents();
        
        if(this._callback)
        {
            this._callback(target.dataset.value);
        }

        if('remove' in HTMLElement.prototype){
            this._notification.remove();
        }else{
            this._notification.style.display = 'none !important';
        }
    }

    private handleTimeout():void{
        this.removeEvents();

        if('remove' in HTMLElement.prototype){
            this._notification.remove();
        }else{
            this._notification.style.display = 'none !important';
        }
    }

    private removeEvents():void{
        const actionEls = Array.from(document.body.querySelectorAll('user-actions button'));
        for(let i = 0; i < actionEls.length; i++)
        {
            actionEls[i].removeEventListener('click', this.handleAction);
        }

        const closeEl = document.body.querySelector('user-actions close-button');
        if(closeEl)
        {
            closeEl.addEventListener('click', this.handleTimeout);
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

        const actions = document.createElement('user-actions');
        if(options.actions)
        {
            for(let i = 0; i < options.actions.length; i++)
            {
                const action = document.createElement('button');
                action.innerText = options.actions[i].label;
                action.dataset.value = options.actions[i].value;
                actions.append(action);
            }
        }

        if(options.closeable)
        {
            const action = document.createElement('close-button');
            action.setAttribute('aria-label', 'close button');
            action.innerHTML = Notify.CLOSE;
            actions.append(action);
        }

        if(options.actions || options.closeable)
        {
            notification.append(actions);
        }

        if(options.duration){
            if(options.duration !== Infinity)
            {
                let duration = options.duration;

                if(duration < 4000)
                {
                    duration = 4000;
                }
                else if(duration > 10000)
                {
                    duration = 10000;
                }

                this.timeout = setTimeout(()=>{ this.handleTimeout(); }, duration);
            }
            else
            {
                notification.classList.add('is-infinite');
            }
        }
        else
        {
            this.timeout = setTimeout(()=>{ this.handleTimeout(); }, 4000);
        }

        document.body.append(notification);
        this._notification = notification;

        const actionEls = Array.from(document.body.querySelectorAll('user-actions button'));
        if(actionEls.length){
            for(let i = 0; i < actionEls.length; i++)
            {
                actionEls[i].addEventListener('click', this.handleAction);
            }
            // notification.style.paddingRight = `${ button.scrollWidth + 12 }px`;
        }
        const closeEl = document.body.querySelector('user-actions close-button');
        if(closeEl)
        {
            closeEl.addEventListener('click', ()=>{ this.handleTimeout(); });
        }
    }
}