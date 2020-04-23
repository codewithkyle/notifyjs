import { Notifier } from "./notifier";
import { SnackbarComponent } from "./snackbar-component";
import { ToastComponent } from "./toast-component";

const globalNotifier = new Notifier();
const snackbar = globalNotifier.snackbar.bind(globalNotifier);
const toast = globalNotifier.toast.bind(globalNotifier);

// @ts-ignore
customElements.define("snackbar-component", SnackbarComponent);
// @ts-ignore
customElements.define("toast-component", ToastComponent);

export { Notifier, snackbar, toast };
