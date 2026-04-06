import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { authService } from "../services/authService";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    await authService.register({ email, password }).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <div className="flex justify-content-center align-items-center min-h-screen">
      <div className="surface-card p-4 shadow-2 border-round w-full md:w-4">
        <h2 className="text-center mb-4">Register</h2>

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

        <Button label="Register" className="w-full" onClick={handleRegister}/>

        <p className="text-center mt-3">
          Already a registered user? <Link to="/login">Click here</Link>
        </p>
      </div>
    </div>
  );
}
