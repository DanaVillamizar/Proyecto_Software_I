import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useUser } from "../auth/UserContext";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function SummaryChart() {
  const user = useUser();
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "transactions"),
      where("userId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let incomeTotal = 0;
      let expenseTotal = 0;

      snapshot.docs.forEach((doc) => {
        const tx = doc.data();
        const amount = Number(tx.amount);

        if (tx.type === "income") {
          incomeTotal += amount;
        } else {
          expenseTotal += amount;
        }
      });

      setIncome(incomeTotal);
      setExpense(expenseTotal);
    });

    return () => unsubscribe();
  }, [user]);

  const data = {
    labels: ["Ingresos", "Gastos"],
    datasets: [
      {
        label: "Resumen financiero",
        data: [income, expense],
        backgroundColor: ["#4caf50", "#f44336"],
        borderRadius: 8,
        barThickness: 60,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 16,
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          font: {
            size: 14,
          },
        },
      },
      x: {
        ticks: {
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div
      style={{
        backgroundColor: "#fff",
        padding: "2rem",
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        marginBottom: "2rem",
        height: "400px",
      }}
    >
      <h2
        style={{
          fontSize: "2rem",
          marginBottom: "1rem",
          textAlign: "center",
          color: "#2c3e50",
        }}
      >
        Resumen: Ingresos vs Gastos
      </h2>
      <Bar data={data} options={options} />
    </div>
  );
}
