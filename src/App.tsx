import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { ConfigureModalProvider } from "./modal/ConfigureModalContext";
import { SortingSettingsProvider } from "./sorting/SortingContext";
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
      <SortingSettingsProvider>
        <ConfigureModalProvider modal={SortingModal}>
          <DemoLayout>
            <SortingDemo />
          </DemoLayout>
        </ConfigureModalProvider>
      </SortingSettingsProvider>
    ),
  },
  {
    path: "pathfinding",
    element: (
      <SortingSettingsProvider>
        <ConfigureModalProvider modal={SortingModal}>
          <DemoLayout>
            <SortingDemo />
          </DemoLayout>
        </ConfigureModalProvider>
      </SortingSettingsProvider>
    ),
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}

export default App;
