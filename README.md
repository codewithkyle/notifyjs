# Notify.js
Notify.js is a utility library helping to manage simple [snackbar notifications](https://material.io/develop/web/components/snackbars/). Checkout the demo to see the library in action.

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
