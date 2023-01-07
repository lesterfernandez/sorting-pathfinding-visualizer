import { NavLink } from "react-router-dom";

export function DemoTopBar() {
  return (
    <div className="flex h-10 max-w-4xl justify-around md:gap-28 md:self-center">
      <button className="rounded-t-lg bg-gray-100 px-4 hover:text-blue-500">
        Configure
      </button>
      <div className="peer-[]: flex rounded-t-xl text-center last:border-l-0">
        <NavLink
          to="/sorting"
          className={({ isActive }) =>
            "flex items-center rounded-tl-lg border-x-2 border-t-2 p-4" +
            (isActive ? " bg-gray-100 text-blue-500" : "")
          }
        >
          Sorting
        </NavLink>
        <NavLink
          to="/pathfinding"
          className={({ isActive }) =>
            "flex items-center rounded-tr-lg border-r-2 border-t-2 p-4" +
            (isActive ? " bg-gray-100 text-blue-500" : "")
          }
        >
          Pathfinding
        </NavLink>
      </div>
      <button className="rounded-t-lg bg-gray-100 px-4 hover:text-blue-500">
        Visualize
      </button>
    </div>
  );
}
