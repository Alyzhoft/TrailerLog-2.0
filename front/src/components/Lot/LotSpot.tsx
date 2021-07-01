import React, { useContext, useEffect, useState } from "react";
import { trailer, TrailerLocation } from "../../types";
import { CategoryContext } from "../../utils/context";
import EditModal from "../Modals/EditModal";

type Props = {
  spot: number;
  lot: TrailerLocation;
  trailers: trailer[];
  spotClicked: (spot: any) => void;
  addOpen: () => void;
};

export default function LotSpot({
  spot,
  trailers,
  lot,
  spotClicked,
  addOpen,
}: Props) {
  const [editOpen, setEditOpen] = useState(false);
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
    addOpen();
    spotClicked(spot);
  }

  function handleEditClick(trailer: trailer) {
    setEditOpen(true);
  }

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  if (
    trailers.find(
      (trailer) =>
        parseInt(trailer.spotNumber) === spot && trailer.trailerLocation === lot
    ) !== undefined
  ) {
    const trailer = trailers.find(
      (trailer) =>
        parseInt(trailer.spotNumber) === spot && trailer.trailerLocation === lot
    );
    if (trailer !== undefined) {
      return (
        <div>
          {editOpen ? (
            <EditModal
              open={editOpen}
              close={() => setEditOpen(false)}
              trailer={trailer}
              spotNumber={spot}
              trailerLocation={lot}
            />
          ) : (
            <></>
          )}
          <div className="ml-3 font-bold">{spot}</div>
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
      <div className="ml-3 font-bold">{spot}</div>
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
