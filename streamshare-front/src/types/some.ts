import { Option } from "./optional";

export const Some = <T>(value: T): Option<T> => ({
  isSome: true,
  isNone: false,
  getOrElse: () => value,
});