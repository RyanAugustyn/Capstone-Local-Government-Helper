import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import useAuth from "../hooks/useAuth";
import AddMessage from "../components/Message";
import DisplayMessages from "../components/DisplayMessages";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const RequestPage = () => {
  const { requestID } = useParams();
  const [user, token] = useAuth();
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
  const [progress, setProgress] = useState(0);
  const [votes, setVotes] = useState(0);
  const [seen, setSeen] = useState(false);
  const [liked, setLiked] = useState();

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
        getLikeStatus();
      } catch (error) {
        console.log(error.response.data);
      }
    };
    getRequest();
  }, [requestID]);

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
    } catch (error) {
      console.log(error.response.data);
    }
  }

  //get status of user upvoting request
  const getLikeStatus = async () => {
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
  };

  //Google Maps
  const center = useMemo(
    () => ({ lat: request.latitude, lng: request.longitude }),
    []
  );
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

  return (
    <div className="page_container">
      <h2> Request Page for number: {request.id}</h2>
      <h3>Request: {request.type}</h3>
      <p>Progress: {progress}</p>
      <p>Votes: {votes}</p>
      <p>Seen: {seen}</p>
      <button type="submit" onClick={handleSubmit}>
        Upvote Issue
      </button>
      {liked ? <p>LIKED!</p> : <p>Like?</p>}
      {!isLoaded ? (
        <p>Loading...</p>
      ) : (
        <GoogleMap
          zoom={14}
          center={center}
          mapContainerClassName="mapContainer"
          options={options}
        >
          <Marker position={center}></Marker>
        </GoogleMap>
      )}
      <AddMessage></AddMessage>
      <DisplayMessages></DisplayMessages>
    </div>
  );
};

export default RequestPage;
