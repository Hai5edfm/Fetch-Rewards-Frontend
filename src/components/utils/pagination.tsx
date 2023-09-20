import { FC, useState } from "react";

interface Props {
  page: number;
  setPage: (page: number) => void;
  maxPages: number;
}

export const Pagination: FC<Props> = ({ page, setPage, maxPages }) => {
  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < maxPages) {
      setPage(page + 1);
    }
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item">
          <button className="page-link" onClick={handlePreviousPage}>
            Previous
          </button>
        </li>
        <li className="page-item">
          {page - 2 > 0 && (
            <button
              className="page-link"
              onClick={() => handlePageChange(page - 2)}
            >
              {page - 2}
            </button>
          )}
        </li>
        <li className="page-item">
          {page - 1 > 0 && (
            <button
              className="page-link"
              onClick={() => handlePageChange(page - 1)}
            >
              {page - 1}
            </button>
          )}
        </li>
        <li className="page-item">
          <button
            className="page-link active"
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        </li>
        <li className="page-item">
          {page + 1 <= maxPages && (
            <button
              className="page-link"
              onClick={() => handlePageChange(page + 1)}
            >
              {page + 1}
            </button>
          )}
        </li>
        <li className="page-item">
          {page + 2 <= maxPages && (
            <button
              className="page-link"
              onClick={() => handlePageChange(page + 2)}
            >
              {page + 2}
            </button>
          )}
        </li>
        <li className="page-item">
          <button className="page-link" onClick={handleNextPage}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};
