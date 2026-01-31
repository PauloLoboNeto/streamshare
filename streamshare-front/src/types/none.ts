import { Option } from "./optional";

export const None = <T>(): Option<T> => ({
    isSome: false,
    isNone: true,
    getOrElse: (d) => (typeof d === "function" ? (d as () => T)() : d)
});