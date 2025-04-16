import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Header from "./Header";
import Home from "./pages/Home";
import Smt from "./pages/Smt";


const Root = () => {
  return (
    <div >
      <Header />
      <Outlet />

    </div>

  );
}






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
        }
      ]
    }
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App;  