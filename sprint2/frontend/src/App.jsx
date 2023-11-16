import Home from "./pages/Home/index.jsx";
import { Login } from "./components/Login.jsx";
import ErrorPage from "./pages/error.jsx";
import { ForgotPassword } from "./components/ForgotPassword.jsx";
import { ResetPassword } from "./components/ResetPassword.jsx";
import StudyView from "./pages/StudyView/index.jsx";
import TestLayout from "./pages/TestLayout/index.jsx";
import CountriesPage, {
  loader as countriesLoader,
} from "./pages/CountriesPage/index.jsx";
import CountryPage from "./components/CountryPage.jsx";
import "./App.css";
import "./assets/css/Country.css";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<TestLayout />} errorElement={<ErrorPage />}>
      <Route errorElement={<ErrorPage />} />
      <Route index element={<Home />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>
      <Route
        path="/countries"
        element={<CountriesPage />}
        loader={countriesLoader}
      />
      <Route path="/countries/:country" element={<CountryPage />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
