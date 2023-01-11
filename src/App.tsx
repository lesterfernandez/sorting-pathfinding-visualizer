import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { SortingProvider } from "./AlgorithmProviders";
import { ConfigureModalContext } from "./ConfigureModalContext";
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
        <ConfigureModalContext.Provider value={{ Modal: SortingModal }}>
          <DemoLayout>
            <SortingDemo />
          </DemoLayout>
        </ConfigureModalContext.Provider>
      </SortingProvider>
    ),
  },
  {
    path: "pathfinding",
    element: (
      <SortingProvider>
        <ConfigureModalContext.Provider value={{ Modal: SortingModal }}>
          <DemoLayout>
            <SortingDemo />
          </DemoLayout>
        </ConfigureModalContext.Provider>
      </SortingProvider>
    ),
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}

export default App;

// each renders a layout component along with the header and canvas
