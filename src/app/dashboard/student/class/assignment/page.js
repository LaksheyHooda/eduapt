"use client";

import Image from "next/image";
import { db } from "@/config/config";
import { useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { Button } from "@nextui-org/react";

export default function Home() {
  // State for storing messages and the current input
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  // Handle input change
  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
  };

  // Handle sending a message
  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      setMessages([inputMessage, ...messages]); // Prepend new message to messages array
      setInputMessage(""); // Clear input field after sending
    }
  };

  async function wait() {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  // Trigger send message on pressing Enter
  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
      event.preventDefault(); // Prevent default to avoid any unwanted behavior like form submission
      wait().then(() => {
        let responseMsg = `The Treaty of Versailles had significant economic repercussions for Germany, contributing heavily to the instability that plagued the country`;
        setMessages([responseMsg, ...messages]);
      });
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="flex bg-bggreen items-center w-screen flex-col h-screen p-10 overflow-x-hidden">
      <h1 className="text-greentxtclr font-black text-3xl">
        Rise of Totalitarianism: Assignment 1
      </h1>
      <div className="flex w-full mt-8">
        <div className="flex flex-col w-1/2 space-y-4 mr-10 h-[85vh]">
          <div className="bg-white rounded-lg p-4 h-1/3 shadow-md">
            <h3 className="text-left text-xl font-bold text-greentxtclr">
              Question:
            </h3>
            <p className="text-left text-xl text-greentxtclr">
              Examine and discuss the role that economic instability played in
              facilitating the rise of totalitarian regimes in the early 20th
              century, particularly focusing on how economic challenges such as
              the Great Depression, hyperinflation, and widespread unemployment
              contributed to societal unrest and the subsequent consolidation of
              power by authoritarian leaders. Consider examples from various
              countries to illustrate how economic factors were exploited to
              gain political support and establish totalitarian governments.
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 h-2/3 shadow-md">
            <h3 className="text-left text-xl font-bold text-greentxtclr">
              Answer:
            </h3>
            <textarea
              className="w-full h-3/4 p-4 text-black resize-none border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-greentxtclr focus:border-transparent"
              placeholder="Type your answer here..."
            ></textarea>
            <div className="flex flex-row justify-between">
              <Button className="bg-greentxtclr text-white mt-4 flex hover:bg-green-950 transition-colors duration-300">
                Submit
              </Button>
              <h2 className="text-greentxtclr text-2xl mt-4 font-black flex">
                2 Attempts Remaining
              </h2>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 w-1/2 shadow-md">
          <h2 className="text-greentxtclr text-2xl font-black">Resources: </h2>
          <div className="flex flex-col h-full">
            <div className="h-[40vh] overflow-y-auto">
              <p className="text-left">
                The early 20th century was marked by unprecedented turmoil and
                change. After World War I, many European nations experienced
                economic instability, with inflation and unemployment rates
                soaring. The Treaty of Versailles also caused widespread
                political dissatisfaction, especially in Germany, where many
                citizens felt humiliated and burdened by reparations. Social
                upheaval accompanied these economic and political crises,
                leading to widespread disillusionment with existing democratic
                governments. These conditions made charismatic leaders who
                promised quick and radical solutions to these crises,
                particularly through totalitarian means, very appealing to many.
                Totalitarian leaders like Adolf Hitler, Benito Mussolini, and
                Joseph Stalin capitalized on these sentiments to establish
                regimes that centralized power under a single authority and
                suppressed opposition through propaganda, censorship, and
                state-controlled violence.
              </p>
            </div>
            <div className="h-[38vh] border-black border-2 rounded-md p-4">
              <h3 className="text-greentxtclr text-xl font-bold">Chat:</h3>
              <div className="flex flex-col-reverse overflow-y-auto h-[27vh]">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className="min-h-[20px] w-auto max-w-full bg-gray-200 rounded p-2 m-2"
                  >
                    <p>{msg}</p>
                  </div>
                ))}
              </div>
              <input
                type="text"
                placeholder="Type your message here..."
                className="border-2 w-[44vw] border-gray-300 rounded-lg p-2 mt-2 focus:outline-none focus:border-greentxtclr"
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                value={inputMessage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
