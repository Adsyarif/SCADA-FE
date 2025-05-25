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
  const [selectedUser, setSelectedUser] = useState<UserNameInterface | null>(
    null
  );

  const value = {
    selectedUser,
    setSelectedUser,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
