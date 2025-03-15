# Notify.js

Notify.js is a lightweight utility library for creating toast, snackbars, and notifications.

#### CSS Not Included

This library does not provide any CSS or base styling for the components / HTML Elements it produces. Example styles can be found at [Brixi UI](https://ui.brixi.dev/).

- [Notifications](https://ui.brixi.dev/notifications)
- [Toast](https://ui.brixi.dev/toast)
- [Snackbar](https://ui.brixi.dev/snackbar)
- Sonner (coming soon)

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
import sonner from "https://cdn.jsdelivr.net/npm/@codewithkyle/notifyjs@5/dist/sonner.js";
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
1. [Sonner Notification](#sonner)
    1. [Sonner Interface](#sonner-interface)
    1. [Sonner HTML Structure](#sonner-html-structure)

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

```typescript
import sonner from "@codewithkyle/notifyjs/sonner";
sonner.push({
    heading: "Sonner toast example",
    message: "Heading and message are optional."
});
```

### Custom Events

As of version 5 you can trigger notifications using [custom events](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) dispatched on the `window`.

```typescript
const event = new CustomEvent("notify:sonner", {
    detail: {
        heading: "Sonner Example",
        message: `Example sonner toast message.`,
    }
});
window.dispatchEvent(event);
```

The follow events are supported:

- `notify:sonner`
- `notify:alert`
- `notify:toast`
- `notify:snackbar`

The `detail` object accepts the same interfaces as the function versions (see below).

### Custom Event Callbacks

As of version 5 all callback interfaces support  `event` and `eventData` properties. When the user interacts with a button a custom event will be fired on the `window`.

```typescript
import sonner from "@codewithkyle/notifyjs/sonner";
sonner.push({
    message: "Heading and message are optional.",
    button: {
        label: "Test",
        event: "test-event",
        eventData: "Hi mom!",
    }
});

// received when the user clicks the button within the sonner notification
window.addEventListener("test-event", (e)=>{
    alert(e.detail);
});
```

---

## Snackbar Notification

Snackbar notifications are great for quick one-off notifications that require an action.

### Snackbar Interface 

```typescript
type SnackbarNotification = {
    message: string;
    duration?: number; // in seconds
    closeable?: boolean;
    buttons?: Array<{
        label: string;
        callback?: Function;
        ariaLabel?: string;
        classes?: Array<string> | string;
        autofocus?: boolean;
        event?: string;
        eventData?: any;
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
        callback?: Function;
        ariaLabel?: string;
        classes?: Array<string> | string;
        autofocus?: boolean;
        event?: string;
        eventData?: any;
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

## Sonner

Sonner notifications are great for simple temporary alerts. The Sonner notification is slightly opinionated due to the custom interaction and animations.

```css
sonner-toast-component {
    opacity: var(--opacity);
    transform: translateY(var(--y)) translateY(var(--offset)) scale(var(--scale));
    transition: transform 300ms var(--ease-in-out), opacity 300ms var(--ease-in-out);
    left: 0;
    bottom: 0;
}
```

> **Note**: the sonner components UX is based on the look and feel of the [Sonner react package](https://sonner.emilkowal.ski/).

### Sonner Interface 

```typescript
type SonnerNotification = {
    heading?: string,
    message?: string,
    duration?: number,
    classes?: Array<string>|string,
    button?: {
        callback?: Function,
        label: string,
        classes?: Array<string>|string,
        event?: string;
        eventData?: any;
    }
};
```

### Sonner HTML Structure

```html
<sonner-component>
    <sonner-toast-component>
        <copy-wrapper>
            <h3>Example heading</h3>
            <p>This is an example sonner message.</p>
        </copy-wrapper>
        <button>Click me</button>
    </sonner-toast-component>
</sonner-component>
```
