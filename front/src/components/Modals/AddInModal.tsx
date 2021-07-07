import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useEffect, useState } from "react";
import ComboBox from "../ui/ComboBox";
import Input from "../ui/Input";
import TextArea from "../ui/TextArea";
import Button from "../ui/Button";
import { SocketContext } from "../../utils/socket";
import { CarrierContext, CategoryContext } from "../../utils/context";

enum TrailerLocation {
  PRIMARY = "PRIMARY",
  SECONDARY = "SECONDARY",
  RVAC = "RVAC",
  RMAN = "RMAN",
}

type Props = {
  open: boolean;
  //   spotNumber: any;
  //   trailerLocation?: TrailerLocation | null;
  close: () => void;
};

export default function AddInModal({
  open,
  close,
}: //   spotNumber,
//   trailerLocation,
Props) {
  return (
    <>
      <Transition show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          static
          open={open}
          onClose={close}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    close();
                  }}
                >
                  <div className="mt-4 flex w-full">
                    <Button
                      classes="w-full justify-center text-xl"
                      type="submit"
                    >
                      Add
                    </Button>
                    <div className="ml-2 w-full">
                      <Button
                        classes="w-full justify-center text-xl"
                        variant="primary"
                        close={close}
                      >
                        In
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
