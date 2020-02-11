# Notify.js

Notify.js is a utility library helping to manage simple [snackbar notifications](https://material.io/develop/web/components/snackbars/). Checkout the [live demo](https://components.codewithkyle.com/snackbars/dark-snackbar) to see the library in action.

## Installation

Download Notify.js via NPM:

```sh
npm i --save @codewithkyle/notifyjs
```

## Usage

There are two ways to use this package. You can create a Notification Manager or use the global manager. Each manager has a queue and new notifications are placed in the queue in the order that they're requested. The queue can be skipped by settings the `force` value to true.

### Global Manager

Import the global `notify()` function:

```typescript
import { notify } from "@codewithkyle/notifyjs";
```

Submit a notification to the global manager:

```typescript
notify({
    message: "All notifications require a message",
});
```

### Custom Manager

Import the `NotificationManager` class:

```typescript
import { NotificationManager } from "@codewithkyle/notifyjs";
```

Create a new instance of the class:

```typescript
const customManager = new NotificationManager();
```

Call the `notify()` method:

```typescript
customManager.notify({
    message: "All notifications require a message",
});
```

## Notification Options

```typescript
interface NotificationOptions {
    message: string;
    duration?: number;
    closeable?: boolean;
    buttons?: Array<{
        label: string;
        callback: Function;
        ariaLabel?: string;
        classes?: Array<string> | string;
    }>;
    force?: boolean;
    classes?: Array<string> | string;
}
```

### Duration

The duration value can be set to `Infinity` if a users interaction is required. Otherwise enter the number of seconds the notification should be displayed for.

```typescript
notify({
    message: "This notification will last 3 seconds",
    duration: 3,
});
```

### User Interaction

Notify.js also allows for user interactions via a button element. The action requires a custom label for the button along with a callback function that will be called when the `click` event is fired on the button.

```typescript
notify({
    message: "A new version of this application is available",
    buttons: [
        {
            label: "Update",
            callback: () => {
                console.log("User clicked the update button");
            },
        },
    ],
});
```

### Closeable

Notifications can be closeable by setting the `closeable` value to true.

```typescript
notify({
    message: "The user will have to close this notification",
    closeable: true,
});
```

## HTML Structure

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

## Stylesheets

This library doesn't provide/force any CSS, for a material design styled snackbar notification [click here](https://github.com/codewithkyle/notifyjs/blob/master/test/snackbar.css).
