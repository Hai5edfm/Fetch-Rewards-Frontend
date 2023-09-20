import { useEffect, useState } from "react";
import { NextPage } from "next";

import useFetchDogs from "@/hooks/useFetchDogs";
import { Pagination } from "@/components/utils/pagination";
import { ASCENDANT } from "../../utils/contants/filters";
import { DogsList } from "@/components/dogs/dogs-list";
import { Filters } from "@/components/filters";
import { makeMatch } from "@/services/dogs/makeMatch";
import LoadingIcon from "@/components/utils/loading-spin";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [sort, setSort] = useState<string>(ASCENDANT);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [breeds, setBreeds] = useState<string[]>([]);
  const maxFavorites = 5;
  const maxPages = 10;
  const [minAge, setMinAge] = useState<number>();
  const [maxAge, setMaxAge] = useState<number>();

  const [favorites, setFavorites] = useState<string[]>([]);

  const { breeds: breedsData, data: DogsData } = useFetchDogs({
    filters: { limit, page, breeds, sort, ageMax: maxAge, ageMin: minAge },
  });

  const breedsOptions = breedsData.map((breed) => ({
    label: breed,
    value: breed,
  }));

  const handleSort = (sort: string) => setSort(sort);
  const handleFilterBreed = (breed: string[]) => setBreeds(breed);
  const handleMinAge = (minAge: number) => setMinAge(minAge);
  const handleMaxAge = (maxAge: number) => setMaxAge(maxAge);

  const handleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favorite) => favorite !== id));
    } else {
      if (favorites.length < maxFavorites) {
        setFavorites([...favorites, id]);
      }
    }
  };

  const handleMatch = async () => {
    try {
      setLoading(true);
      const { match } = await makeMatch({ data: favorites });

      if (match) {
        router.push(`/match/${match}`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(
    () => {
      if (DogsData.length > 0) {
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [DogsData]
  );

  return (
    <main className="w-screen min-h-screen">
      <span className="w-full flex justify-center">
        <h1 className="text-center mt-4 font-bold text-orange-400 text-4xl max-w-[620px] md:max-w-[860px]">
          Let&apos;s start! mark as favorite up to {maxFavorites} dogs to find
          the perfect match for you
        </h1>
      </span>
      <section className="flex flex-col items-center justify-center mt-10">
        <Filters
          breedsOptions={breedsOptions}
          handleFilterBreed={handleFilterBreed}
          handleSort={handleSort}
          handleMinAge={handleMinAge}
          handleMaxAge={handleMaxAge}
        />
        <div className="mt-10">
          <button
            className="bg-orange-400 hover:bg-orange-500 px-4 py-2 rounded-md text-white font-bold disabled:bg-orange-300"
            disabled={favorites.length < maxFavorites}
            title={
              favorites.length < maxFavorites
                ? `You need to select ${
                    maxFavorites - favorites.length
                  } more dogs`
                : "Find your life partner"
            }
            onClick={handleMatch}
          >
            {loading ? <LoadingIcon /> : "Find your life partner 🦴"}
          </button>
        </div>
      </section>

      <section className="mb-4 px-10 my-10">
        <DogsList
          data={DogsData}
          favorites={favorites}
          handleFavorite={handleFavorite}
          loading={loading}
        />
      </section>

      <footer className="w-screen">
        <div className="w-full flex justify-center my-16">
          <Pagination page={page} setPage={setPage} maxPages={maxPages} />
        </div>
      </footer>
    </main>
  );
};

export default Home;
