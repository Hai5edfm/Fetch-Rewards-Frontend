import { BACKEND_API } from "@/config/api";
import { FilterSearchProps } from "@/interfaces/dogs";
import { ASCENDANT } from "@/utils/contants/filters";

interface Props {
  filters: FilterSearchProps;
}

export const getDogs = async ({ filters }: Props) => {
  const { page = 1, limit = 10, breeds, ageMin, ageMax, sort } = filters;

  let url = `${BACKEND_API}/dogs/search?breeds:${sort}`;
  const from = (page - 1) * limit;

  if (breeds) {
    const breedsParams = breeds
      ?.map((breed) => {
        return `&breeds=${breed}`;
      })
      .toString();

    url = `${url}${breedsParams}`;
  }

  if (ageMin) url = `${url}&ageMin=${ageMin}`;
  if (ageMax) url = `${url}&ageMax=${ageMax}`;

  url = `${url}&from=${from}&size=${limit}`;

  const dogsIdsResponse = await fetch(url, {
    method: "GET",
    credentials: "include",
  });
  const dogsIdsData = await dogsIdsResponse.json();

  console.log("🚀 ~ file: getDogs.ts:14 ~ getDogs ~ url:", url);

  const dogsResponse = await fetch(`${BACKEND_API}/dogs`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dogsIdsData.resultIds),
  });
  const dogs = await dogsResponse.json();
  return dogs;
};
