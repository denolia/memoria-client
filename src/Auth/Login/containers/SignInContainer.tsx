import React from "react";
import { LoginMode } from "../types";
import { LoginForm } from "../LoginForm";

export function SignInContainer() {
  return <LoginForm mode={LoginMode.SIGN_IN} />;
}
