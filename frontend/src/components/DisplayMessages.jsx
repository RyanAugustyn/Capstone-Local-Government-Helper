import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const DisplayMessages = () => {
  const [messages, setMessages] = useState([]);
  const [pinnedMessages, setPinnedMessages] = useState([]);
  const { requestID } = useParams();

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/messages");
        const filteredData = response.data.filter(
          (message) => message.request_id == requestID
        );
        const getPinnedMessages = filteredData.filter(
          (message) => message.pinned
        ); //check if pinned is true or false/null
        setPinnedMessages(getPinnedMessages);
        setMessages(filteredData);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    getMessages();
  }, [requestID]);

  //isofficial, text, username
  return (
    <div className="displayMessagesContainer">
      {/* Pinned messages */}
      {pinnedMessages.map((message, index) => (
        <div className="card" key={index}>
          <div className="card-body">
            <h5 className="card-title">{message.username}</h5>
            {message.is_official == false ? (
              <h6 className="card-subtitle mb-2 text-muted">
                Concerned Citizen
              </h6>
            ) : (
              <h6 className="card-subtitle mb-2 text-muted">Local Official</h6>
            )}
            <p className="card-text">{message.text}</p>
          </div>
        </div>
      ))}
      {/* All other messages */}
      {messages.map((message, index) => (
        <div className="card" key={index}>
          <div className="card-body">
            <h5 className="card-title">{message.username}</h5>
            {message.is_official == false ? (
              <h6 className="card-subtitle mb-2 text-muted">
                Concerned Citizen
              </h6>
            ) : (
              <h6 className="card-subtitle mb-2 text-muted">Local Official</h6>
            )}
            <p className="card-text">{message.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayMessages;
