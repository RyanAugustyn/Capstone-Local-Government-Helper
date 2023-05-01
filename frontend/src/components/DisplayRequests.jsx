import React, { useState, useEffect } from "react";
import axios from "axios";

const DisplayRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const getRequests = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:5000/api/requests");
        setRequests(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    getRequests();
  }, []);

  return (
    <div>
      <h2>Current Requests</h2>
      {requests.map((request, index) => (
        <div key={index}>
          <h2> Request: {request.type}</h2>
          <p>Official in Charge: {request.assigned_to}</p>
          <p>Status: {request.progress}</p>
        </div>
      ))}
    </div>
  );
};

export default DisplayRequests;
