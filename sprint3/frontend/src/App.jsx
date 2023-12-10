import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { Login } from "./components/Forms/Login.jsx";
import { Register } from "./components/Forms/Register.jsx";
import ErrorPage from "./pages/error.jsx";
import { ForgotPassword } from "./components/Forms/ForgotPassword.jsx";
import { ResetPassword } from "./components/Forms/ResetPassword.jsx";
import StudyView, {
  loader as languageDataLoader,
} from "./pages/StudyView/index.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import CountriesPage from "./pages/CountriesPage/index.jsx";
import { Dashboard } from "./components/Dashboard/Dashboard.jsx";
import CountryPage from "./pages/CountryPage/index.jsx";
import TestLayout from "./pages/TestLayout/index.jsx";
import ChatComponent from "./components/Chat/ChatComponent.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import PublicRoute from "./components/PublicRoute.jsx";
import FrontPage from "./pages/FrontPage/index.jsx";

// import "./assets/css/Country.css";
import "./App.css";
// import "./assets/css/Login.css";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<TestLayout />} errorElement={<ErrorPage />}>
        <Route errorElement={<ErrorPage />} />
        <Route index element={<FrontPage />} />
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chat" element={<ChatComponent />} />
        </Route>
        <Route path="/countries" element={<CountriesPage />} />
        <Route
          path="/study"
          element={<StudyView />}
          loader={languageDataLoader}
        />
        <Route element={<AdminRoute />}>
          <Route path="/admintest" element={<div>Admin Route</div>} />
        </Route>
        <Route path="/countries/:countryName" element={<CountryPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
