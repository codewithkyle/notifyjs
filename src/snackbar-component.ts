import { SnackbarNotification } from "./notify";

export class SnackbarComponent extends HTMLElement {
    private settings: SnackbarNotification;
    constructor(snackbar: SnackbarNotification) {
        super();
        this.settings = snackbar;
        this.render();
    }
    private render() {}
}
