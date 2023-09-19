import { FC } from "react";
import { sortOptions } from "@/utils/contants/filters";
import { MultiSelect } from "../utils/multi-select";

interface Props {
  handleSort?: (sort: string) => void;
  handleSearch: (search: string) => void;
}

export const Search: FC<Props> = ({ handleSort, handleSearch }) => {
  return (
    <div>
      <div className="input-group">
        <input
          type="text"
          placeholder="Search"
          className="form-control"
          onChange={(e) => handleSearch(e.target.value)}
        />
        {handleSort && (
          <>
            <button type="button" className="btn btn-outline-secondary px-2">
              Sort
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="visually-hidden">Toggle Dropdown</span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              {sortOptions.map((option) => (
                <li key={option.value}>
                  <button
                    className="dropdown-item"
                    onClick={() => handleSort(option.value)}
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};
