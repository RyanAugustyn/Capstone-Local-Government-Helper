import React, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { useParams } from "react-router-dom";

const AddMessage = () => {
  const [user, token] = useAuth();
  const { requestID } = useParams();
  const [text, setText] = useState("");
  const [isOfficial, setIsOfficial] = useState(false);

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
    };
    console.log(newMessage);
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
  return (
    <div className="messageContainer">
      <form onSubmit={handleSubmit}>
        <h3>Posting as {user.username}</h3>
        {isOfficial ? <p>Official Post</p> : <p></p>}
        <div className="form-group">
          <label htmlFor="textArea">Leave your comment here:</label>
          <input
            className="form-control"
            id="textArea"
            rows="3"
            name="text"
            onChange={(e) => setText(e.target.value)}
            placeholder="Leave your comment here..."
          ></input>
        </div>
        <button type="submit">Submit Comment</button>
      </form>
    </div>
  );
};

export default AddMessage;
