import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { Login } from "./components/Login.jsx";
import { Register } from "./components/Register.jsx";
import ErrorPage from "./pages/error.jsx";
import { ForgotPassword } from "./components/ForgotPassword.jsx";
import { ResetPassword } from "./components/ResetPassword.jsx";
import StudyView, {
  loader as languageDataLoader,
} from "./pages/StudyView/index.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import CountriesPage from "./pages/CountriesPage/index.jsx";
import { Dashboard } from "./components/Dashboard.jsx";
import CountryPage from "./pages/CountryPage/index.jsx";
import WelcomePage from "./pages/WelcomePage/index.jsx";
import TestLayout from "./pages/TestLayout/index.jsx";
import "./assets/css/Country.css";
import "./App.css";
import "./assets/css/Login.css";
import "./assets/css/Dashboard.css";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<TestLayout />} errorElement={<ErrorPage />}>
      <Route errorElement={<ErrorPage />} />
      <Route index element={<WelcomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>
      <Route path="/countries" element={<CountriesPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route
        path="/study"
        element={<StudyView />}
        loader={languageDataLoader}
      />
      <Route path="/countries/:countryName" element={<CountryPage />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
