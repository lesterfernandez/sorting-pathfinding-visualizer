import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import { SortingSettingsProvider } from "./sorting/SortingContext";
import { SortingDemo } from "./sorting/SortingDemo";
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
        <SortingDemo />
      </SortingSettingsProvider>
    ),
  },
  {
    path: "pathfinding",
    element: (
      <SortingSettingsProvider>
        <SortingDemo />
      </SortingSettingsProvider>
    ),
  },
]);

export function App() {
  return (
    <DemoLayout>
      <RouterProvider router={router} />
    </DemoLayout>
  );
}

export default App;
