import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useUser } from "../auth/UserContext";

export default function TransactionList({ setEditData, setActiveSubSection }) {
  const user = useUser();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "transactions"),
      where("userId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTransactions(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const handleDelete = async (id) => {
    const confirm = window.confirm("¿Eliminar esta transacción?");
    if (!confirm) return;
    await deleteDoc(doc(db, "transactions", id));
  };

  const handleEdit = (tx) => {
    setEditData(tx);
    setActiveSubSection("add");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!user) return null;

  return (
    <div style={{ padding: "2rem", maxWidth: "1000px", margin: "0 auto" }}>
      <h2 style={{ fontSize: "2rem", marginBottom: "1.5rem", color: "#2c3e50" }}>
        Mis Transacciones
      </h2>

      {loading ? (
        <p>Cargando transacciones...</p>
      ) : transactions.length === 0 ? (
        <p>No tienes movimientos registrados.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {transactions.map((tx) => (
            <li
              key={tx.id}
              style={{
                backgroundColor: "#fff",
                marginBottom: "1rem",
                padding: "1rem",
                borderRadius: "8px",
                boxShadow: "0 1px 4px rgba(0, 0, 0, 0.05)",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem"
              }}
            >
              <span style={{ fontSize: "1.1rem" }}>
                <strong>{tx.type === "income" ? "Ingreso" : "Gasto"}:</strong> ${tx.amount} | {tx.date} | {tx.category} | {tx.description}
              </span>
              <div style={{ display: "flex", gap: "1rem" }}>
                <button
                  onClick={() => handleEdit(tx)}
                  style={{
                    backgroundColor: "#0077b6",
                    color: "#fff",
                    border: "none",
                    padding: "0.5rem 1rem",
                    borderRadius: "6px",
                    cursor: "pointer"
                  }}
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(tx.id)}
                  style={{
                    backgroundColor: "#e63946",
                    color: "#fff",
                    border: "none",
                    padding: "0.5rem 1rem",
                    borderRadius: "6px",
                    cursor: "pointer"
                  }}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
