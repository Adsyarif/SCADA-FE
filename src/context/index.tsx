import { createContext, useState, ReactNode } from "react";

export interface UserNameInterface {
  userName: string;
  userId: string;
}

export interface AppContextInterface {
  selectedUser: UserNameInterface | null;
  setSelectedUser: (currentUser: UserNameInterface | null) => void;
}

export const AppContext = createContext<AppContextInterface>({
  selectedUser: null,
  setSelectedUser: () => {},
});

interface UserNameProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: UserNameProviderProps) => {
  const [selectedUser, setSelectedUserState] =
    useState<UserNameInterface | null>(() => {
      if (typeof window !== "undefined") {
        const storedUser = localStorage.getItem("selectedUser");
        return storedUser ? JSON.parse(storedUser) : null;
      }
      return null;
    });

  const setSelectedUser = (user: UserNameInterface | null) => {
    setSelectedUserState(user);
    if (user) {
      localStorage.setItem("selectedUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("selectedUser");
    }
  };

  const value = { selectedUser, setSelectedUser };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
