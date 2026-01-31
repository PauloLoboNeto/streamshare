"use client"

import { useCallback, useState } from 'react';
// O provider não renderiza UI própria. Ele apenas envolve seus filhos com o contexto necessário.
// Tudo dentro da subarvore terá acesso ao contexto de dados do usuário.

import {UserDataContext, User } from "../contexts/user-data-context";
import { Some } from '../../types/some';
import { Option } from '../../types/optional';
import { None } from '../../types/none';

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [userData, setUser] = useState<Option<User>>(None());
    const [message, setMessage] = useState<Option<string>>(None());

    const setUserImpl = useCallback((user: User) => setUser(Some(user)), []);
    const setMessageImpl = useCallback((msg: string) => setMessage(Some(msg)), []);

    const value = {
        user: userData,
        message: message,
        setMessage: setMessageImpl,
        setUser: setUserImpl
    }

    return <UserDataContext.Provider value={ value }>{ children }</UserDataContext.Provider>
}