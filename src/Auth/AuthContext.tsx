import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { requestLogin } from "./state/requestLogin";
import { requestSignup } from "./state/requestSignup";
import type { User } from "./types";

interface AuthContext {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const Context = React.createContext<AuthContext | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const deserializeUser = (): User | null => {
    const serializedUser = localStorage.getItem("memoria-user");

    return serializedUser ? (JSON.parse(serializedUser) as User) : null;
  };

  const serializeUser = (userToStore: User) => {
    // todo encode
    localStorage.setItem("memoria-user", JSON.stringify(userToStore));
  };

  useEffect(() => {
    const savedUser = deserializeUser();
    // todo decode
    // todo check if expired
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const logout = () => {
    setUser(null);
  };

  const login = async (email: string, password: string) => {
    const loggedInUser = await requestLogin(email, password);
    if (loggedInUser) serializeUser(loggedInUser);
    setUser(loggedInUser);
    navigate("/");
  };

  const signup = async (email: string, password: string) => {
    const signedUpUser = await requestSignup(email, password);
    setUser(signedUpUser);
    navigate("/");
  };

  const isLoggedIn = Boolean(user?.jwt);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value: AuthContext = { user, login, signup, logout, isLoggedIn };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useAuth() {
  const context = React.useContext(Context);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}
