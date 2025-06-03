import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      setMessage("✅ Inicio de sesión exitoso");
      setForm({ email: "", password: "" });
      navigate("/dashboard");
    } catch (error) {
      setMessage("❌ Error: " + error.message);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      style={{
        maxWidth: "400px",
        margin: "3rem auto",
        padding: "2rem",
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        fontSize: "1.1rem"
      }}
    >
      <h2 style={{
        textAlign: "center",
        fontSize: "2rem",
        marginBottom: "1.5rem",
        color: "#2c3e50"
      }}>
        Iniciar Sesión
      </h2>

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
        Entrar
      </button>

      {message && (
        <p style={{
          marginTop: "1rem",
          textAlign: "center",
          color: message.startsWith("✅") ? "green" : "red",
          fontSize: "1rem"
        }}>
          {message}
        </p>
      )}
    </form>
  );
}

const inputStyle = {
  width: "100%",
  padding: "0.9rem",
  marginBottom: "1rem",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "1rem"
};

const buttonStyle = {
  width: "100%",
  padding: "1rem",
  fontSize: "1.1rem",
  fontWeight: "bold",
  backgroundColor: "#90e0ef",
  color: "#333",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};
