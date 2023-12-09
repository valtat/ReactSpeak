import { createContext, useReducer, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import authService from "../services/authService";

const initialState = {
  isLogged: false,
  username: "",
  email: "",
  role: "",
  loading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLogged: true,
        username: action.username,
        email: action.email,
        role: action.role,
        loading: false,
        error: null,
      };
    case "LOGOUT":
      return { ...initialState };
    case "LOADING":
      return { ...state, loading: true };
    case "DONE_LOADING":
      return { ...state, loading: false };
    case "ERROR":
      return { ...state, error: action.error };
    default:
      throw new Error();
  }
}

export const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log("state", state);

  useEffect(() => {
    const checkToken = async () => {
      dispatch({ type: "LOADING" });
      try {
        const token = localStorage.getItem("access_token");
        console.log("Access token is ", token);
        if (token) {
          const decodedToken = jwtDecode(token);
          dispatch({
            type: "LOGIN",
            username: decodedToken.username,
            email: decodedToken.email,
            role: decodedToken.role,
          });
          await authService.verifyToken();
        } else {
          dispatch({ type: "LOGOUT" });
        }
      } catch (error) {
        dispatch({ type: "ERROR", error });
      } finally {
        dispatch({ type: "DONE_LOADING" });
      }
    };

    checkToken();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
