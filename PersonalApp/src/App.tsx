import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Header from "./Header";
import Home from "./pages/Home";
import Smt from "./pages/Smt";
import ScheduleI from "./pages/ScheduleI";
import { Analytics } from "@vercel/analytics/react"; // ✅ Import Analytics
import Mhw from "./pages/Mhw/Mhw";
import SkillDetail from "./pages/Mhw/SkillDetail";
import Footer from "./pages/Footer";
import MhwSkills from "./pages/Mhw/MhwSkills";
import MhwArmor from "./pages/Mhw/Armor";


const Root = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
      <Footer />
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
          path: "SuperMarket",
          element: <Smt />
        },
        {
          path: "ScheduleI",
          element: <ScheduleI />
        },
        {
          path: "Mhw",
          element: <Mhw />
        },
        {
          path: "Mhw/Skills",
          element: <MhwSkills />
        },
        {
          path: "Mhw/skills/:id",
          element: <SkillDetail />
        },
        {
          path: "Mhw/armor",
          element: <MhwArmor />
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
