import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, form.email, form.password);
      setMessage("✅ Registro exitoso");
      setForm({ email: "", password: "" });
      navigate("/dashboard");
    } catch (error) {
      setMessage("❌ Error: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <input
        type="email"
        name="email"
        placeholder="Correo electrónico"
        value={form.email}
        onChange={handleChange}
        required
        style={inputStyle}
      />
      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        value={form.password}
        onChange={handleChange}
        required
        style={inputStyle}
      />
      <button type="submit" style={buttonStyle}>
        Registrarse
      </button>
      {message && (
        <p style={{ marginTop: "0.5rem", textAlign: "center", color: message.startsWith("✅") ? "green" : "red" }}>
          {message}
        </p>
      )}
    </form>
  );
}

const formStyle = {
  maxWidth: "400px",
  margin: "2rem auto",
  padding: "2rem",
  backgroundColor: "#fff",
  borderRadius: "10px",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)"
};

const inputStyle = {
  marginBottom: "0.75rem",
  padding: "0.8rem",
  borderRadius: "6px",
  border: "1px solid #ccc",
  width: "100%",
  fontSize: "1rem"
};

const buttonStyle = {
  backgroundColor: "#90e0ef",
  color: "#333",
  padding: "0.8rem",
  borderRadius: "6px",
  width: "100%",
  fontWeight: "bold",
  fontSize: "1.1rem",
  border: "none",
  cursor: "pointer"
};
