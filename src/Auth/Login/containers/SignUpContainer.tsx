import React from "react";
import { LoginMode } from "../types";
import { LoginForm } from "../LoginForm";

export const SignUpContainer = () => <LoginForm mode={LoginMode.SIGN_UP} />;
