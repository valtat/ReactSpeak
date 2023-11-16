import { useState } from "react";
import userService from "../services/userService.js";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ email }) => {
    setLoading(true);
    try {
      const response = await userService.forgotPassword(email);
      console.log(response);
      navigate("/reset-password");
    } catch (error) {
      console.log(error);
      alert("Fuck you.");
    } finally {
      setLoading(false);
    }
  };

  console.log(watch("example"));
  const navigate = useNavigate();

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label>Email </label>
          <input
            type="text"
            name="email"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            placeholder="youremail@gmail.com"
          />
          {errors.email?.type === "required" && (
            <p className="errorMsg">⚠ Email is required.</p>
          )}
          {errors.email?.type === "pattern" && (
            <p className="errorMsg">⚠ Email is not valid.</p>
          )}
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};
