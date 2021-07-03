import React, { useState } from "react";
import { RouteComponentProps } from "@reach/router";
import Lot from "../components/Lot/Lot";
import Building from "../components/Building/Building";
import { TrailerLocation, trailer } from "../types";
import AddModal from "../components/Modals/AddModal";
import TempModal from "../components/Modals/TempModal";
import EditModal from "../components/Modals/EditModal";

const screenHeight = {
  height: "calc(100vh - 5.75rem)",
};

type Props = RouteComponentProps & {
  trailers: trailer[];
};

const doors = Array.from({ length: 50 }, (_, index) => index + 1);
// const trailers = Array.from({ length: 50 }, (_, index) => index + 1);
const spots = Array.from({ length: 50 }, (_, index) => index + 1);

export default function RMAN({ trailers }: Props) {
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [tempModal, setTempModal] = useState(false);
  const [spotClicked, setSpotClicked] = useState<number>(0);
  const [selctedTrailer, setSelectedTrailer] = useState<trailer | null>(null);
  const [trailerLocation, setTrailerLocation] =
    useState<TrailerLocation | null>(null);

  return (
    <div
      style={screenHeight}
      className="flex flex-col justify-between h-screen mt-5"
    >
      {editOpen ? (
        <EditModal
          open={editOpen}
          close={() => setEditOpen(false)}
          trailer={selctedTrailer}
          spotNumber={spotClicked}
          trailerLocation={trailerLocation}
        />
      ) : (
        <></>
      )}
      {tempModal ? (
        <TempModal
          open={tempModal}
          close={() => setTempModal(false)}
          trailer={selctedTrailer}
          editOpen={() => {
            setTempModal(false);
            setTimeout(() => {
              setEditOpen(true);
            }, 10);
          }}
        />
      ) : (
        <></>
      )}

      {addOpen ? (
        <AddModal
          open={addOpen}
          close={() => setAddOpen(false)}
          spotNumber={spotClicked}
          trailerLocation={trailerLocation}
        />
      ) : (
        <></>
      )}
      <Lot
        spots={spots}
        lot={TrailerLocation.SECONDARY}
        trailers={trailers}
        spotClicked={(spot) => setSpotClicked(spot)}
        trailerClicked={(trailer: trailer) => {
          setSelectedTrailer(trailer);
        }}
        addOpen={() => {
          setTrailerLocation(TrailerLocation.SECONDARY);
          setAddOpen(true);
        }}
        tempModal={() => setTempModal(true)}
      />
      <div className="hidden building:block">
        <Building
          dock={TrailerLocation.RMAN}
          doors={doors}
          trailers={trailers}
          spotClicked={(door) => setSpotClicked(door)}
          trailerClicked={(trailer: trailer) => {
            setSelectedTrailer(trailer);
          }}
          addOpen={() => {
            setTrailerLocation(TrailerLocation.RMAN);
            setAddOpen(true);
          }}
          tempModal={() => setTempModal(true)}
        />
      </div>
      <div className="building:hidden w-full h-full mt-5 ">
        <h1 className="text-4xl font-bold">RMAN</h1>
        <div className="border-black border-t-2">
          <Lot
            spots={spots}
            lot={TrailerLocation.RMAN}
            trailers={trailers}
            trailerClicked={(trailer: trailer) => {
              setSelectedTrailer(trailer);
            }}
            spotClicked={(spot) => setSpotClicked(spot)}
            addOpen={() => {
              setTrailerLocation(TrailerLocation.SECONDARY);
              setAddOpen(true);
            }}
            tempModal={() => setTempModal(true)}
          />
        </div>
      </div>
    </div>
  );
}
