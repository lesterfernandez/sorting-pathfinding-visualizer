import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { SortingProvider } from "./AlgorithmProviders";
import { ConfigureModalProvider } from "./modal/ConfigureModalContext";
import { SortingDemo } from "./sorting/SortingDemo";
import { SortingModal } from "./sorting/SortingModal";
import { DemoLayout } from "./ui/DemoLayout";

const router = createBrowserRouter([
  {
    path: "/",
    loader: () => redirect("sorting"),
  },
  {
    path: "sorting",
    element: (
      <SortingProvider>
        <ConfigureModalProvider modal={SortingModal}>
          <DemoLayout>
            <SortingDemo />
          </DemoLayout>
        </ConfigureModalProvider>
      </SortingProvider>
    ),
  },
  {
    path: "pathfinding",
    element: (
      <SortingProvider>
        <ConfigureModalProvider modal={SortingModal}>
          <DemoLayout>
            <SortingDemo />
          </DemoLayout>
        </ConfigureModalProvider>
      </SortingProvider>
    ),
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}

export default App;
