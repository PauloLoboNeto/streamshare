export type Option<T> = {
    isSome: boolean;
    isNone: boolean;
    getOrElse(defaultValue: T | (() => T)): T;
};