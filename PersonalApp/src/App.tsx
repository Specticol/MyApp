import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Header from "./Header";
import Home from "./pages/Home";
import Smt from "./pages/Smt";
import ScheduleI from "./pages/ScheduleI";
import { Analytics } from "@vercel/analytics/react"; // ✅ Import Analytics

const Root = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: "smt",
          element: <Smt />
        },
        {
          path: "ScheduleI",
          element: <ScheduleI />
        }
      ]
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <Analytics /> {/* ✅ Place this here so it's always loaded */}
    </>
  );
};

export default App;
