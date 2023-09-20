import { BACKEND_API } from "@/config/api";

export const getDogById = async (id: string) => {
  const response = await fetch(`${BACKEND_API}/dogs`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([id]),
  });

  const data = await response.json();
  return data;
};
