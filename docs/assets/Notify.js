"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Notify = (function () {
    function Notify(options) {
        var _this = this;
        this.handleAction = function (e) {
            e.preventDefault();
            var button = document.body.querySelector('user-notification button');
            button.removeEventListener('click', _this.handleAction);
            _this._callback();
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
        this.clearExistingNotifications();
        this.createNotification(options);
    }
    Notify.prototype.handleTimeout = function () {
        var button = document.body.querySelector('user-notification button');
        if (button) {
            button.removeEventListener('click', this.handleAction);
        }
        if ('remove' in HTMLElement.prototype) {
            this._notification.remove();
        }
        else {
            this._notification.style.display = 'none !important';
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
        if (options.action) {
            var action = document.createElement('button');
            action.innerText = options.action.label;
            this._callback = options.action.callback;
            notification.append(action);
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
            }
        }
        else {
            this.timeout = setTimeout(function () { _this.handleTimeout(); }, 4000);
        }
        notification.classList.add('is-infinite');
        document.body.append(notification);
        this._notification = notification;
        var button = document.body.querySelector('user-notification button');
        if (button) {
            button.addEventListener('click', this.handleAction);
        }
    };
    return Notify;
}());
exports.Notify = Notify;
//# sourceMappingURL=Notify.js.map