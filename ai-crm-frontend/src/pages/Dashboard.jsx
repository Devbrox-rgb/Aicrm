import { useState } from "react";
import Chat from "../components/Chat";
import InteractionForm from "../components/InteractionForm";

const Dashboard = () => {
  const [interaction, setInteraction] = useState({
    hcp_name: "",
    interaction_type: "",
    date: "",
    time: "",
    attendees: "",
    topics: "",
    materials: "",
    sentiment: "",
    follow_up: "",
  });

  return (
    <div style={styles.container}>
      {/* LEFT */}
      <div style={styles.left}>
        <InteractionForm data={interaction} />
      </div>

      {/* RIGHT */}
      <div style={styles.right}>
        <Chat setInteraction={setInteraction} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    padding: "16px",
    gap: "16px",
    background: "#0f172a",
  },
  left: {
    width: "60%",
    background: "#111827",
    borderRadius: "12px",
    padding: "20px",
    overflowY: "auto",
    boxShadow: "0 0 0 1px #1f2937",
  },
  right: {
    width: "40%",
    background: "#f8fafc",
    borderRadius: "12px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
  },
};

export default Dashboard;