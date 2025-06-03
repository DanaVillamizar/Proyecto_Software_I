import Register from "../features/auth/Register";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  return (
    <div
      style={{
        backgroundColor: "#f9f9fb",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Arial, sans-serif"
      }}
    >
      <header
        style={{
          padding: "2rem 1rem",
          textAlign: "center",
          backgroundColor: "#a2d2ff",
          color: "#333",
          fontWeight: "bold",
          fontSize: "2.4rem",
          boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
        }}
      >
        PlaniFi 💸
      </header>

      <main
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem 1rem"
        }}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "3rem 2rem",
            borderRadius: "18px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
            width: "100%",
            maxWidth: "500px"
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "2rem",
              fontSize: "2rem",
              color: "#2c3e50"
            }}
          >
            Crea tu cuenta
          </h2>

          <Register />

          <p
            style={{
              textAlign: "center",
              marginTop: "1.5rem",
              fontSize: "1rem"
            }}
          >
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" style={{ color: "#0077b6", fontWeight: "bold" }}>
              Inicia sesión
            </Link>
          </p>
        </div>
      </main>

      <footer
        style={{
          padding: "1.5rem",
          textAlign: "center",
          backgroundColor: "#a2d2ff",
          fontSize: "1rem",
          color: "#333",
          boxShadow: "0 -2px 6px rgba(0,0,0,0.05)"
        }}
      >
        © {new Date().getFullYear()} PlaniFi — Tu app de control financiero personal.
      </footer>
    </div>
  );
}
