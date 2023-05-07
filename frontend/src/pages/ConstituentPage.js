import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const ConstituentPage = () => {
  const { userID } = useParams();

  const [user, token] = useAuth();
  const [constituent, setConstituent] = useState({});
  const [blocked, setBlocked] = useState(false);

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
      } catch (error) {
        console.log(error.response.data);
      }
    };
    getConstituent();
    console.log("constitunet: ", constituent);
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
    <div className="page_container">
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

        <button type="submit" onClick={handleSubmit}>
          Block Constituent
        </button>
      </div>
    </div>
  );
};
export default ConstituentPage;
