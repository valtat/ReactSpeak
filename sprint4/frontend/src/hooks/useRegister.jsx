import { useState } from "react";
import authService from "../services/authService";

export const useRegister = () => {
  const [loading, setLoading] = useState(false);

  const handleRegister = async ({
    username,
    email,
    password,
    confirmPassword,
  }) => {
    setLoading(true);
    try {
      await authService.register({
        username,
        email,
        password,
        confirmPassword,
      });
      setLoading(false);
      return null;
    } catch (err) {
      setLoading(false);
      return err.response.data.message;
    }
  };

  return { handleRegister, loading };
};
