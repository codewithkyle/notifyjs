import { Notifier } from "./notifier";
import { SnackbarComponent } from "./snackbar-component";
import { ToastComponent } from "./toast-component";
import { SnackbarNotification, ToasterNotification } from "./types";

const globalNotifier = new Notifier();
const snackbar:(settings:Partial<SnackbarNotification>)=>void = globalNotifier.snackbar.bind(globalNotifier);
const toast:(settings:Partial<ToasterNotification>)=>void = globalNotifier.toast.bind(globalNotifier);
const append:(el:HTMLElement)=>void = globalNotifier.append.bind(globalNotifier);

// @ts-ignore
customElements.define("snackbar-component", SnackbarComponent);
// @ts-ignore
customElements.define("toast-component", ToastComponent);

export { Notifier, snackbar, toast, append };
