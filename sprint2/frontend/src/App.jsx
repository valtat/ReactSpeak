import Home from "./pages/Home/index.jsx";
import { Login } from "./components/Login.jsx";
import { Register } from "./components/Register.jsx";
import ErrorPage from "./pages/error.jsx";
import { ForgotPassword } from "./components/ForgotPassword.jsx";
import { ResetPassword } from "./components/ResetPassword.jsx";
import StudyView from "./pages/StudyView/index.jsx";
import TestLayout from "./pages/TestLayout/index.jsx";
import CountriesPage from "./pages/CountriesPage/index.jsx";
import "./App.css";
import "./assets/css/Country.css";
import "./assets/css/Login.css";
import "./assets/css/Dashboard.css";

import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import WelcomePage from "./pages/WelcomePage/index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/study-temp",
    element: <StudyView />,
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
  {
    path: "/countries",
    element: <CountriesPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/welcome",
    element: <WelcomePage />,
    errorElement: <ErrorPage />,
  }
]);

const router2 = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<TestLayout />} errorElement={<ErrorPage />}>
      <Route errorElement={<ErrorPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/countries" element={<CountriesPage />} />
      <Route path="/welcome" element={<WelcomePage/>} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router2} />;
}

export default App;
