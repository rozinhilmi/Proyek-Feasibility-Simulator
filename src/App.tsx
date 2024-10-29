import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import { createContext } from "react";
import { Dashboard, FormCalculation } from "./pages";

// const Dashboard = lazy((): any => import("./pages/Dashboard"));
export const ThemeContext: any = createContext(null);
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* write route here */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/form-calculation/:modelUnit/:typeUnit" element={<FormCalculation />} />
      </>
    )
  );
  return (
    <ThemeContext.Provider>
      <RouterProvider router={router} />
    </ThemeContext.Provider>
  );
}

export default App;
