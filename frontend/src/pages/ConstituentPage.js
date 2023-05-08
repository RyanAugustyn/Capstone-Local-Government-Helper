import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import "../App.css";

const ConstituentPage = () => {
  const { userID } = useParams();

  const [user, token] = useAuth();
  const [constituent, setConstituent] = useState({});
  const [blocked, setBlocked] = useState(false);
  const [userMessages, setUserMessages] = useState([]);
  const [userRequests, setUserRequests] = useState([]);

  const getMessages = async (constituent) => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/messages");
      let filteredData = response.data.filter((message) => {
        return message.username == constituent.username;
      });

      setUserMessages(filteredData);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  const getRequests = async (constituent) => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/requests");
      let filteredData = response.data.filter((request) => {
        return request.requester == constituent.id;
      });

      setUserRequests(filteredData);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  //get user info and set blocked status
  useEffect(() => {
    const getConstituent = async () => {
      try {
        let response = await axios.get(
          `http://127.0.0.1:5000/api/users/${userID}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setConstituent(response.data);
        setBlocked(response.data.blocked);
        getRequests(response.data);
        getMessages(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    getConstituent();
  }, []);

  //handle click of block button
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      let blockedStatus = {};
      if (blocked == false) {
        blockedStatus = {
          blocked: true,
        };
      } else {
        blockedStatus = {
          blocked: false,
        };
      }
      await axios.put(
        `http://127.0.0.1:5000/api/users/${userID}`,
        blockedStatus,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setBlocked(!blocked);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  return (
    <div className="constituentPageContainer">
      <h1>Constituent Details Page</h1>
      <div className="card">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            Full name: {constituent.first_name} {constituent.last_name}
          </li>
          <li className="list-group-item">Username: {constituent.username}</li>
          <li className="list-group-item">Email: {constituent.email}</li>
          <li className="list-group-item">Phone: {constituent.phone}</li>
          <li className="list-group-item">
            Street Address: {constituent.street_address}
          </li>
          <li className="list-group-item">City: {constituent.city}</li>
          <li className="list-group-item">Zip: {constituent.zip}</li>
          <li className="list-group-item">
            Blocked status:{" "}
            {blocked ? <h4>BLOCKED</h4> : <p>In good standing</p>}
          </li>
        </ul>

        <button type="submit" onClick={handleSubmit} className="blockButton">
          Block Constituent
        </button>
      </div>
      <h2>User Requests</h2>
      {userRequests.map((request, index) => (
        <Link className="requestLink" to={`/requests/${request.id}`}>
          <div className="card" key={index}>
            <div className="card-body">
              <h5 className="card-title">{request.description}</h5>
              <p className="card-text">{request.type}</p>
            </div>
          </div>
        </Link>
      ))}
      <h2>User Messages</h2>
      {userMessages.map((message, index) => (
        <div className="card" key={index}>
          <div className="card-body">
            <h5 className="card-title">{message.username}</h5>
            <p className="card-text">{message.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ConstituentPage;
