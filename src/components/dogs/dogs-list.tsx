import { FC } from "react";
import Image from "next/image";

import { Dog } from "@/interfaces/dogs";

interface Props {
  data: Dog[];
}

export const DogsList: FC<Props> = ({ data }) => {
  return (
    <>
      <div className="flex flex-wrap justify-center gap-4">
        {data.map((dog) => (
          <div
            key={dog.id}
            className="w-[300px] min-h-[300px] bg-slate-200 rounded-md p-2"
          >
            <div className="w-full h-40 mb-8">
              <Image
                src={dog.img}
                alt={dog.breed}
                width={320}
                height={320}
                className="w-full h-full object-cover rounded-md"
                loading="lazy"
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-xl font-bold mb-2">Name: {dog.name}</span>
                <span className="text-xl font-bold">Breed: {dog.breed}</span>
                <span className="text-xl font-bold">Age: {dog.age}</span>
              </div>
              <input
                type="checkbox"
                className="btn-check"
                id={dog.id}
                autoComplete="off"
              />
              <label
                className="btn btn-outline-warning"
                htmlFor={dog.id}
                title="Mark as favorite"
              >
                🧡
              </label>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
