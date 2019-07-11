"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Notify = (function () {
    function Notify(options) {
        var _this = this;
        this.handleAction = function (e) {
            e.preventDefault();
            var target = e.currentTarget;
            _this.removeEvents();
            if (_this._callback) {
                _this._callback(target.dataset.value);
            }
            if ('remove' in HTMLElement.prototype) {
                _this._notification.remove();
            }
            else {
                _this._notification.style.display = 'none !important';
            }
        };
        if (!options) {
            console.error('No options object provided');
            return;
        }
        this._callback = options.callback;
        this.clearExistingNotifications();
        this.createNotification(options);
    }
    Notify.prototype.handleTimeout = function () {
        this.removeEvents();
        if ('remove' in HTMLElement.prototype) {
            this._notification.remove();
        }
        else {
            this._notification.style.display = 'none !important';
        }
    };
    Notify.prototype.removeEvents = function () {
        var actionEls = Array.from(document.body.querySelectorAll('user-actions button'));
        for (var i = 0; i < actionEls.length; i++) {
            actionEls[i].removeEventListener('click', this.handleAction);
        }
        var closeEl = document.body.querySelector('user-actions close-button');
        if (closeEl) {
            closeEl.addEventListener('click', this.handleTimeout);
        }
    };
    Notify.prototype.clearExistingNotifications = function () {
        var existingNotification = Array.from(document.body.querySelectorAll('user-notification'));
        for (var i = 0; i < existingNotification.length; i++) {
            if ('remove' in HTMLElement.prototype) {
                existingNotification[i].remove();
            }
            else {
                existingNotification[i].style.display = 'none !important';
            }
        }
    };
    Notify.prototype.createNotification = function (options) {
        var _this = this;
        var notification = document.createElement('user-notification');
        var message = document.createElement('p');
        message.innerText = options.message;
        notification.append(message);
        var actions = document.createElement('user-actions');
        if (options.actions) {
            for (var i = 0; i < options.actions.length; i++) {
                var action = document.createElement('button');
                action.innerText = options.actions[i].label;
                action.dataset.value = options.actions[i].value;
                actions.append(action);
            }
        }
        if (options.closeable) {
            var action = document.createElement('close-button');
            action.setAttribute('aria-label', 'close button');
            action.innerHTML = Notify.CLOSE;
            actions.append(action);
        }
        if (options.actions || options.closeable) {
            notification.append(actions);
        }
        if (options.duration) {
            if (options.duration !== Infinity) {
                var duration = options.duration;
                if (duration < 4000) {
                    duration = 4000;
                }
                else if (duration > 10000) {
                    duration = 10000;
                }
                this.timeout = setTimeout(function () { _this.handleTimeout(); }, duration);
            }
            else {
                notification.classList.add('is-infinite');
            }
        }
        else {
            this.timeout = setTimeout(function () { _this.handleTimeout(); }, 4000);
        }
        document.body.append(notification);
        this._notification = notification;
        var actionEls = Array.from(document.body.querySelectorAll('user-actions button'));
        if (actionEls.length) {
            for (var i = 0; i < actionEls.length; i++) {
                actionEls[i].addEventListener('click', this.handleAction);
            }
        }
        var closeEl = document.body.querySelector('user-actions close-button');
        if (closeEl) {
            closeEl.addEventListener('click', function () { _this.handleTimeout(); });
        }
    };
    Notify.CLOSE = '<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="times" class="svg-inline--fa fa-times fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"></path></svg>';
    return Notify;
}());
exports.Notify = Notify;
//# sourceMappingURL=Notify.js.map