import Home from "./pages/Home/index.jsx";
import { Login } from "./components/Login.jsx";
import ErrorPage from "./pages/error.jsx";
import { ForgotPassword } from "./components/ForgotPassword.jsx";
import { ResetPassword } from "./components/ResetPassword.jsx";
import StudyView from "./pages/StudyView/index.jsx";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
