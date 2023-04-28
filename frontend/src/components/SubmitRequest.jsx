import React, { useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { Dropdown, DropdownButton } from "react-bootstrap";

const SubmitRequest = (props) => {
  const [user, token] = useAuth();
  const [type, setType] = useState("Issue type?");
  const [description, setDescription] = useState("");
  const [requester, setRequester] = useState("");

  //axios get individual user for requester field

  const handleSelect = (e) => {
    console.log(e);
    setType(e);
  };
  async function handleSubmit(event) {
    event.preventDefault();
    let newRequest = {
      type: type,
      description: description,
      latitude: props.lat,
      longitude: props.lng,
      requester: user.username,
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
      <form className="form-control" onSubmit={handleSubmit}>
        <h1>Send us a Request!</h1>
        <DropdownButton
          class="btn btn-outline-secondary dropdown-toggle"
          title={type}
          data-bs-toggle="dropdown"
          onSelect={(e) => {
            setType(e);
          }}
        >
          <Dropdown.Item eventKey="Pothole">Pothole</Dropdown.Item>
          <Dropdown.Item eventKey="Animal Control">
            Animal Control
          </Dropdown.Item>
          <Dropdown.Item eventKey="Power Line">Power Line</Dropdown.Item>
        </DropdownButton>
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
