import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../AuthContext";

export function LoginRequired({ children }: React.PropsWithChildren<{}>) {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}
