import { BACKEND_API } from "@/config/api";

export const getBreeds = async () => {
  const response = await fetch(`${BACKEND_API}/dogs/breeds`, {
    method: "GET",
    credentials: "include",
  });
  const data = await response.json();
  return data;
};
