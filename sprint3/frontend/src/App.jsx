import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage/index.jsx";
import RegisterPage from "./pages/RegisterPage/index.jsx";
import ErrorPage from "./pages/error.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage/index.jsx";
import ResetPasswordPage from "./pages/ResetPasswordPage/index.jsx";
import StudyView, {
  loader as languageDataLoader,
} from "./pages/StudyView/index.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import CountriesPage from "./pages/CountriesPage/index.jsx";
// import { Dashboard } from "./components/Dashboard/Dashboard.jsx";
import CountryPage from "./pages/CountryPage/index.jsx";
import WelcomePage from "./pages/WelcomePage/index.jsx";
import TestLayout from "./pages/TestLayout/index.jsx";

// import "./assets/css/Country.css";
import "./App.css";
// import "./assets/css/Login.css";
import { AuthProvider } from "./context/Auth.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<TestLayout />} errorElement={<ErrorPage />}>
      <Route errorElement={<ErrorPage />} />
      <Route index element={<WelcomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Route>
      <Route path="/countries" element={<CountriesPage />} />
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}
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
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
