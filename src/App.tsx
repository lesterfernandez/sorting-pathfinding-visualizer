import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { DemoLayout } from "./DemoLayout";
import { SortingDemo } from "./SortingDemo";

const router = createBrowserRouter([
  {
    path: "/",
    loader: () => redirect("sorting"),
  },
  {
    path: "sorting",
    element: (
      <DemoLayout>
        <SortingDemo />
      </DemoLayout>
    ),
  },
  {
    path: "pathfinding",
    element: (
      <DemoLayout>
        <SortingDemo />
      </DemoLayout>
    ),
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}

export default App;

// each renders a layout component along with the header and canvas
