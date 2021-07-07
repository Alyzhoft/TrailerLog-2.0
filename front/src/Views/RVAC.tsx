import React, { useContext, useEffect, useState } from "react";
import { RouteComponentProps } from "@reach/router";
import Lot from "../components/Lot/Lot";
import Building from "../components/Building/Building";
import { trailer, TrailerLocation } from "../types";
import AddModal from "../components/Modals/AddModal";
import EditModal from "../components/Modals/EditModal";
import TempModal from "../components/Modals/TempModal";
import AddInModal from "../components/Modals/AddInModal";
import { TrailerLocationContext } from "../utils/context";

const screenHeight = {
  height: "calc(100vh - 5.75rem)",
};

type Props = RouteComponentProps & {
  trailers: trailer[];
};

// const doors = Array.from({ length: 50 }, (_, index) => index + 1);
// const trailers = Array.from({ length: 50 }, (_, index) => index + 1);

export default function RVAC({ trailers }: Props) {
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [tempModal, setTempModal] = useState(false);
  const [addIn, setAddIn] = useState(false);
  const [spotClicked, setSpotClicked] = useState<number>(0);
  const [selctedTrailer, setSelectedTrailer] = useState<trailer | null>(null);
  const [doors, setDoors] = useState([]);

  const trailerLocations = useContext(TrailerLocationContext);

  useEffect(() => {
    for (let i = 0; i < trailerLocations.length; i++) {
      if (trailerLocations[i].name === "RVAC") {
        setDoors(trailerLocations[i].Spots);
      }
    }
  }, [trailerLocations]);

  return (
    <div
      style={screenHeight}
      className="flex flex-col justify-between h-screen mt-5"
    >
      {addOpen ? (
        <AddModal
          open={addOpen}
          close={() => setAddOpen(false)}
          spotNumber={spotClicked}
          trailerLocation={TrailerLocation.RVAC}
        />
      ) : (
        <></>
      )}
      {editOpen ? (
        <EditModal
          open={editOpen}
          close={() => setEditOpen(false)}
          trailer={selctedTrailer}
          trailerLocation={TrailerLocation.RVAC}
        />
      ) : (
        <></>
      )}
      {addIn ? (
        <AddInModal
          open={addIn}
          close={() => setAddIn(false)}
          // trailer={selctedTrailer}
          // editOpen={() => {
          //   setTempModal(false);
          //   setTimeout(() => {
          //     setEditOpen(true);
          //   }, 10);
          // }}
          // lotMove={() => {
          //   setTempModal(false);
          //   setTimeout(() => {
          //     setLotModal(true);
          //   }, 10);
          // }}
        />
      ) : (
        <></>
      )}
      {/* Do not remove the below div */}
      <div></div>
      <div className="hidden building:block">
        <Building
          dock={"RVAC"}
          doors={doors}
          trailers={trailers}
          spotClicked={(door) => setSpotClicked(door)}
          trailerClicked={(trailer: trailer) => setSelectedTrailer(trailer)}
          addOpen={() => setAddIn(true)}
          tempModal={() => setEditOpen(true)}
        />
      </div>
      <div className="building:hidden w-full h-full mt-5 ">
        <h1 className="text-4xl font-bold">RVAC</h1>
        <div className="border-black border-t-2">
          <Lot
            spots={doors}
            lot={TrailerLocation.RVAC}
            trailers={trailers}
            trailerClicked={(trailer: trailer) => setSelectedTrailer(trailer)}
            spotClicked={(spot) => setSpotClicked(spot)}
            addOpen={() => setAddOpen(true)}
            tempModal={() => setAddIn(true)}
          />
        </div>
      </div>
    </div>
  );
}
