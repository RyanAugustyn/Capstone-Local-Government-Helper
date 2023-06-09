import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import AddMessage from "../components/Message";
import DisplayMessages from "../components/DisplayMessages";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import DisplayRequesterInfo from "../components/DisplayRequesterInfo";
import "../App.css";

const RequestPage = () => {
  const { requestID } = useParams();
  const [user, token] = useAuth();
  const [request, setRequest] = useState({});
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState(0);
  const [votes, setVotes] = useState(0);
  const [seen, setSeen] = useState();
  const [liked, setLiked] = useState();
  const [requester, setRequester] = useState({});
  const [marker, setMarker] = useState({ lat: 45, lng: -89 });

  //handle click of like button
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await axios.put(
        `http://127.0.0.1:5000/api/upvoterequest/${requestID}`,
        null,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setLiked(!liked);
      if (liked) {
        alert("Vote undone");
      } else {
        alert("Upvoted!");
      }
    } catch (error) {
      console.log(error.response.data);
    }
  }

  async function modifyRequest(event) {
    event.preventDefault();
    let newInfo = {
      description: description,
      progress: progress,
      seen: true,
    };
    try {
      await axios.put(
        `http://127.0.0.1:5000/api/requests/${requestID}`,
        newInfo,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      alert("Updated Request");
    } catch (error) {
      console.log(error.response.data);
    }
  }

  //get status of user upvoting request
  const getLikeStatus = useCallback(async () => {
    try {
      let response = await axios.get(
        `http://127.0.0.1:5000/api/upvoterequest/${requestID}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setLiked(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  }, [requestID, token]);

  //if not official, display nothing, else return requester info
  const getUserInfo = useCallback(
    async (requesterID) => {
      if (user.position == null && user.position != "") {
        return;
      } else {
        try {
          let response = await axios.get(
            `http://127.0.0.1:5000/api/users/${requesterID}`,
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
          setRequester(response.data);
        } catch (err) {
          console.log(err.response.data);
        }
      }
    },
    [request.requester, token, user.position]
  );

  //Google Maps
  const options = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    const getRequest = async () => {
      try {
        let response = await axios.get(
          `http://127.0.0.1:5000/api/requests/${requestID}`
        );
        setRequest(response.data);
        setProgress(response.data.progress);
        setVotes(response.data.votes);
        setSeen(response.data.seen);
        setDescription(response.data.description);
        getLikeStatus();
        getUserInfo(response.data.requester);
        setMarker({
          lat: response.data.latitude,
          lng: response.data.longitude,
        });
        console.log(user.position);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    getRequest();
  }, []); //requestID, marker, request, getLikeStatus, getUserInfo

  return (
    <div className="requestPageContainer">
      {user.position != null && (
        <DisplayRequesterInfo requester={requester}></DisplayRequesterInfo>
      )}
      <div className="card">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Request: {request.type}</li>
          <li className="list-group-item">
            Description: {request.description}
          </li>
          ;
          <li className="list-group-item">
            Progress: {progress}{" "}
            <ProgressBar now={progress} label={`${progress}%`} />
          </li>
          <li className="list-group-item">Votes: {votes}</li>
          <li className="list-group-item">
            Liked Status: {liked ? <p>LIKED!</p> : <p>Like?</p>}
          </li>
          {/* Seen status updated by official modifying request */}
          <li className="list-group-item">
            Seen by official: {seen && <p>Request seen by official</p>}
          </li>
        </ul>
      </div>

      <button type="submit" onClick={handleSubmit}>
        Upvote Issue
      </button>
      {user.position != null && (
        <form
          className="form-control modifyRequestContainer"
          onSubmit={modifyRequest}
        >
          <h1>Modify Request Details</h1>

          <div className="input-group mb-3">
            <label>Description</label>
            <input
              name="description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="input-group mb-3">
            <label>Progress</label>
            <input
              name="progress"
              onChange={(e) => setProgress(e.target.value)}
            />
          </div>
          <button type="submit">Edit Request</button>
        </form>
      )}

      {!isLoaded ? (
        <p>Loading...</p>
      ) : (
        <GoogleMap
          zoom={14}
          center={marker}
          mapContainerClassName="mapContainer"
          options={options}
        >
          <Marker position={marker}></Marker>
        </GoogleMap>
      )}
      <AddMessage></AddMessage>
      <DisplayMessages></DisplayMessages>
    </div>
  );
};

export default RequestPage;
