//
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

function getTime() {
  let hours = new Date(Date.now()).getHours();
  let minutes = new Date(Date.now()).getMinutes();
  hours = -1 < hours && hours < 10 ? "0" + hours : "" + hours;
  minutes = -1 < minutes && minutes < 10 ? "0" + minutes : "" + minutes;
  return `${hours} : ${minutes}`;
}

const App = () => {
  const [username, setUserName] = useState("");
  const [chatActive, setChatActive] = useState("false");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    socket.on("received-message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages, socket]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const gmailUsernameNode = document.querySelector("#gmail-username");
    let usernameFinal = username;
    gmailUsernameNode === null
      ? (usernameFinal = username)
      : (usernameFinal = gmailUsernameNode.textContent);

    const messageData = {
      message: newMessage,
      user: usernameFinal,
      time: getTime(),
    };
    !newMessage == ""
      ? socket.emit("sent-message", messageData)
      : alert("message cannot be empty");
    setNewMessage("");
  };
  return (
    <>
      <div className="w-screen h-screen bg-gray-100 flex justify-center items-center">
        {!chatActive ? (
          <div className="rounded-md p-2 w-full md:w-[80vw] lg:w-[40vw]">
            <h1 className="text-center font-bold text-xl my-2 uppercase">
              Chat Room 1
            </h1>
            <div>
              <div className="overflow-scroll h-[80v] lg:h-[60vh]">
                {messages.map((message, index) => {
                  return (
                    <div
                      key={index}
                      className={`flex rounded-md shadow-md my-5 w-fit ${
                        username === message.user && "ml-auto"
                      }`}
                    >
                      <div className="bg-green-400 flex justify-center items-center round-l-md">
                        <h3 className="font-bold text-lg px-2">
                          {message.user.charAt(0).toUpperCase()}
                        </h3>
                      </div>
                      <div className="px-2 bg-white rounded-md">
                        <span className="text-sm">{message.user}</span>
                        <h3 className="font-bold">{message.message}</h3>
                        <h3 className="text-xs text-right">{message.time}</h3>
                      </div>
                    </div>
                  );
                })}
              </div>

              <form
                className="flex gap-2 md:gap-4 justify-between"
                onSubmit={handleSubmit}
              >
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="w-full rounded-md border-2 outline-none px-3 py-2"
                  value={newMessage}
                  onChange={(event) => setNewMessage(event.target.value)}
                ></input>
                <button
                  type="submit"
                  className="px-3 py-2 bg-green-500 text-white rounded-md font-bold"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div
            id="guest-login"
            className="w-screen h-screen flex justify-center items-center gap-2"
          >
            <label htmlFor="guest-login" className="font-bold ps-2">
              Guest Login
            </label>
            <input
              type="text"
              name=""
              id=""
              value={username}
              onChange={(event) => setUserName(event.target.value)}
              className="text-center px-3 py-2 outline-none border-2 rounded-md"
            ></input>
            <button
              type="submit"
              className="bg-green-500 text-white px-3 py-2 rounded-md font-bold"
              onClick={() => !username == "" && setChatActive(false)}
            >
              Start Chat
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
