import { FC } from "react";
import Image from "next/image";

import { Dog } from "@/interfaces/dogs";
import NoResultsImg from "@/assets/no_results.webp";
import LoadingIcon from "../utils/loading-spin";

interface Props {
  data: Dog[];
  favorites: string[];
  handleFavorite: (id: string) => void;
  loading?: boolean;
}

export const DogsList: FC<Props> = ({
  data,
  favorites,
  handleFavorite,
  ...props
}) => {
  const validateIfIsFavorite = (id: string) => {
    return favorites.includes(id);
  };

  return (
    <>
      <div className="flex flex-wrap justify-center gap-4">
        {props.loading && <LoadingIcon />}
        {data.length === 0 && (
          <div className="w-[300px] min-h-[300px] bg-slate-200 rounded-md p-2">
            <div className="w-full h-40 mb-8">
              <Image
                src={NoResultsImg}
                alt="no results"
                width={320}
                height={320}
                className="w-full h-full object-cover rounded-md"
                loading="lazy"
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-xl font-bold mb-2">No dogs found</span>
              </div>
            </div>
          </div>
        )}
        {!props.loading &&
          data.map((dog) => (
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
                  <span className="text-xl font-bold mb-2">
                    Name: {dog.name}
                  </span>
                  <span className="text-xl font-bold">Breed: {dog.breed}</span>
                  <span className="text-xl font-bold">Age: {dog.age}</span>
                </div>
                <input
                  type="checkbox"
                  className="btn-check"
                  id={dog.id}
                  autoComplete="off"
                  checked={validateIfIsFavorite(dog.id)}
                  onChange={() => handleFavorite(dog.id)}
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
