import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { db } from "../../firebaseConfig";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useUser } from "../auth/UserContext";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const monthNames = [
  "Ene", "Feb", "Mar", "Abr", "May", "Jun",
  "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
];

export default function MonthlyChart() {
  const user = useUser();
  const [data, setData] = useState({});

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "transactions"),
      where("userId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const monthly = Array(12).fill(0);
      const monthlyIncome = Array(12).fill(0);

      snapshot.docs.forEach((doc) => {
        const tx = doc.data();
        const date = new Date(tx.date);
        const month = date.getMonth();
        const amount = Number(tx.amount);

        if (tx.type === "expense") {
          monthly[month] += amount;
        } else if (tx.type === "income") {
          monthlyIncome[month] += amount;
        }
      });

      setData({
        labels: monthNames,
        datasets: [
          {
            label: "Gastos",
            data: monthly,
            backgroundColor: "#f44336",
          },
          {
            label: "Ingresos",
            data: monthlyIncome,
            backgroundColor: "#4caf50",
          },
        ],
      });
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <div style={{
      width: "100vw",
      marginLeft: "calc(-50vw + 50%)",
      backgroundColor: "#fff",
      padding: "4rem 2rem",
      boxSizing: "border-box",
      borderRadius: "12px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
    }}>
      <h2 style={{
        textAlign: "center",
        fontSize: "2.8rem",
        marginBottom: "2rem",
        color: "#1f2937"
      }}>
        Ingresos y Gastos Mensuales
      </h2>

      <div style={{ height: "480px", width: "100%", maxWidth: "1200px", margin: "0 auto" }}>
        {data.labels ? (
          <Bar data={data} options={chartOptions} />
        ) : (
          <p style={{ textAlign: "center", fontSize: "1.2rem", color: "#666" }}>Cargando gráfico...</p>
        )}
      </div>
    </div>
  );
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      labels: {
        font: {
          size: 18
        }
      }
    },
    tooltip: {
      mode: "index",
      intersect: false
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        font: {
          size: 14
        }
      }
    },
    x: {
      ticks: {
        font: {
          size: 14
        }
      }
    }
  }
};
