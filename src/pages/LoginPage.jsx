import Login from "../features/auth/Login";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div style={{ backgroundColor: "#f9f9fb", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <header style={{
        padding: "2rem",
        textAlign: "center",
        backgroundColor: "#a2d2ff",
        color: "#333",
        fontWeight: "bold",
        fontSize: "2.2rem"
      }}>
        PlaniFi 💸
      </header>

      <main style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "3rem"
      }}>
        <div style={{
          backgroundColor: "#ffffff",
          padding: "3rem",
          borderRadius: "16px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "480px"
        }}>
          <h2 style={{ textAlign: "center", marginBottom: "2rem", fontSize: "1.8rem", color: "#333" }}>Bienvenido</h2>
          <Login />
          <p style={{ textAlign: "center", marginTop: "1.5rem" }}>
            ¿No tienes cuenta? <Link to="/register" style={{ color: "#0077b6" }}>Regístrate aquí</Link>
          </p>
        </div>
      </main>

      <footer style={{
        padding: "1.5rem",
        textAlign: "center",
        backgroundColor: "#a2d2ff",
        fontSize: "1rem",
        color: "#333"
      }}>
        © {new Date().getFullYear()} PlaniFi — Tu app de control financiero personal.
      </footer>
    </div>
  );
}


