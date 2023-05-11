import React from "react";
import { LoginMode } from "../types";
import { LoginForm } from "../LoginForm";

export function SignUpContainer() {
  return <LoginForm mode={LoginMode.SIGN_UP} />;
}
