declare interface IFormValidate<T> {
    validate: () => Promise<T>;
}

declare interface IMessage {
    open: () => void;
}