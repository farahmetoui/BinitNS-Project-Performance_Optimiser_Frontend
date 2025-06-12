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
  setToken: () => { },
  logout: () => { },
  isAuthenticated: false,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const setToken = (token: string | null) => {
   
    setTokenState(token);
    if (token) {
       console.log(token)
      Cookies.set("authorization", token, {
        expires: 7,
        path: "/",
        sameSite: "Lax",
      });
    } else {
      Cookies.remove("authorization");
    }
  };

  useEffect(() => {
    const storedToken = Cookies.get("authorization");
    console.log("Token récupéré au chargement :", storedToken);
    if (storedToken) {
      setTokenState(storedToken);
    }
    setLoading(false);
  }, []);


  const logout = () => {
    setToken(null);
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
