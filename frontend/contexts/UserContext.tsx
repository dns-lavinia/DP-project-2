import { createContext, useContext, useEffect, useState } from "react"
import { auth } from 'utils/firebase'
import {
    UserCredential,
    User,
    signOut,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth'

interface UserContext {
    user: User | null;
    logInGoogle: () => Promise<UserCredential>;
    logOut: () => Promise<void>;
}

const UserContext = createContext({} as UserContext)

export function useUser() {
    return useContext(UserContext)
}

interface UserProviderProps {
    children: React.ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
    const [user, setUser] = useState<User | null>({} as User)

    const logInGoogle = () => {
        return signInWithPopup(auth, new GoogleAuthProvider())
    }

    const logOut = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setUser(user)
        })

        return unsubscribe
    }, [])

    const value = {
        user,
        logInGoogle,
        logOut
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}