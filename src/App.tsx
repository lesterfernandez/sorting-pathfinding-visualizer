import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import PathfindingDemo from "./PathfindingDemo";
import SortingDemo from "./SortingDemo";

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

// each renders a layout component along with the header and canvas
