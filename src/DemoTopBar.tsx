import { useRef } from "react";
import { NavLink } from "react-router-dom";
import { ConfigureModal } from "./ConfigureModal";

interface Props {
  modal: JSX.Element;
}

export function DemoTopBar({ modal }: Props) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const toggleModal = () => void modalRef.current?.classList.toggle("hidden");

  return (
    <>
      <div className="grid h-24 grid-cols-2 grid-rows-2 sm:flex sm:h-10">
        <NavLink
          to="/sorting"
          draggable={false}
          className={({ isActive }) =>
            "flex place-content-center items-center border-2 border-b-0 p-4 sm:ml-4 sm:rounded-tl-lg" +
            (isActive ? " bg-gray-100 text-blue-500" : "")
          }
        >
          Sorting
        </NavLink>
        <NavLink
          to="/pathfinding"
          draggable={false}
          className={({ isActive }) =>
            "row-start-2 flex place-content-center items-center border-2 p-4 sm:mr-auto sm:rounded-tr-lg sm:border-b-0 sm:border-l-0" +
            (isActive ? " bg-gray-100 text-blue-500" : "")
          }
        >
          Pathfinding
        </NavLink>
        <button
          className="col-start-2 border-t-2 border-r-2 bg-gray-100 px-4 hover:text-blue-500 sm:rounded-tl-lg sm:border-l-2"
          onClick={toggleModal}
        >
          Configure
        </button>
        <button className="border-2 border-l-0 bg-gray-100 px-4 hover:text-blue-500 sm:mr-4 sm:rounded-tr-lg sm:border-b-0">
          Visualize
        </button>
      </div>
      <ConfigureModal
        modal={modal}
        modalRef={modalRef}
        toggleModal={toggleModal}
      />
    </>
  );
}
