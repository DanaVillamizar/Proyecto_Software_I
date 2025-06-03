import Register from "./features/auth/Register";
import Login from "./features/auth/Login";
import Logout from "./features/auth/Logout";
import RegisterTransaction from "./features/transactions/RegisterTransaction";
import TransactionList from "./features/transactions/TransactionList";
import SummaryChart from "./features/reports/SummaryChart";
import { useUser } from "./features/auth/UserContext";

function App() {
  const user = useUser();

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Control de Gastos</h1>

      <section>
        <Register />
        <hr />
        <Login />
        <hr />
      </section>

      {user ? (
        <section>
          <p><strong>Sesión iniciada como:</strong> {user.email}</p>
          <RegisterTransaction />
          <SummaryChart />
          <TransactionList />
          <Logout />
        </section>
      ) : (
        <p style={{ color: "gray" }}>
          Inicia sesión para registrar y ver tus gastos.
        </p>
      )}
    </div>
  );
}

export default App;






