import React, { createContext, ReactNode, useContext, useState } from "react";

interface UserData {
  name: string;
  email: string;
}

interface UserContextProps {
  user: UserData | null;
  login: (userData: UserData) => void;
  logout: () => void;
}

interface IProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<IProps> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);

  const login = (userData: UserData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
