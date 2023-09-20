import { BACKEND_API } from "@/config/api";

interface Props {
  data: string[];
}

export const makeMatch = async ({ data }: Props) => {
  const url = `${BACKEND_API}/dogs/match`;

  const response = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();
  return responseData;
};
