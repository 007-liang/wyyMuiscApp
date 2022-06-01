declare interface IFormValidate<T> {
    validate: (identifier?: string[]) => Promise<T>;
    validateField: (identifier?: string[]) => Promise<T>;
}

declare interface IMessage {
    open: () => void;
}