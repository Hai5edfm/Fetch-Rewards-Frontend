import { LoginProps } from "@/interfaces/auth";
import { BACKEND_API } from "@/config/api";

export const signIn = async (data: LoginProps) => {
  const response = await fetch(`${BACKEND_API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      credentials: "include",
    },
    body: JSON.stringify(data),
  });

  return response;
};
