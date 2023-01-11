import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { SortingProvider } from "./AlgorithmProviders";
import { DemoLayout } from "./DemoLayout";
import { SortingDemo } from "./SortingDemo";
import { SortingModal } from "./SortingModal";

const router = createBrowserRouter([
  {
    path: "/",
    loader: () => redirect("sorting"),
  },
  {
    path: "sorting",
    element: (
      <SortingProvider>
        <DemoLayout modal={<SortingModal />}>
          <SortingDemo />
        </DemoLayout>
      </SortingProvider>
    ),
  },
  {
    path: "pathfinding",
    element: (
      <DemoLayout modal={<SortingModal />}>
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
