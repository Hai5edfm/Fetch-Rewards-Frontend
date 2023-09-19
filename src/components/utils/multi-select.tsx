import { FC, useEffect, useState } from "react";
import { Search } from "../filters/index";

interface Props {
  data: Data[];
  label: string;
  placeholder: string;
  handleSelect: (selected: string[]) => void;
}

interface Data {
  label: string;
  value: string;
}

export const MultiSelect: FC<Props> = ({
  data,
  placeholder,
  handleSelect,
  ...props
}) => {
  const [filtered, setFiltered] = useState<Data[]>([]);
  const [search, setSearch] = useState<string>("");
  const [selected, setSelected] = useState<string[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    let filtered = data;
    if (search !== "") {
      filtered = data.filter((item) =>
        item.label.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFiltered(filtered);
  }, [search, data]);

  useEffect(() => {
    handleSelect(selected);
  }, [selected, handleSelect]);

  const handleSelectItem = (value: string) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((item) => item !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  const handleSearch = (search: string) => setSearch(search);

  const handleOpenCloseBtn = () => {
    setOpen(!open);

    if (!open) {
      setSearch("");
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="btn btn-primary bg-primary"
        onClick={handleOpenCloseBtn}
      >
        {props.label}
      </button>
      {open && (
        <div className="absolute top-12 right-0 min-w-[240px] bg-slate-100 p-3 rounded-md max-h-[420px] overflow-auto">
          <div className="mb-2">
            <Search handleSearch={handleSearch} />
          </div>
          <div className="rounded-md flex flex-col gap-1">
            {filtered.map((option) => (
              <li
                key={option.value}
                className="dropdown-item flex items-center gap-2"
                onClick={() => handleSelectItem(option.value)}
              >
                <input
                  type="checkbox"
                  checked={selected.includes(option.value)}
                  onChange={() => handleSelectItem(option.value)}
                />
                <button type="button">{option.label}</button>
              </li>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
