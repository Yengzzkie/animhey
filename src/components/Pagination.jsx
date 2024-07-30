import React, { useContext, useState } from "react";
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { CurrentPageContext } from "../utils/context";

export function SimplePagination() {
  const { currentPage, setCurrentPage } = useContext(CurrentPageContext);
  const [inputValue, setInputValue] = useState(currentPage);

  const next = () => {
    if (currentPage < 250) {
      setCurrentPage(currentPage + 1);
      setInputValue(currentPage + 1);
    }
  };

  const prev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setInputValue(currentPage - 1);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const jumpPage = () => {
    const page = parseInt(inputValue, 10);
    if (page >= 1 && page <= 250) {
      setCurrentPage(page);
    } else {
      alert("Please enter a valid page number between 1 and 250");
    }
  };

  return (
    <div className="flex flex-col items-center gap-1 ml-auto mb-2">
      <div className="flex items-center gap-8">
        <IconButton
          size="sm"
          variant="outlined"
          onClick={prev}
          disabled={currentPage === 1}
          className="text-white"
        >
          <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
        </IconButton>
        <Typography color="gray" className="text-white font-normal">
          Page <strong className="text-gray-300">{currentPage}</strong> of{" "}
          <strong className="text-gray-300">250</strong>
        </Typography>
        <IconButton
          size="sm"
          variant="outlined"
          onClick={next}
          disabled={currentPage === 250}
          className="text-white"
        >
          <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
        </IconButton>
      </div>
      <div className="flex items-center gap-1 text-sm">
        <label htmlFor="page" className="text-gray-300">Jump to page: </label>
        <input
          id="page"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="text-[#141414] text-xs p-1 rounded-md mr-1 w-14"
        />
        <button onClick={jumpPage} className="bg-[#252525] text-xs hover:bg-red-500 rounded-md border-2 px-2 p-1">
          Go
        </button>
      </div>
    </div>
  );
}
