import React, { useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import "bootstrap/dist/css/bootstrap.css";

const SubmitRequest = () => {
  const [user, token] = useAuth();
  const [type, setType] = useState("pothole");
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [requester, setRequester] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    let newRequest = {
      type: type,
      description: description,
      latitude: latitude,
      longitude: longitude,
      requester: requester,
      //don't need 'requester' if have token tying to user
    };

    console.log(newRequest);
    try {
      let response = await axios.post(
        "http://127.0.0.1:5000/api/requests",
        newRequest,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      alert("Thank you for submitting!");
    } catch (error) {
      console.log(error.response.data);
    }
  }

  return (
    <div>
      <a
        className="btn btn-primary"
        data-bs-toggle="collapse"
        href="#collapseExample"
        role="button"
        aria-expanded="false"
        aria-controls="collapseExample"
      >
        Bootstrap button
      </a>
      <form onSubmit={handleSubmit}>
        <h1>Send us a Request!</h1>
        {/* test */}
        <div className="input-group mb-3">
          <div class="input-group-prepend">
            <button
              class="btn btn-outline-secondary dropdown-toggle"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              onChange={(e) => setType(e.target.value)}
            >
              Choose Issue Type
            </button>
            <div className="dropdown-menu">
              <a className="dropdown-item" href="#">
                Pothole
              </a>
              <a className="dropdown-item" href="#">
                Animal Control
              </a>
              <a className="dropdown-item" href="#">
                Power Line
              </a>
            </div>
          </div>
        </div>
        {/* end test */}
        <label>Description</label>
        <input
          name="description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Latitude</label>
        <input name="latitude" onChange={(e) => setLatitude(e.target.value)} />
        <label>Longitude</label>
        <input
          name="longitude"
          onChange={(e) => setLongitude(e.target.value)}
        />
        <label>Requester</label>
        <input
          name="requester"
          onChange={(e) => setRequester(e.target.value)}
        />
        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
};

export default SubmitRequest;
