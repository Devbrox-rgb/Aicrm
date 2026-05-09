import { useState } from "react";

const Chat = ({ setInteraction }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    setMessages((prev) => [
      ...prev,
      { role: "assistant", text: "⏳ Processing..." },
    ]);

    try {
      const res = await fetch("http://127.0.0.1:8000/interaction/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      console.log("API RESPONSE:", data);

      setInteraction((prev) => ({
        ...prev,
        hcp_name: data.hcp_name || prev.hcp_name,
        topics: data.summary || prev.topics,
        sentiment: data.sentiment || prev.sentiment,
        follow_up: data.follow_up || prev.follow_up,
        date: data.date || prev.date,
        time: data.time || prev.time,
      }));

      const botMsg = {
        role: "assistant",
        text: `✔ Updated: ${data.hcp_name || "—"} | ${
          data.sentiment || "—"
        }`,
      };

      setMessages((prev) => [...prev.slice(0, -1), botMsg]); // remove "Processing"
      setInput("");
    } catch (err) {
      console.error("API Error:", err);

      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "assistant", text: "❌ Backend error" },
      ]);
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>🤖 AI Assistant</h3>

      <div style={styles.info}>
        Describe interaction — AI will auto-fill the form.
      </div>

      <div style={styles.chat}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={msg.role === "user" ? styles.user : styles.bot}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div style={styles.inputBox}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type interaction..."
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.button}>
          Log
        </button>
      </div>
    </div>
  );
};

export default Chat;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  title: {
    marginBottom: "10px",
    color: "#0f172a",
  },
  info: {
    background: "#e0f2fe",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "10px",
    fontSize: "14px",
  },
  chat: {
    flex: 1,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "10px",
  },
  user: {
    alignSelf: "flex-end",
    background: "#2563eb",
    color: "white",
    padding: "10px",
    borderRadius: "12px",
    maxWidth: "70%",
  },
 bot: {
  alignSelf: "flex-start",
  background: "#0ea5e9",   
  color: "white",          
  padding: "10px",
  borderRadius: "12px",
  maxWidth: "70%",

  },
  inputBox: {
    display: "flex",
    gap: "8px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 16px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};