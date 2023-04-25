import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
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
    element: <SortingDemo />,
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}

export default App;
