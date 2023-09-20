import { useState } from "react";
import { NextPage } from "next";

import useFetchDogs from "@/hooks/useFetchDogs";
import { Pagination } from "@/components/utils/pagination";
import { ASCENDANT } from "../../utils/contants/filters";
import { DogsList } from "@/components/dogs/dogs-list";
import { Filters } from "@/components/filters";

const Home: NextPage = () => {
  const [sort, setSort] = useState<string>(ASCENDANT);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [breeds, setBreeds] = useState<string[]>([]);
  const maxFavorites = 5;
  const maxPages = 10;
  const [minAge, setMinAge] = useState<number>();
  const [maxAge, setMaxAge] = useState<number>();

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

  return (
    <main className="w-screen min-h-screen">
      <span className="w-full flex justify-center">
        <h1 className="text-center mt-4 font-bold text-orange-400 text-4xl max-w-[620px] md:max-w-[860px]">
          Let&apos;s start! mark as favorite up to {maxFavorites} dogs to find
          the perfect match for you
        </h1>
      </span>
      <section className="flex justify-center mt-10">
        <Filters
          breedsOptions={breedsOptions}
          handleFilterBreed={handleFilterBreed}
          handleSort={handleSort}
          handleMinAge={handleMinAge}
          handleMaxAge={handleMaxAge}
        />
      </section>

      <section className="mb-4 px-10 my-10">
        <DogsList data={DogsData} />
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
