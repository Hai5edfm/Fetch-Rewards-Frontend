import React, { FC, useEffect } from "react";
import { MultiSelect } from "../utils/multi-select";
import { sortOptions } from "@/utils/contants/filters";

interface Props {
  handleSort: (sort: string) => void;
  breedsOptions: Data[];
  handleFilterBreed: (selected: string[]) => void;
  handleMinAge: (minAge: number) => void;
  handleMaxAge: (maxAge: number) => void;
}

interface Data {
  label: string;
  value: string;
}

export const Filters: FC<Props> = ({
  handleSort,
  breedsOptions,
  handleFilterBreed,
  ...props
}) => {
  const [minAge, setMinAge] = React.useState<number>();
  const [maxAge, setMaxAge] = React.useState<number>();

  useEffect(() => {
    if (minAge) {
      props.handleMinAge(minAge);
    } else {
      props.handleMinAge(0);
    }

    if (maxAge) {
      props.handleMaxAge(maxAge);
    } else {
      props.handleMaxAge(100);
    }
  }, [minAge, maxAge, props]);

  return (
    <div className="w-[100%] flex flex-col justify-center gap-4">
      <div className="flex flex-col justify-center gap-4 w-[32%] mx-auto">
        <p>Filter by age</p>
        <div className="flex gap-2">
          <input
            type="number"
            className="form-control"
            placeholder="Min age"
            onChange={(e) => setMinAge(Number(e.target.value))}
            min={0}
            step={1}
          />
          <input
            type="number"
            className="form-control"
            placeholder="Max age"
            onChange={(e) => setMaxAge(Number(e.target.value))}
            min={0}
            step={1}
          />
        </div>
      </div>
      <div className="w-[100%] flex justify-center items-end gap-4">
        <div className="flex gap-2 flex-col">
          <label htmlFor="sort">Sort by</label>
          <select
            className="form-select w-32"
            id="sort"
            onChange={(e) => handleSort(e.target.value)}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <p>Filter by breed</p>
          <MultiSelect
            label="breed"
            data={breedsOptions ?? []}
            placeholder="Filter by breed"
            handleSelect={handleFilterBreed}
          />
        </div>
      </div>
    </div>
  );
};
