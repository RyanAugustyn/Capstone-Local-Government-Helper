import React, { useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { Dropdown, DropdownButton } from "react-bootstrap";
import "../App.css";

const SubmitRequest = (props) => {
  const [user, token] = useAuth();
  const [type, setType] = useState("Issue type?");
  const [description, setDescription] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    let newRequest = {
      type: type,
      description: description,
      latitude: props.lat,
      longitude: props.lng,
      requester: user.id,
    };
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
    <div className="submitRequestContainer">
      <form className="form-control" onSubmit={handleSubmit}>
        <h1 className="submitFormTitle">Send us a Request!</h1>
        <ol className="submitRequestInstructions">
          <li>Click on the map showing where the issue is</li>
          <li>Choose the type of issue</li>
          <li>Write a brief description of the issue</li>
          <li>And submit!</li>
        </ol>

        <Dropdown
          onSelect={(e) => {
            setType(e);
          }}
          className="w-auto"
        >
          <Dropdown.Toggle variant="success" id="typeDropdown" title={type}>
            {type}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item eventKey="Pothole">Pothole</Dropdown.Item>
            <Dropdown.Item eventKey="Animal Control">
              Animal Control
            </Dropdown.Item>
            <Dropdown.Item eventKey="Power Line">Power Line</Dropdown.Item>
            <Dropdown.Item eventKey="Damaged Sign">Damaged Sign</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <div className="input-group mb-3 submitBox">
          <input
            name="description"
            onChange={(e) => setDescription(e.target.value)}
            className="submitDescriptionInput"
            placeholder="Describe your issue here..."
          />
        </div>
        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
};

export default SubmitRequest;
