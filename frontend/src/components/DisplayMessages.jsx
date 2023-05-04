import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const DisplayMessages = () => {
  const [messages, setMessages] = useState([]);
  const { requestID } = useParams();

  useEffect(() => {
    const getMessages = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:5000/api/messages");
        let filteredData = response.data.filter(
          (message) => message.request_id == requestID
        );
        console.log(filteredData);
        setMessages(filteredData);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    getMessages();
  }, []);

  //isofficial, text, username
  return (
    <div className="displayMessagesContainer">
      {messages.map((message, index) => (
        <div class="card" key={index}>
          <div class="card-body">
            <h5 class="card-title">{message.username}</h5>
            {message.is_official == null ? (
              <h6 class="card-subtitle mb-2 text-muted">Concerned Citizen</h6>
            ) : (
              <h6 class="card-subtitle mb-2 text-muted">Local Official</h6>
            )}
            <p class="card-text">{message.text}</p>
            <a href="#" class="card-link">
              Card link
            </a>
            <a href="#" class="card-link">
              Another link
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayMessages;
