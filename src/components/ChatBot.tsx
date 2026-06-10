import { useState } from "react";
import { Bot, Send, X, MessageCircle } from "lucide-react";

type Message = {
  role: "user" | "bot";
  text: string;
};

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Hi, I am your cybersecurity assistant. Ask me about hashing, SHA, bcrypt, MD5, or file integrity.",
    },
  ]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setLoading(true);

    try {
const response = await fetch("/api/chat", {        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: data.reply || data.error || "Sorry, I could not generate a response.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Server error. Please check your backend.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot">
      {open && (
        <div className="chatbot-panel">
          <div className="chatbot-header">
            <div>
              <Bot size={22} />
              <span>Security Assistant</span>
            </div>

            <button type="button" onClick={() => setOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.role}`}>
                {msg.text}
              </div>
            ))}

            {loading && <div className="chat-message bot">Thinking...</div>}
          </div>

          <div className="chatbot-input">
            <input
              value={input}
              placeholder="Ask about hashing..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
            />

            <button type="button" onClick={sendMessage}>
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      {!open && (
        <button
          type="button"
          className="chatbot-toggle"
          onClick={() => setOpen(true)}
          aria-label="Open chat assistant"
        >
          <MessageCircle size={26} />
        </button>
      )}
    </div>
  );
}