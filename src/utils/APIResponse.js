export class APIResponse {
    constructor(status = 200, message = "Default Message", isTriggerToast = false, data = []) {
        this.status = status;
        this.message = message;
        this.isTriggerToast = isTriggerToast;
        this.data = data;
    }
}
