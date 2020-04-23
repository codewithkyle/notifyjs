# Notify.js

Notify.js is a hyper-lightweight utility library helping to manage simple [snackbar](https://material.io/develop/web/components/snackbars/) and [toaster](https://www.carbondesignsystem.com/components/notification/code/) notifications.

## Installation

Download Notify.js via NPM:

```sh
npm i --save @codewithkyle/notifyjs
```

## Usage

There are two ways to use this package. You can create a Notification Manager or use the global manager. Each manager has a queue and new notifications are placed in the queue in the order that they're requested. The queue can be skipped by settings the `force` value to true.

### Notification Manager

Import the manager:

```typescript
import { Notifier } from "@codewithkyle/notifyjs";
const notifier = new Notifier();
```

Create a snackbar or toast notification:

```typescript
notifier.snackbar({
    message: "All snackbar notifications require a message",
});
notifier.toast({
    title: "Toast notificaitons require a title",
    message: "And they require a message",
});
```

### Global Manager

Import the notification type:

```typescript
import { snackbar, toast } from "@codewithkyle/notifyjs";
```

Create a notification:

```typescript
notifier.snackbar({
    message: "All snackbar notifications require a message",
});
notifier.toast({
    title: "Toast notificaitons require a title",
    message: "And they require a message",
});
```

## Snackbar Notification

```typescript
interface NotificationOptions {
    message: string;
    duration?: number; // in seconds
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

### HTML Structure

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

## Toast Notification

```typescript
type ToasterNotification = {
    title: string;
    message: string;
    closeable?: boolean;
    icon?: string; // svg or img
    duration?: number; // in seconds
    classes?: string[];
};
```

### HTML Structure

```html
<toaster-component>
    <toast-component>
        <i>
            <svg />
        </i>
        <copy-wrapper>
            <h3>Title</h3>
            <p>Custom notification message</p>
        </copy-wrapper>
        <button>
            <svg />
        </button>
    </toast-component>
</toaster-component>
```
