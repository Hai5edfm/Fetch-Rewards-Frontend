import { LoginProps } from "@/interfaces/auth";
import { BACKEND_API } from "@/config/api";

export const signIn = async (data: LoginProps) => {
  const response = await fetch(`${BACKEND_API}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response;
};
