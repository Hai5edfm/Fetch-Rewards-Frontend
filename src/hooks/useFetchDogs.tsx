import React, { useEffect } from "react";
import { getBreeds } from "@/services/dogs/getBreeds";
import { FilterSearchProps } from "@/interfaces/dogs";
import { getDogs } from "@/services/dogs/getDogs";

interface Props {
  filters: FilterSearchProps;
}

const useFetchDogs = ({ filters }: Props) => {
  const { limit, page, breeds: breedsFilter, sort, ageMax, ageMin } = filters;
  const [data, setData] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const [breeds, setBreeds] = React.useState<string[]>([]);

  useEffect(() => {
    fetchBreeds();
    fetchDogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, page, breedsFilter, sort, ageMax, ageMin]);

  const fetchBreeds = async () => {
    setLoading(true);
    try {
      const breeds = await getBreeds();
      setBreeds(breeds);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const fetchDogs = async () => {
    setLoading(true);
    try {
      const dogs = await getDogs({ filters });
      setData(dogs);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return {
    data,
    loading,
    breeds,
  };
};

export default useFetchDogs;
