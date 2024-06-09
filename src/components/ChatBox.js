import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Adjust import path

const ChatBox = () => {
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newChatHistory = [
      ...chatHistory,
      { user: "student", message: input },
    ];
    setChatHistory(newChatHistory);
    setInput("");

    const response = await ChatGPT.ask(input);
    setChatHistory([...newChatHistory, { user: "chatgpt", message: response }]);
  };

  return (
    <div className="fixed bottom-0 right-0 m-4 w-1/3 bg-white shadow-lg rounded-lg">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">Ask ChatGPT</h2>
      </div>
      <div className="p-4 overflow-y-auto max-h-64">
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={`mb-2 ${
              chat.user === "student" ? "text-right" : "text-left"
            }`}
          >
            <p
              className={`inline-block p-2 rounded ${
                chat.user === "student"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {chat.message}
            </p>
          </div>
        ))}
      </div>
      <div className="p-4 border-t flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow p-2 border rounded-l-lg"
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white p-2 rounded-r-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
