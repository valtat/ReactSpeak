import React, { useState } from "react";

export const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const handleSubmit = async (evt) => {
        evt.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await fetch("/api/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password }),
            });

            if (response.ok) {
                //TO DO: Redirect to dashboard or home page
                console.log("Password reset successful!");
            } else {
                const error = await response.json();
                alert(error.message);
            }
            
        } catch (error) {
            console.error(error);
            alert("An error occurred while resetting password");
        }
    };
    
    return (
        <div className="auth-form-container">
        <h2>Reset Password</h2>
        <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="password">New Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="******"
          id="password"
          name="password"
        />
        <label htmlFor="confirmPassword">Re-Type Password</label>
        <input
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          placeholder="******"
          id="confirmPassword"
          name="confirmPassword"
        />
        <button type="submit">Submit</button>
        </form>
        </div>
    ); 
};