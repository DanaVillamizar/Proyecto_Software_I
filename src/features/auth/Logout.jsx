import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";

export default function Logout() {
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        alert("Sesión cerrada");
      })
      .catch((err) => {
        alert("Error al cerrar sesión: " + err.message);
      });
  };

  return (
    <button
      onClick={handleLogout}
      style={buttonStyle}
      onMouseOver={(e) => e.target.style.backgroundColor = "#e63946"}
      onMouseOut={(e) => e.target.style.backgroundColor = "#ff6b6b"}
    >
      Cerrar sesión
    </button>
  );
}

const buttonStyle = {
  padding: "0.8rem 1.8rem",
  fontSize: "1.2rem",
  fontWeight: "bold",
  backgroundColor: "#ff6b6b",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  transition: "background-color 0.2s ease-in-out"
};
