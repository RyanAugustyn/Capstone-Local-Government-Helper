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
    <div>
      <form className="form-control" onSubmit={handleSubmit}>
        <h1>Send us a Request!</h1>

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
        <div className="input-group mb-3">
          <label>Description</label>
          <input
            name="description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
};

export default SubmitRequest;
