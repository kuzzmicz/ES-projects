import { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextType {
    username: string;
    userId: string;
    setUsername: (username: string) => void;
    setUserId: (userId: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [username, setUsername] = useState<string>('');
    const [userId, setUserId] = useState<string>('');

    return (
        <UserContext.Provider value={{ username, userId, setUsername, setUserId }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
