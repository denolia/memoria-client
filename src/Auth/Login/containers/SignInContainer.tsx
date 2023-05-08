import React from "react";
import { LoginMode } from "../types";
import { LoginForm } from "../LoginForm";

export const SignInContainer = () => <LoginForm mode={LoginMode.SIGN_IN} />;
