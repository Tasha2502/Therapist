import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";

function Bot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:4002/bot/v1/message", {
        text: input,
      });

      if (res.status === 200) {
        setMessages((prev) => [
          ...prev,
          { text: res.data.userMessage, sender: "user" },
          { text: res.data.botMessage, sender: "bot" },
        ]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setInput("");
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#e8f3ef] via-[#cfe8dd] to-[#1f3d2b] text-[#1f2f2a]">

      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-[#e8f3ef]/80 backdrop-blur border-b border-[#b7d6c8] z-10">
        <div className="max-w-5xl mx-auto flex justify-between items-center px-6 py-4">
          <div>
            <h1 className="text-lg font-medium text-[#2f6b4f]">
              🌿 Madhav 7.0
            </h1>
            <p className="text-xs text-[#4f7f68]">
              A calm space inspired by nature
            </p>
          </div>
          <FaUserCircle size={28} className="text-[#4f7f68]" />
        </div>
      </header>

      {/* Chat */}
      <main className="flex-1 overflow-y-auto pt-24 pb-28">
        <div className="max-w-4xl mx-auto px-4 flex flex-col space-y-4">

          {messages.length === 0 && (
            <div className="text-center mt-20 space-y-3 text-[#3f6f5a]">
              <p className="text-lg font-light">
                Take a deep breath.
              </p>
              <p className="text-sm">
                Imagine mountains, flowing rivers, and quiet greenery.
              </p>
              <p className="text-sm">
                You can share anything here 🌱
              </p>
            </div>
          )}

          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`px-5 py-3 rounded-3xl max-w-[75%] leading-relaxed shadow-sm ${
                msg.sender === "user"
                  ? "bg-[#cfe8dd] text-[#1f3d2b] self-end"
                  : "bg-[#f1faf6] text-[#1f2f2a] self-start border border-[#d6ede3]"
              }`}
            >
              {msg.text}
            </div>
          ))}

          {loading && (
            <div className="bg-[#f1faf6] px-5 py-3 rounded-3xl max-w-[60%] text-[#4f7f68] border border-[#d6ede3]">
              Listening quietly… 🌊
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input */}
      <footer className="fixed bottom-0 left-0 w-full bg-[#1f3d2b] border-t border-[#355f4a]">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex bg-[#264c38] rounded-full px-5 py-3">
            <input
              type="text"
              className="flex-1 bg-transparent outline-none text-[#eaf6f0] placeholder-[#b7d6c8]"
              placeholder="Share your thoughts gently..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button
              onClick={handleSendMessage}
              className="ml-4 text-[#9fd6b8] hover:text-[#c9f2dc] transition"
            >
              Send
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Bot;