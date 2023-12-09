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
        username: action.payload.username,
        email: action.payload.email,
        role: action.payload.role,
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
      return { ...state, loading: false, error: action.error };
    default:
      throw new Error();
  }
}

export const AuthStateContext = createContext(initialState);

export const AuthDispatchContext = createContext(() => {
  throw new Error("AuthDispatchContext must be used within an AuthProvider");
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const checkToken = async () => {
      dispatch({ type: "LOADING" });
      try {
        const token = localStorage.getItem("access_token");
        if (token) {
          const decodedToken = jwtDecode(token);
          dispatch({
            type: "LOGIN",
            payload: decodedToken,
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
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};
