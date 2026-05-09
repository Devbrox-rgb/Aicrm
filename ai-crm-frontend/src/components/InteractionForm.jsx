const Field = ({ label, value }) => (
  <div style={{ marginBottom: "16px", flex: 1 }}>
    <label style={styles.label}>{label}</label>
    <input value={value || ""} disabled style={styles.input} />
  </div>
);

const InteractionForm = ({ data }) => {
  return (
    <div>
      <h2 style={styles.title}>Log HCP Interaction</h2>

      <div style={styles.row}>
        <Field label="HCP Name" value={data.hcp_name} />
        <Field label="Interaction Type" value={data.interaction_type} />
      </div>

      <div style={styles.row}>
        <Field label="Date" value={data.date} />
        <Field label="Time" value={data.time} />
      </div>

      <Field label="Attendees" value={data.attendees} />

      <div>
        <label style={styles.label}>Topics Discussed</label>
        <textarea value={data.topics || ""} disabled style={styles.textarea} />
      </div>

      <Field label="Materials Shared" value={data.materials} />
      <Field label="Sentiment" value={data.sentiment} />

      <div>
        <label style={styles.label}>Follow Up</label>
        <textarea value={data.follow_up || ""} disabled style={styles.textarea} />
      </div>
    </div>
  );
};

const styles = {
  title: {
    fontSize: "20px",
    marginBottom: "20px",
    color: "#f1f5f9",
  },
  row: {
    display: "flex",
    gap: "12px",
  },
  label: {
    display: "block",
    marginBottom: "6px",
    fontSize: "13px",
    color: "#94a3b8",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #1f2937",
    background: "#020617",
    color: "#e2e8f0",
  },
  textarea: {
    width: "100%",
    height: "90px",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #1f2937",
    background: "#020617",
    color: "#e2e8f0",
    marginBottom: "16px",
  },
};

export default InteractionForm;