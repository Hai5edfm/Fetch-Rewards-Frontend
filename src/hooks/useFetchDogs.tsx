import React, { useEffect } from "react";
import { getBreeds } from "@/services/dogs/getBreeds";
import { FilterSearchProps } from "@/interfaces/dogs";

interface Props {
  filters: FilterSearchProps;
}

const useFetchDogs = ({ filters }: Props) => {
  const [data, setData] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState(null);

  const [breeds, setBreeds] = React.useState<string[]>([]);

  useEffect(() => {
    const fetchBreeds = async () => {
      const breeds = await getBreeds();
      setBreeds(breeds);
    };

    fetchBreeds();
  }, []);

  return {
    data,
    loading,
    error,
    breeds,
  };
};

export default useFetchDogs;
