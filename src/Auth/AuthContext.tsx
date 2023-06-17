import { Backdrop, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { requestLogin } from "./state/requestLogin";
import { requestSignup } from "./state/requestSignup";
import type { SpaceShort, LoginResponse } from "./types";
import { getUsernameInitials } from "./utils";

interface AuthContext {
  user: LoginResponse | null;
  userInitials: string;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, promo: string) => Promise<void>;
  logout: () => void;
  currentSpace: SpaceShort | null;
  addSpace: (space: SpaceShort) => void;
  switchSpace: (space: SpaceShort) => void;
}

const Context = React.createContext<AuthContext | undefined>(undefined);

const deserializeCurrentSpace = (): SpaceShort | null => {
  const space = localStorage.getItem("memoria-current-space");

  return space ? (JSON.parse(space) as SpaceShort) : null;
};

const serializeSpace = (currentSpace: SpaceShort) => {
  localStorage.setItem("memoria-current-space", JSON.stringify(currentSpace));
};

const deserializeUser = (): LoginResponse | null => {
  const serializedUser = localStorage.getItem("memoria-user");

  return serializedUser ? (JSON.parse(serializedUser) as LoginResponse) : null;
};

const serializeUser = (userToStore: LoginResponse) => {
  localStorage.setItem("memoria-user", JSON.stringify(userToStore));
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<LoginResponse | null>(null);
  const [currentSpace, setCurrentSpace] = useState<SpaceShort | null>(null);
  const navigate = useNavigate();
  const userInitials = getUsernameInitials(user?.username);

  useEffect(() => {
    const savedUser = deserializeUser();
    // todo check if expired
    if (savedUser) {
      setUser(savedUser);
    }

    const savedCurrentSpace = deserializeCurrentSpace();
    if (savedCurrentSpace) {
      setCurrentSpace(savedCurrentSpace);
    }

    setLoading(false);
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("memoria-user");
  };

  const login = async (email: string, password: string) => {
    const loggedInUser = await requestLogin(email, password);
    if (loggedInUser) {
      serializeUser(loggedInUser);
      setUser(loggedInUser);

      const space =
        loggedInUser?.userspaces?.find((sp) => sp.id === currentSpace?.id) ??
        loggedInUser?.userspaces?.[0] ??
        null;
      setCurrentSpace(space);
      if (space) {
        serializeSpace(space);
      }
    }

    navigate("/");
  };

  const signup = async (email: string, password: string, promo: string) => {
    const signupRes = await requestSignup(email, password, promo);
    if (signupRes === 200) {
      navigate("/login");
    }
  };

  const addSpace = (space: SpaceShort) => {
    setUser((u) => {
      if (!u) return null;

      return { ...u, userspaces: [...(u.userspaces ?? []), space] };
    });
    setCurrentSpace(space);
    serializeSpace(space);
  };

  const switchSpace = (space: SpaceShort) => {
    if (space) {
      setCurrentSpace(space);
      serializeSpace(space);
    }
  };

  const isLoggedIn = Boolean(user?.jwt);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value: AuthContext = {
    user,
    userInitials,
    login,
    signup,
    logout,
    isLoggedIn,
    currentSpace,
    addSpace,
    switchSpace,
  };

  return (
    <Context.Provider value={value}>
      {loading ? (
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        children
      )}
    </Context.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(Context);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}
