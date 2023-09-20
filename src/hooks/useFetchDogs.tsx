import React, { useEffect } from "react";
import { getBreeds } from "@/services/dogs/getBreeds";
import { FilterSearchProps } from "@/interfaces/dogs";
import { getDogs } from "@/services/dogs/getDogs";

interface Props {
  filters: FilterSearchProps;
}

const useFetchDogs = ({ filters }: Props) => {
  console.log(
    "🚀 ~ file: useFetchDogs.tsx:11 ~ useFetchDogs ~ filters:",
    filters
  );
  const { limit, page, breeds: breedsFilter, sort, ageMax, ageMin } = filters;
  const [data, setData] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState(null);

  const [breeds, setBreeds] = React.useState<string[]>([]);

  useEffect(() => {
    fetchBreeds();
    fetchDogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, page, breedsFilter, sort, ageMax, ageMin]);

  const fetchBreeds = async () => {
    const breeds = await getBreeds();
    setBreeds(breeds);
  };

  const fetchDogs = async () => {
    const dogs = await getDogs({ filters });
    setData(dogs);
  };

  return {
    data,
    loading,
    error,
    breeds,
  };
};

export default useFetchDogs;
