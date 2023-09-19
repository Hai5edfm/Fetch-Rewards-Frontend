import { useState } from "react";
import { NextPage } from "next";

import useFetchDogs from "@/hooks/useFetchDogs";
import { Pagination } from "@/components/utils/pagination";
import { Search } from "@/components/filters";
import { ASCENDANT } from "../../utils/contants/filters";
import { MultiSelect } from "@/components/utils/multi-select";

const Home: NextPage = () => {
  const [sort, setSort] = useState<string>(ASCENDANT);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [breed, setBreed] = useState<string[]>([]);
  const maxFavorites = 5;
  const maxPages = 10;

  const { breeds } = useFetchDogs({
    filters: { page, breed },
  });

  const breedsOptions = breeds.map((breed) => ({
    label: breed,
    value: breed,
  }));

  const handleSort = (sort: string) => setSort(sort);
  const handleFilterBreed = (breed: string[]) => setBreed(breed);

  return (
    <main className="w-screen h-screen relative">
      <span className="w-full flex justify-center">
        <h1 className="text-center mt-16 font-bold text-orange-400 text-4xl max-w-[620px] md:max-w-[860px]">
          Let&apos;s start! mark as favorite up to {maxFavorites} dogs to find
          the perfect match for you
        </h1>
      </span>
      <section className="flex justify-center mt-10">
        <div className="w-[60%] flex gap-4">
          <span className="w-full">
            <Search handleSort={handleSort} handleSearch={() => {}} />
          </span>
          <MultiSelect
            label="breed"
            data={breedsOptions ?? []}
            placeholder="Filter by breed"
            handleSelect={handleFilterBreed}
          />
        </div>
      </section>

      <footer className="absolute bottom-0 w-screen">
        <div className="w-full flex justify-center mb-20">
          <Pagination page={page} setPage={setPage} maxPages={maxPages} />
        </div>
      </footer>
    </main>
  );
};

export default Home;
