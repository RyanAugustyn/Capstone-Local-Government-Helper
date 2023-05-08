import React, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../App.css";

const AddMessage = () => {
  const [user, token] = useAuth();
  const { requestID } = useParams();
  const [text, setText] = useState("");
  const [isOfficial, setIsOfficial] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (user.position != null) {
      setIsOfficial(true);
    }
  }, [user.position]);
  async function handleSubmit(event) {
    event.preventDefault();
    let newMessage = {
      name: user.first_name,
      username: user.username,
      text: text,
      is_official: isOfficial,
      request_id: requestID,
      pinned: checked,
    };
    try {
      await axios.post("http://127.0.0.1:5000/api/messages", newMessage, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      alert("Thank you for commenting!");
    } catch (error) {
      console.log(error.response.data);
    }
  }

  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div className="messageContainer">
      <form onSubmit={handleSubmit}>
        <h3>Posting as {user.username}</h3>
        {isOfficial ? <p>Official Post</p> : <p></p>}
        <div className="form-group">
          <label htmlFor="textArea">Your Comment:</label>
          <input
            className="form-control"
            id="textArea"
            rows="3"
            name="text"
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your comment here"
          ></input>
        </div>
        {user.position != null && (
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="pinMessage"
              onChange={handleCheck}
            ></input>
            <label className="form-check-label" htmlFor="pinMessage">
              Click to pin message to top
            </label>
          </div>
        )}
        <button type="submit">Submit Comment</button>
      </form>
    </div>
  );
};

export default AddMessage;
