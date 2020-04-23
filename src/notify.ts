import { Notifier } from "./notifier";
import { SnackbarComponent } from "./snackbar-component";

const globalNotifier = new Notifier();
const snackbar = globalNotifier.snackbar.bind(globalNotifier);

// @ts-ignore
customElements.define("snackbar-component", SnackbarComponent);

export { snackbar, Notifier };
