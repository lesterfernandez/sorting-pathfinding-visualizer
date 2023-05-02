import { createHashRouter, redirect, RouterProvider } from "react-router-dom";
import Debug from "./Debug";
import PathfindingDemo from "./pathfinding/PathfindingDemo";
import { SortingDemo } from "./sorting/SortingDemo";

const router = createHashRouter([
  {
    path: "/",
    loader: () => redirect("sorting"),
  },
  {
    path: "sorting",
    element: <SortingDemo />,
  },
  {
    path: "pathfinding",
    element: <PathfindingDemo />,
  },
  {
    path: "debug-grid",
    element: <Debug />,
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
export default App;
