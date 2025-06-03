import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useUser } from "../auth/UserContext";

export default function BudgetAlert() {
  const user = useUser();
  const [alerts, setAlerts] = useState([]);
  const [form, setForm] = useState({ category: "", limit: "" });

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "alerts"), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setAlerts(data);
    });
    return () => unsubscribe();
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.category || !form.limit || isNaN(form.limit)) {
      return alert("Por favor, completa los campos correctamente.");
    }

    await addDoc(collection(db, "alerts"), {
      userId: user.uid,
      category: form.category,
      limit: Number(form.limit),
    });

    setForm({ category: "", limit: "" });
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "alerts", id));
  };

  return (
    <div style={{ padding: "1rem", width: "100%", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{
        textAlign: "center",
        fontSize: "2.2rem",
        marginBottom: "1.5rem",
        color: "#2c3e50"
      }}>
        Alertas de Presupuesto
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          marginBottom: "2rem",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <input
          name="category"
          placeholder="Categoría"
          value={form.category}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          name="limit"
          type="number"
          placeholder="Límite $"
          value={form.limit}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <button
          type="submit"
          style={buttonStyle}
        >
          Guardar Límite
        </button>
      </form>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {alerts.map((a) => (
          <div
            key={a.id}
            style={{
              backgroundColor: "#fff",
              padding: "1.5rem",
              borderRadius: "10px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap"
            }}
          >
            <p style={{ fontSize: "1.3rem", margin: 0 }}>
              <strong>{a.category}:</strong> ${a.limit}
            </p>
            <button
              onClick={() => handleDelete(a.id)}
              style={deleteButtonStyle}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Estilo base reutilizable
const inputStyle = {
  width: "100%",
  padding: "0.8rem",
  marginBottom: "1rem",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "1.1rem"
};

const buttonStyle = {
  width: "100%",
  padding: "1rem",
  fontSize: "1.1rem",
  fontWeight: "bold",
  backgroundColor: "#90e1ef",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const deleteButtonStyle = {
  backgroundColor: "#e63946",
  color: "#fff",
  border: "none",
  padding: "0.7rem 1.2rem",
  borderRadius: "6px",
  fontSize: "1rem",
  cursor: "pointer",
  marginTop: "0.5rem"
};
