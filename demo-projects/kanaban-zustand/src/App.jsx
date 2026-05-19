import "./App.css";
import Column from "./components/Column";
import { useStore } from "./store/store";
import { useEffect } from "react";
import { STATUSES } from "./constants";
import AlertModal from "./components/AlertModal";
import Header from "./components/Header";

function App() {
  const fetchTasks = useStore((store) => store.fetchTasks);
  const alert = useStore((store) => store.alert);
  const setAlert = useStore((store) => store.setAlert);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div>
      <Header />
      <div className="column-container">
        {STATUSES.map((status) => (
          <Column key={status} state={status} />
        ))}
        {alert.msg && (
          <AlertModal
            alert={alert}
            onClose={() => setAlert({ type: "", msg: "" })}
          />
        )}
      </div>
    </div>
  );
}

export default App;
