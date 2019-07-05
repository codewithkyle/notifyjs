# Notify.js
Notify.js is a utility library helping to manage simple [snackbar notifications](https://material.io/develop/web/components/snackbars/). Checkout the [live demo](https://codewithkyle.github.io/notifyjs/) to see the library in action.

## Installation

Download Notify.js via NPM:

```
npm i --save @codewithkyle/notifyjs
```

Once the package is installed import the package:

```typescript
import { Notify } from '@codewithkyle/notifyjs';
```

Then it's as simple as creating a new instance of the class:

```typescript
new Notify({
    message: 'Required message string for the notification'
});
```

## Notification Options

### Duration

Notify.js allows custom notification duration. The minimum time allowed is 4000 (4 seconds) and the maximum is 10000 (10 seconds). When creating a notification that has an interaction the `Infinity` value can be provided to the timer if you want the notification to stick until the user interacts with it.

```typescript
new Notify({
    message: 'Required message string for the notification',
    duration: 6000
});
```

### User Interaction

Notify.js also allows for user interactions via a button element. The action requires a custom label for the button along with a callback function that will be called when the `click` event is fired on the button.

```typescript
new Notify({
    message: 'Required message string for the notification',
    duration: Infinity,
    action: {
        label: 'Do Something',
        callback: this.someCallbackFunction.bind(this)
    }
});
```

## CSS

This library doesn't provide/force any base styles or CSS. The notification element is composed of three elements:

```html
<user-notification>
    <p>Custom notification message</p>
    <button>Action</button>
</user-notification>
```

Below is the CSS for the snackbar notification used on the [demo page](https://codewithkyle.github.io/notifyjs/), it is based on the snackbar component from [Material Design](https://material.io/develop/web/components/snackbars/).

```css
user-notification{
    position: fixed;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%) scale(0.87);
    opacity: 0;
    transform-origin: center bottom;
    padding: 0 16px;
    border-radius: 4px;
    min-width: 340px;
    max-width: calc(100vw - 64px);
    box-shadow: 0 1px 3px rgba(0,0,0, 0.15), 0 2px 6px rgba(0,0,0, 0.15);
    animation: popNotification 4000ms cubic-bezier(0.0, 0.0, 0.2, 1);
    background-color: rgb(51, 51, 51);
    color: rgba(255,255,255, 0.87);
    font-size: 14px;
    line-height: 48px;
    height: 48px;
    z-index: 9999;
}

user-notification.is-infinite{
    animation: popInNotification 150ms cubic-bezier(0.0, 0.0, 0.2, 1) forwards;
}

user-notification button{
    display: inline-block;
    height: 36px;
    line-height: 34px;
    margin: 0;
    padding: 0 16px;
    border: none;
    outline: none;
    box-shadow: none;
    border-radius: 2px;
    position: absolute;
    font-size: 14px;
    text-transform: uppercase;
    user-select: none;
    top: 6px;
    right: 6px;
    transition: all 150ms cubic-bezier(0.4, 0.0, 0.2, 1);
}

button:hover{
    background-color: hsl(248, 53%, 61%);
}

button:active{
    background-color: hsl(248, 53%, 55%);
    box-shadow: 0 1px 3px rgba(0,0,0,0.15);
}

p{
    margin: 0;
    padding: 0;
}

@keyframes popInNotification{
    from{
        transform: translateX(-50%) scale(0.87);
        opacity: 0;
    }
    to{
        transform: translateX(-50%) scale(1);
        opacity: 1;
    }
}

@keyframes popNotification{
    0%{
        transform: translateX(-50%) scale(0.87);
        opacity: 0;
    }
    3.75%, 96.25%{
        transform: translateX(-50%) scale(1);
        opacity: 1;
    }
    100%{
        transform: translateX(-50%) scale(1);
        animation-timing-function: cubic-bezier(0.4, 0.0, 1, 1);
        opacity: 0;
    }
}
```
