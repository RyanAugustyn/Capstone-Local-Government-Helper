import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

const RequestPage = () => {
  const { requestID } = useParams();
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

  useEffect(() => {
    const getRequest = async () => {
      try {
        console.log(requestID);
        let response = await axios.get(
          `http://127.0.0.1:5000/api/requests/${requestID}`
        );
        console.log(response.data);
        setRequest(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    getRequest();
  }, [requestID]);

  return (
    <div className="page_container">
      <h2> Request Page for number: {request.id}</h2>
      <h3>Request: {request.type}</h3>
    </div>
  );
};

export default RequestPage;
