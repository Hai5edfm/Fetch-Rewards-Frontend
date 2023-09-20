import { useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { Dog } from "@/interfaces/dogs";
import { getDogById } from "@/services/dogs/getDogById";
import Image from "next/image";

const MatchPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [match, setMatch] = useState<Dog>();

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const dogArr = await getDogById(id as string);
        setMatch(dogArr[0]);
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      fetchMatch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center py-12">
      <h1 className="text-6xl font-bold text-orange-400">
        {id ? `Congrats!` : "No match found"}
      </h1>

      <p className="mt-3 text-2xl">
        {id
          ? "This is the perfect match for you, contact the owner to adopt it!"
          : "Please try again"}
      </p>

      <section>
        {match && (
          <div className="w-[320px] min-h-[320px] bg-green-500/60 rounded-xl p-2 mt-12">
            <div className="w-full h-40 mb-8">
              <Image
                src={match.img}
                alt={match.breed}
                width={320}
                height={320}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col">
                <span className="text-left text-xl font-bold mb-2">
                  Name: {match.name}
                </span>
                <span className="text-left text-xl font-bold mb-2">
                  Breed: {match.breed}
                </span>
                <span className="text-left text-sm">{match.age} years old</span>
              </div>
            </div>
          </div>
        )}
      </section>

      <div className="mt-10">
        <button
          className="bg-orange-400 hover:bg-orange-500 px-4 py-2 rounded-md text-white font-bold"
          onClick={() => router.push("/home")}
        >
          Go back
        </button>
      </div>
    </main>
  );
};

export default MatchPage;
