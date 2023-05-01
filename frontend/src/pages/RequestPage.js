import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import useAuth from "../hooks/useAuth";

const RequestPage = () => {
  const { requestID } = useParams();
  const [user, token] = useAuth();
  const [request, setRequest] = useState({
    requester: "it me",
    longitude: -89.445,
    latitude: 45.0,
    seen: false,
    progress: 0,
    user_id: 5,
    user: {
      phone: 55555,
      last_name: "test4",
      first_name: "test4",
      street_address: "test4",
      zip: 55555,
      email: "test4@test4.com",
      city: "test4",
      id: 5,
      position: null,
      blocked: false,
      username: "test4",
    },
    id: 4,
    description: "ITS HUGE",
    type: "pothole",
    assigned_to: null,
  });
  const [progress, setProgress] = useState(0);
  const [votes, setVotes] = useState(0);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const getRequest = async () => {
      try {
        console.log(requestID);
        let response = await axios.get(
          `http://127.0.0.1:5000/api/requests/${requestID}`
        );
        console.log(response.data);
        setRequest(response.data);
        setProgress(response.data.progress);
        setVotes(response.data.votes);
        setSeen(response.data.seen);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    getRequest();
  }, []);

  return (
    <div className="page_container">
      <h2> Request Page for number: {request.id}</h2>
      <h3>Request: {request.type}</h3>
      <p>Progress: {progress}</p>
      <p>Votes: {votes}</p>
      <p>Seen: {seen}</p>
    </div>
  );
};

export default RequestPage;

// including type, progress (if any), whether a local official has seen the request,
//  number of people who have voted on issue, messages associated with the issue,
//   and map with pin showing where the issue is located (Google Maps API)
