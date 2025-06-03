import { useState, useEffect } from "react";
import { db } from "../../firebaseConfig";
import {
  addDoc,
  collection,
  updateDoc,
  doc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useUser } from "../auth/UserContext";

export default function RegisterTransaction({ editData, onFinishEdit, setActiveSubSection }) {
  const user = useUser();

  const [form, setForm] = useState({
    amount: "",
    date: "",
    category: "",
    description: "",
    type: "expense",
  });

  useEffect(() => {
    if (editData) {
      setForm({
        amount: editData.amount,
        date: editData.date,
        category: editData.category,
        description: editData.description,
        type: editData.type,
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Debes iniciar sesión.");

    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) {
      return alert("Por favor, ingresa un monto válido (mayor a 0).");
    }

    if (!form.date) {
      return alert("Por favor, selecciona una fecha.");
    }

    if (!form.category || form.category.trim().length < 2) {
      return alert("Por favor, ingresa una categoría válida (mínimo 2 letras).");
    }

    try {
      if (!editData && form.type === "expense") {
        const alertsSnapshot = await getDocs(
          query(
            collection(db, "alerts"),
            where("userId", "==", user.uid),
            where("category", "==", form.category)
          )
        );

        if (!alertsSnapshot.empty) {
          const alertDoc = alertsSnapshot.docs[0];
          const limit = alertDoc.data().limit;

          const txsSnapshot = await getDocs(
            query(
              collection(db, "transactions"),
              where("userId", "==", user.uid),
              where("category", "==", form.category),
              where("type", "==", "expense")
            )
          );

          const totalGastado = txsSnapshot.docs.reduce(
            (acc, doc) => acc + Number(doc.data().amount),
            0
          );

          const nuevoTotal = totalGastado + Number(form.amount);

          if (nuevoTotal > limit) {
            alert(
              `⚠️ Has superado el límite de gasto para "${form.category}" ($${nuevoTotal} > $${limit})`
            );
          }
        }
      }

      if (editData) {
        const ref = doc(db, "transactions", editData.id);
        await updateDoc(ref, { ...form });
        alert("Transacción actualizada ✅");
        onFinishEdit();
      } else {
        await addDoc(collection(db, "transactions"), {
          ...form,
          userId: user.uid,
          createdAt: new Date(),
        });
        alert("Transacción registrada ✅");
        if (setActiveSubSection) {
          setActiveSubSection("view");
        }
      }

      setForm({
        amount: "",
        date: "",
        category: "",
        description: "",
        type: "expense",
      });
    } catch (e) {
      alert("Error: " + e.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={formStyle}
    >
      <h2 style={headingStyle}>
        {editData ? "Editar Transacción" : "Registrar Gasto / Ingreso"}
      </h2>

      <input
        name="amount"
        type="number"
        placeholder="Monto"
        value={form.amount}
        onChange={handleChange}
        required
        style={inputStyle}
      />

      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        required
        style={inputStyle}
      />

      <input
        name="category"
        type="text"
        placeholder="Categoría"
        value={form.category}
        onChange={handleChange}
        required
        style={inputStyle}
      />

      <input
        name="description"
        type="text"
        placeholder="Descripción"
        value={form.description}
        onChange={handleChange}
        style={inputStyle}
      />

      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        style={{ ...inputStyle, fontSize: "1.1rem" }}
      >
        <option value="expense">Gasto</option>
        <option value="income">Ingreso</option>
      </select>

      <button type="submit" style={submitButtonStyle}>
        {editData ? "Actualizar" : "Guardar"}
      </button>

      {editData && (
        <button
          onClick={() => {
            onFinishEdit();
            if (setActiveSubSection) {
              setActiveSubSection("view");
            }
          }}
          type="button"
          style={cancelButtonStyle}
        >
          Cancelar
        </button>
      )}
    </form>
  );
}

const formStyle = {
  maxWidth: "100%",
  margin: "3rem auto",
  backgroundColor: "#fff",
  padding: "3rem 1.5rem",
  borderRadius: "12px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  fontSize: "1.2rem"
};

const headingStyle = {
  textAlign: "center",
  fontSize: "2.2rem",
  marginBottom: "2rem",
  color: "#2c3e50"
};

const inputStyle = {
  width: "100%",
  padding: "0.9rem",
  marginBottom: "1.2rem",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "1.1rem"
};

const submitButtonStyle = {
  marginTop: "1rem",
  padding: "1rem",
  fontSize: "1.1rem",
  fontWeight: "bold",
  backgroundColor: "#90e1ef",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  width: "100%",
  cursor: "pointer"
};

const cancelButtonStyle = {
  marginTop: "0.8rem",
  padding: "0.9rem",
  fontSize: "1.1rem",
  backgroundColor: "#e63946",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  width: "100%",
  cursor: "pointer"
};
