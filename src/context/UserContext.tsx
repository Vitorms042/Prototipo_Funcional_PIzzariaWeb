import React, { createContext, useState, useContext, PropsWithChildren } from "react";

// Tipagem para as informações do usuário
interface User {
  id: string;
  name: string;
  email: string;
  avatar: string; // URL da imagem do avatar
}

interface UserContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData); // Armazenando o usuário no estado
  };

  const logout = () => {
    setUser(null); // Limpando as informações do usuário
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook para consumir o contexto
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};