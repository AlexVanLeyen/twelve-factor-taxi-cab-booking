export default class OutsideGridException extends RangeError {
    constructor(message?: string) {
        super(message);
        this.name = this.constructor.name;
    }
}
