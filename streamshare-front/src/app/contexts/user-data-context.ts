import { None } from './../../types/none';
import { createContext } from "react";
import { Option } from "../../types/optional";

export type User = {
    userId: string;
    userName: string;
}

export type UseDataContextType = {
    user: Option<User>;
    message: Option<string>;
    setMessage(msg: Option<string>): void;
    setUser(user: Option<User>): void;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const UserDataContext = createContext<UseDataContextType | any>(None());

