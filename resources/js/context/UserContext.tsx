import React, { createContext, ReactNode, useContext, useState } from "react";

// Define user interface
export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    avatarInitials: string;
}

// Define context type
export interface UserContextType {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
}

const getUserFromStorage = (): Partial<User> => {
    try {
        const storedUserJSON = localStorage.getItem("user");
        return storedUserJSON ? JSON.parse(storedUserJSON) : {};
    } catch (error) {
        console.error("Error accessing localStorage:", error);
        return {};
    }
};

export const defaultUser: User = (() => {
    const storedUser = getUserFromStorage();
    const { id = 0, name = "", email = "", role = "" } = storedUser;

    return {
        id,
        name,
        email,
        role,
        avatarInitials: name ? name.charAt(0).toUpperCase() : "",
    };
})();

// Create the context with a default value to avoid the undefined check
export const UserContext = createContext<UserContextType>({
    user: defaultUser,
    setUser: () => {},
});

// Provider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<User>(defaultUser);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = (): UserContextType => {
    return useContext(UserContext);
};

export default UserContext;
