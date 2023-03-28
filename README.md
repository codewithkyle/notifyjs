# Notify.js

Notify.js is a lightweight utility library for creating toast, snackbars, and notifications.

#### CSS Not Included

This library does not provide any CSS or base styling for the components / HTML Elements it produces. Example styles can be found at [Brixi UI](https://ui.brixi.dev/).

- [Notifications](https://ui.brixi.dev/notifications)
- [Toast](https://ui.brixi.dev/toast)
- [Snackbar](https://ui.brixi.dev/snackbar)

## Installation

Download Notify.js via NPM:

```sh
npm i --save @codewithkyle/notifyjs
```

Or use the CDN version:

```javascript
import toaster from "https://cdn.jsdelivr.net/npm/@codewithkyle/notifyjs@4/dist/toaster.js";
import snackbar from "https://cdn.jsdelivr.net/npm/@codewithkyle/notifyjs@4/dist/snackbar.js";
import notifications from "https://cdn.jsdelivr.net/npm/@codewithkyle/notifyjs@4/dist/notifications.js";
```

## Usage

1. [Snackbar Notification](#snackbar-notification)
    1. [Snackbar Interface](#snackbar-interface)
    1. [Snackbar HTML Structure](#snackbar-html-structure)
1. [Notifications](#notifications)
    1. [Notifications Interface](#notification-interface)
    1. [Notifications HTML Structure](#notification-html-structure)
1. [Toast Notification](#toast)
    1. [Toast Interface](#toast-interface)
    1. [Toast HTML Structure](#toast-html-structure)

### Global Manager

Import the notification type:

```typescript
import snackbar from "@codewithkyle/notifyjs/snackbar";
snackbar({
    message: "All snackbar notifications require a message",
});

// Adds an action button
snackbar({
    message: "All snackbar notifications require a message",
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

```typescript
import notifications from "@codewithkyle/notifyjs/notifications";
notifications.push({
    title: "Notificaitons require a title",
    message: "They also require a message.",
});

// Append custom toast notifications:
class CustomNotificationElement extends HTMLElement {
    constructor(message){
        super();
        this.innerText = message;
        setTimeout(() => {
            this.remove();
        }, 5000);
    }
}
notifications.append(new CustomNotificationElement());
```

```typescript
import toaster from "@codewithkyle/notifyjs/toaster";
toaster.push({
    message: "Toast notifications require a message."
});
```

---

## Snackbar Notification

Snackbar notifications are great for quick one-off notifications that require an action.

### Snackbar Interface 

```typescript
interface SnackbarNotification {
    message: string;
    duration?: number; // in seconds
    closeable?: boolean;
    buttons?: Array<{
        label: string;
        callback: Function;
        ariaLabel?: string;
        classes?: Array<string> | string;
        autofocus?: boolean;
    }>;
    force?: boolean; // defaults to true
    classes?: Array<string> | string;
    autofocus?: boolean; // defaults to true
}
```

### Snackbar HTML Structure

```html
<snackbar-component>
    <p>Custom notification message</p>
    <snackbar-actions>
        <button>Action</button>
        <button class="close">
            <svg />
        </button>
    </snackbar-actions>
</snackbar-component>
```

---

## Notifications

Notifications are great for application-like notification systems where users will need to recieve warnings, updates, successes, and errors.

### Notification Interface 

```typescript
type Notification = {
    title: string;
    message: string;
    closeable?: boolean;
    icon?: string; // svg or img
    duration?: number; // in seconds
    classes?: string[];
    autofocus?: boolean; // defaults to true
    buttons?: Array<{
        label: string;
        callback: Function;
        ariaLabel?: string;
        classes?: Array<string> | string;
        autofocus?: boolean;
    }>;
    timer?: "vertical" | "horizontal" | null; // defaults to null
};
```

### Notification HTML Structure

```html
<notifications-component>
    <notification-component>
        <i>
            <svg />
        </i>
        <copy-wrapper>
            <h3>Title</h3>
            <p>Custom notification message</p>
            <notification-actions>
                <button>Action</button>
            </notification-actions>
        </copy-wrapper>
        <button class="close">
            <svg />
        </button>
        <notification-timer class="vertical || horizontal"></notification-timer>
    </notification-component>
</notifications-component>
```

---

## Toast

Toast notifications are great for simple temporary alerts like "Copied to clipboard" or "Added to playlist".

### Toast Interface 

```typescript
type ToastNotification = {
    message: string;
    duration?: number; // in seconds
    classes?: string | string[];
};
```

### Toast HTML Structure

```html
<toaster-component>
    <output role="status">Custom toast message.</output>
</toaster-component>
```
