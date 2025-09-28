import { useState } from "react";
import confetti from "canvas-confetti";

const styles = {
  page: {
    minHeight: "100dvh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:
      "linear-gradient(180deg, #e8f5e9 0%, #f1f8e9 40%, #e3f2fd 100%)",
    fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
    color: "#1b5e20",
    padding: "24px",
  },
  card: {
    background: "#ffffffcc",
    borderRadius: "24px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    maxWidth: 640,
    width: "100%",
    padding: "32px",
    backdropFilter: "blur(6px)",
  },
  heading: { fontSize: 36, margin: 0, lineHeight: 1.1, color: "#2e7d32" },
  sub: { marginTop: 8, fontSize: 16, color: "#2e7d32" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 16,
    marginTop: 24,
  },
  btn: {
    border: "none",
    borderRadius: 16,
    padding: "18px 16px",
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer",
    background: "#a5d6a7",
    color: "#1b5e20",
    transition: "transform 120ms ease, box-shadow 120ms ease",
  },
  btnHover: {
    transform: "translateY(-2px)",
    boxShadow: "0 8px 20px rgba(46,125,50,0.25)",
  },
  note: { marginTop: 16, fontSize: 14, opacity: 0.85 },
  footer: { marginTop: 20, fontSize: 12, opacity: 0.7 },
};

const pretty = {
  Breakfast: {
    title: "Breakfast",
    emoji: "🥐",
    hint: "Fresh start vibes",
  },
  Lunch: {
    title: "Lunch",
    emoji: "🥗",
    hint: "Midday energy boost",
  },
  Dinner: {
    title: "Dinner",
    emoji: "🍝",
    hint: "Evening celebration",
  },
};

export default function App() {
  const [hover, setHover] = useState("");
  const [status, setStatus] = useState(null);

  const sendChoice = async (meal) => {
    setStatus("Sending your gift…");
    try {
      // Trigger confetti immediately for delight ✨
      confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });

      const res = await fetch("/api/send-sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ meal }),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Failed to send");
      }

      setStatus("Gift sent! Check your phone 💚");
    } catch (err) {
      setStatus(`Oops: ${err.message}`);
    }
  };

  return (
    <div style={styles.page}>
      <svg
        aria-hidden
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        <defs>
          <pattern id="leaves" width="120" height="120" patternUnits="userSpaceOnUse">
            <path d="M60 10c15 20-15 35 0 55c-15-20 15-35 0-55z" fill="#a5d6a760" />
            <circle cx="90" cy="40" r="6" fill="#81c78470" />
            <circle cx="30" cy="80" r="5" fill="#aed58160" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#leaves)" />
      </svg>

      <div style={styles.card}>
        <h1 style={styles.heading}>Happy Birthday Mikaila! 🌿</h1>
        <p style={styles.sub}>Pick one and I’ll text you a $50 gift right away.</p>

        <div style={styles.grid}>
          {Object.keys(pretty).map((k) => (
            <button
              key={k}
              onMouseEnter={() => setHover(k)}
              onMouseLeave={() => setHover("")}
              onClick={() => sendChoice(k)}
              style={{
                ...styles.btn,
                ...(hover === k ? styles.btnHover : {}),
              }}
            >
              <div style={{ fontSize: 28 }}>{pretty[k].emoji}</div>
              <div style={{ fontSize: 18, marginTop: 6 }}>{pretty[k].title}</div>
              <div style={{ fontSize: 12, opacity: 0.8, marginTop: 4 }}>{pretty[k].hint}</div>
            </button>
          ))}
        </div>

        {status && <p style={styles.note}>{status}</p>}
        <p style={styles.footer}>Made with 💚 and sunshine.</p>
      </div>
    </div>
  );
}
