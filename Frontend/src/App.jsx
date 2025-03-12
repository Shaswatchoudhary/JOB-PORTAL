import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/components_lite/Home";
import Jobs from "./components/components_lite/Jobs";
import TermsOfService from "./components/components_lite/TermsOfService";
import PrivacyPolicy from "./components/components_lite/PrivacyPolicy";
import Browse from "./components/components_lite/Browse";
import Profile from "./components/components_lite/Profile";

const appRouter = createBrowserRouter([
  { path: "/", element: <Home /> },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  // Add more routes here

  {
    path: "/TermsofService",
    element: <TermsOfService />,
  },
  {
    path: "/PrivacyPolicy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/Jobs",
    element: <Jobs />,
  },
  {
    path: "/Home",
    element: <Home />,
  },
  {
    path: "/Browse",
    element: <Browse></Browse>,
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={appRouter}></RouterProvider>
    </div>
  );
}

export default App;
