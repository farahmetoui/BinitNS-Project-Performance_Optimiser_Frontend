import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
  logout: () => {},
  isAuthenticated: false,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedToken = Cookies.get("authorization");
    console.log("Token récupéré au chargement :", storedToken); 
    if (storedToken) {
      setToken(storedToken);
    } else {
      setLoading(false);
    }
  }, []);
  
  useEffect(() => {
    if (token !== null) {
      setLoading(false);
    }
  }, [token]);
  

  const logout = () => {
    setToken(null);
    Cookies.remove("authorization");
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{ token, setToken, logout, isAuthenticated, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
