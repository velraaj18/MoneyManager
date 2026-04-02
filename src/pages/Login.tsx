import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { authService } from "../services/authService";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    await authService.login({ email, password });
  };

  return (
    <div className="flex justify-content-center align-items-center min-h-screen">
      <div className="surface-card p-4 shadow-2 border-round w-full md:w-4">
        <h2 className="text-center mb-4">Login</h2>

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

        <Button label="Login" className="w-full" onClick={handleLogin} />
        <p className="text-center mt-3">
          New User? <Link to="/register">Click here</Link>
        </p>
      </div>
    </div>
  );
}
