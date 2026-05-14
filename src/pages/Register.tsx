import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError("");

    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      await authService.register({ email, password });
      navigate("/login");
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-content-center align-items-center min-h-screen">
      <div className="surface-card p-4 shadow-2 border-round w-full md:w-4">
        <h2 className="text-center mb-2">Register</h2>
        <p className="text-center text-600 mb-4">Create your account to get started.</p>

        {error && <p className="text-center text-red-500 mb-3">{error}</p>}

        <div className="field mb-3">
          <label>Email</label>
          <InputText
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="field mb-3">
          <label>Password</label>
          <InputText
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="field mb-3">
          <label>Confirm Password</label>
          <InputText
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full"
          />
        </div>

        <Button
          label={loading ? "Registering..." : "Register"}
          className="w-full"
          onClick={handleRegister}
          loading={loading}
        />

        <p className="text-center mt-3">
          Already a registered user? <Link to="/login">Click here</Link>
        </p>
      </div>
    </div>
  );
}
