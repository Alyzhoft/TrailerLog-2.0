import React, { useContext, useEffect, useState } from "react";
import { trailer, TrailerLocation } from "../../types";
import { CategoryContext } from "../../utils/context";

type Props = {
  spot: any;
  lot: TrailerLocation;
  trailers: trailer[];
  spotClicked: (spot: any) => void;
  trailerClicked: (trailer: trailer) => void;
  addOpen: () => void;
  tempModal: () => void;
};

export default function LotSpot({
  spot,
  trailers,
  lot,
  spotClicked,
  addOpen,
  tempModal,
  trailerClicked,
}: Props) {
  const [categoriesOptions, setCategoriesOptions] = useState<
    { categoryName: string; color: string }[]
  >([]);

  const categories = useContext(CategoryContext);

  useEffect(() => {
    const temp = categories.map((category: any) => {
      return { categoryName: category.categoryName, color: category.color };
    });

    setCategoriesOptions(temp.sort());
  }, [categories]);

  function getColor(trailer: trailer) {
    const [category] = categoriesOptions.filter(
      (c) => c.categoryName === trailer.category
    );
    return category !== undefined ? category.color : "blue-100";
  }

  function handleAddClick() {
    spotClicked(spot);
    addOpen();
  }

  function handleEditClick(trailer: trailer) {
    tempModal();
    trailerClicked(trailer);
  }

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  if (
    trailers.find(
      (trailer) =>
        parseInt(trailer.spotNumber) === parseInt(spot.name) &&
        trailer.trailerLocation === lot
    ) !== undefined
  ) {
    const trailer = trailers.find(
      (trailer) =>
        parseInt(trailer.spotNumber) === parseInt(spot.name) &&
        trailer.trailerLocation === lot
    );
    if (trailer !== undefined) {
      return (
        <div>
          <div className="ml-3 font-bold">{spot.name}</div>
          <div className="flex mx-1 w-8 h-28 bg-white rounded-md justify-center shadow-md border-gray-600 border-2">
            <button
              style={{ textOrientation: "upright", writingMode: "vertical-rl" }}
              className={classNames(
                "text-black focus:outline-none w-full rounded",
                `bg-${getColor(trailer)}`
              )}
              onClick={() => handleEditClick(trailer)}
            >
              {trailer?.trailerNumber}
            </button>
          </div>
        </div>
      );
    }
  }

  return (
    <div>
      <div className="ml-3 font-bold">{spot.name}</div>
      <div className="flex mx-1 w-8 h-28 bg-white rounded-md justify-center shadow-md border-gray-600 border-2">
        <button
          style={{ textOrientation: "upright", writingMode: "vertical-rl" }}
          className="text-black h-full w-full focus:outline-none"
          onClick={handleAddClick}
        ></button>
      </div>
    </div>
  );
}
