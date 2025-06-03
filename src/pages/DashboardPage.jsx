import { useState } from "react";
import { useUser } from "../features/auth/UserContext";
import RegisterTransaction from "../features/transactions/RegisterTransaction";
import TransactionList from "../features/transactions/TransactionList";
import SummaryChart from "../features/reports/SummaryChart";
import MonthlyChart from "../features/reports/MonthlyChart";
import BudgetAlert from "../features/alerts/BudgetAlert";
import Logout from "../features/auth/Logout";
import { Navigate } from "react-router-dom";

export default function DashboardPage() {
  const user = useUser();
  const [editData, setEditData] = useState(null);
  const [activeSection, setActiveSection] = useState("transacciones");
  const [activeSubSection, setActiveSubSection] = useState("intro");
  const [showDropdown, setShowDropdown] = useState(false);

  if (!user) return <Navigate to="/login" />;

  const handleFinishEdit = () => setEditData(null);

  const linkStyle = (active) => ({
    background: "none",
    border: "none",
    padding: "0.5rem 1rem",
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#333",
    textDecoration: active ? "underline" : "none",
    cursor: "pointer"
  });

  const dropdownStyle = {
    position: "absolute",
    top: "2.5rem",
    left: 0,
    backgroundColor: "#ffffff",
    borderRadius: "6px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    padding: "0.5rem 0",
    zIndex: 10,
    minWidth: "200px"
  };

  return (
    <div style={{ backgroundColor: "#f9f9fb", minHeight: "100vh" }}>
      <header style={{
        backgroundColor: "#a2d2ff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1.5rem 3rem",
        flexWrap: "wrap",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        position: "relative"
      }}>
        <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#333" }}>
          PlaniFi 💸
        </div>

        <nav style={{ display: "flex", gap: "2rem", justifyContent: "center", flex: 1, position: "relative" }}>
          <div
            style={{ position: "relative" }}
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <button
              style={linkStyle(activeSection === "transacciones")}
              onClick={() => setActiveSection("transacciones")}
            >
              Transacciones
            </button>

            {showDropdown && (
              <div style={dropdownStyle}>
                <button
                  style={linkStyle(activeSubSection === "intro")}
                  onClick={() => {
                    setActiveSection("transacciones");
                    setActiveSubSection("intro");
                    setShowDropdown(false);
                  }}
                >
                  Introducción
                </button>
                <button
                  style={linkStyle(activeSubSection === "add")}
                  onClick={() => {
                    setActiveSection("transacciones");
                    setActiveSubSection("add");
                    setShowDropdown(false);
                  }}
                >
                  Agregar transacción
                </button>
                <button
                  style={linkStyle(activeSubSection === "view")}
                  onClick={() => {
                    setActiveSection("transacciones");
                    setActiveSubSection("view");
                    setShowDropdown(false);
                  }}
                >
                  Visualizar transacciones
                </button>
              </div>
            )}
          </div>

          <button style={linkStyle(activeSection === "alertas")} onClick={() => setActiveSection("alertas")}>Alertas</button>
          <button style={linkStyle(activeSection === "graficas")} onClick={() => setActiveSection("graficas")}>Gráficas</button>
          <button style={linkStyle(activeSection === "acerca")} onClick={() => setActiveSection("acerca")}>Acerca de</button>
        </nav>

        <div style={{ marginLeft: "auto" }}>
          <Logout />
        </div>
      </header>

      <main style={{
        padding: "2rem 1rem",
        maxWidth: "1100px",
        margin: "0 auto",
        minHeight: "calc(100vh - 150px)"
      }}>
        {activeSection === "transacciones" && (
          <>
            {activeSubSection === "intro" && (
              <div style={{
                width: "100vw",
                marginLeft: "calc(-50vw + 50%)",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "6rem 8%",
                backgroundColor: "#f1f5f9",
                boxSizing: "border-box"
              }}>
                <div style={{ flex: 1, minWidth: "350px", paddingRight: "2rem" }}>
                  <h2 style={{
                    fontSize: "3.8rem",
                    marginBottom: "2.5rem",
                    color: "#1e293b",
                    lineHeight: "1.2"
                  }}>
                    ¿Qué son las transacciones?
                  </h2>

                  <p style={{
                    fontSize: "1.7rem",
                    color: "#475569",
                    marginBottom: "2.5rem",
                    lineHeight: "1.7"
                  }}>
                    Las transacciones son los registros de todos tus movimientos financieros. Aquí puedes registrar cada ingreso o gasto que realices para tener control total de tu economía.
                  </p>

                  <p style={{
                    fontWeight: "bold",
                    fontSize: "1.6rem",
                    color: "#334155",
                    marginBottom: "2rem"
                  }}>
                    Con <span style={{ color: "#0077b6" }}>PlaniFi</span> puedes:
                  </p>

                  <ul style={{
                    listStyle: "none",
                    padding: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.4rem"
                  }}>
                    <li style={bigItemStyle}>📌 Registrar ingresos y gastos con detalle</li>
                    <li style={bigItemStyle}>📊 Clasificarlos por categoría</li>
                    <li style={bigItemStyle}>📈 Visualizar reportes claros y útiles</li>
                    <li style={bigItemStyle}>🚫 Establecer límites para evitar excesos</li>
                  </ul>
                </div>

                <div style={{ flex: 1, minWidth: "350px", maxWidth: "700px" }}>
                  <img
                    src="https://img.freepik.com/vector-gratis/gestion-presupuesto-familiar-gastos-mensuales-ahorro-cuentas-ilustracion-concepto-contabilidad-personal_335657-1107.jpg"
                    alt="Transacciones"
                    style={{
                      width: "100%",
                      borderRadius: "14px",
                      boxShadow: "0 8px 30px rgba(0,0,0,0.08)"
                    }}
                  />
                </div>
              </div>
            )}
            {activeSubSection === "add" && (
              <RegisterTransaction
                editData={editData}
                onFinishEdit={handleFinishEdit}
                setActiveSubSection={setActiveSubSection}
              />
            )}
            {activeSubSection === "view" && (
              <TransactionList
                setEditData={setEditData}
                setActiveSubSection={setActiveSubSection}
              />
            )}
          </>
        )}
        {activeSection === "acerca" && (
          <div style={{
            width: "100vw",
            marginLeft: "calc(-50vw + 50%)",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "6rem 8%",
            backgroundColor: "#ffffff",
            boxSizing: "border-box",
            gap: "4rem"
          }}>
            <div style={{ flex: 1, minWidth: "350px", paddingRight: "2rem" }}>
              <h2 style={{
                fontSize: "3.8rem",
                marginBottom: "2.5rem",
                color: "#2c3e50",
                lineHeight: "1.2"
              }}>
                Sobre <span style={{ color: "#1e90ff" }}>PlaniFi 💸</span>
              </h2>

              <p style={{ fontSize: "1.7rem", marginBottom: "2rem", color: "#444" }}>
                <strong>🎯 Objetivo:</strong> Ayudar a los usuarios a organizar sus finanzas personales de forma clara, rápida y visual.
              </p>
              <p style={{ fontSize: "1.7rem", marginBottom: "2rem", color: "#444" }}>
                <strong>🛠️ Misión:</strong> Brindar herramientas intuitivas para controlar gastos e ingresos desde cualquier dispositivo, en cualquier momento.
              </p>
              <p style={{ fontSize: "1.7rem", marginBottom: "2rem", color: "#444" }}>
                <strong>🚀 Visión:</strong> Ser la app de confianza para mejorar el bienestar financiero de millones de familias en América Latina.
              </p>
            </div>

            <div style={{ flex: 1, minWidth: "350px", maxWidth: "700px" }}>
              <img
                src="https://img.freepik.com/vector-gratis/ilustracion-concepto-control-gastos_114360-7636.jpg"
                alt="Acerca de PlaniFi"
                style={{
                  width: "100%",
                  borderRadius: "14px",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.08)"
                }}
              />
            </div>
          </div>
        )}
        {activeSection === "alertas" && <BudgetAlert />}
        {activeSection === "graficas" && (
          <>
            <SummaryChart />
            <MonthlyChart />
          </>
        )}
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

const bigItemStyle = {
  fontSize: "1.5rem",
  padding: "1rem 1.5rem",
  backgroundColor: "#fff",
  borderRadius: "10px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  color: "#1f2937"
};
