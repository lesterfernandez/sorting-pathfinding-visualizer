import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import PathfindingDemo from "./pathfinding/PathfindingDemo";
import { SortingDemo } from "./sorting/SortingDemo";

const router = createBrowserRouter([
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
]);

export function App() {
  return <RouterProvider router={router} />;
}

export default App;
