import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../App.css";
import Card from "react-bootstrap/Card";

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
      <div className="requestsContainer">
        {requests.map((request, index) => (
          // editing here
          <Card key={index} className="displayRequestsCard">
            <Link className="requestLink" to={`/requests/${request.id}`}>
              <Card.Body>
                <Card.Title>{request.type}</Card.Title>
                {/* <Card.Subtitle className="mb-2 text-muted"> more here </Card.Subtitle> */}
                <Card.Text>{request.description}</Card.Text>
              </Card.Body>
            </Link>
          </Card>
          //end edit
        ))}
      </div>
    </div>
  );
};

export default DisplayRequests;

{
  /* <div key={index}>
            <Link className="requestLink" to={`/requests/${request.id}`}>
              <h2> Request: {request.type}</h2>
              <p>Description: {request.description}</p>
              <p>Official in Charge: {request.assigned_to}</p>
              <p>Status: {request.progress}</p>
              {request.seen && <p>Seen by Local Official</p>}
            </Link>
          </div> */
}
