# Notify.js

Notify.js is a utility library helping to manage simple [snackbar notifications](https://material.io/develop/web/components/snackbars/). Checkout the [live demo](https://components.codewithkyle.com/snackbars/dark-snackbar) to see the library in action.

## Installation

Download Notify.js via NPM:

```sh
npm i --save @codewithkyle/notifyjs
```

Once the package is installed import the package:

```typescript
import { NotificationManager } from '@codewithkyle/notifyjs';
```

Then it's as simple as creating a new instance of the class and calling the `notify()` method:

```typescript
const notificationManager = new NotificationManager();
notificationManager.notify({
    message: 'All notifications require a message',
});
```

Notifications are queued and displayed in the order that they were requested. The queue can be skipped by settings the `force` flag to true.

```typescript
notificationManager.notify({
    message: 'This message will close the current notification and will jump the queue',
    force: true,
});
```

## Notification Options

### Duration

Notify.js allows custom notification duration. The minimum time allowed is 4 seconds. When creating a notification that has an interaction the `Infinity` value can be provided to the timer if you want the notification to stick until the user interacts with it.

```typescript
notificationManager.notify({
    message: 'The user will have to close this notification',
    duration: Infinity,
    closeable: true,
});
```

### User Interaction

Notify.js also allows for user interactions via a button element. The action requires a custom label for the button along with a callback function that will be called when the `click` event is fired on the button.

```typescript
notificationManager.notify({
    message: 'A new version of this application is available',
    duration: Infinity,
    closeable: true,
    buttons: [
        {
            label: 'Update',
            callback: () => { console.log('User clicked the update button') },
        }
    ],
});
```

## HTML Structure

The notification element is composed of the following HTML. This library doesn't provide/force any CSS, for a material design styled snackbar notification [click here](https://components.codewithkyle.com/snackbars/dark-snackbar).

```html
<snackbar-component>
    <p>Custom notification message</p>
    <snackbar-actions>
        <button>Action</button>
        <close-button>
            <svg />
        </close-button>
    </snackbar-actions>
</snackbar-component>
```
