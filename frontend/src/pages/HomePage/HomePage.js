import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import {
  GoogleMap,
  Marker,
  useLoadScript,
  MarkerClusterer,
} from "@react-google-maps/api";
import "../../App.css";

import axios from "axios";
import SubmitRequest from "../../components/SubmitRequest";
import OfficialsList from "../../components/OfficialsList";
import DisplayRequests from "../../components/DisplayRequests";

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  const [user, token] = useAuth();
  //get list of requests through axios so can see on the map
  const [requests, setRequests] = useState([]);
  //moveable marker, get coordinates from handleMapClick()
  const [markerPosition, setMarkerPosition] = useState({ lat: 0.0, lng: 0.0 });

  //Event to get lat/lng from clicking google map pin drop
  const handleMapClick = (e) => {
    console.log(e);
    const { latLng } = e;
    const lat = latLng.lat();
    const lng = latLng.lng();
    setMarkerPosition({ lat, lng });
  };

  //retrieve list of requests
  useEffect(() => {
    console.log("TEST value for token: ", token);
    const fetchRequests = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:5000/api/requests");
        setRequests(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchRequests();
  }, [token]);

  const center = useMemo(
    () => ({ lat: 44.95763688292849, lng: -89.63926696777344 }),
    []
  );
  const options = useMemo(
    () => ({
      disableDefaultUI: false,
      clickableIcons: false,
    }),
    []
  );

  //Google Maps
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  return (
    <div className="container">
      {console.log(user)}
      <h1>Home Page for {user.username}!</h1>
      <h1>test: {user.position}</h1>
      <h1>test: {user.first_name}</h1>
      <h1>test: {user.id}</h1>
      {/* check for map loading */}
      {!isLoaded ? (
        <div>Loading...</div>
      ) : (
        <GoogleMap
          zoom={14}
          center={center}
          mapContainerClassName="mapContainer"
          options={options}
          onClick={handleMapClick}
        >
          <MarkerClusterer>
            {(clusterer) =>
              requests.map((marker, index) => (
                <Marker
                  key={index}
                  position={{ lat: marker.latitude, lng: marker.longitude }}
                  clusterer={clusterer}
                ></Marker>
              ))
            }
          </MarkerClusterer>
          <Marker
            position={markerPosition}
            draggable={true}
            onMouseUp={handleMapClick}
          ></Marker>
        </GoogleMap>
      )}
      <DisplayRequests></DisplayRequests>
      <OfficialsList></OfficialsList>
      <SubmitRequest
        lat={markerPosition.lat}
        lng={markerPosition.lng}
        user={user}
      ></SubmitRequest>
    </div>
  );
};

export default HomePage;
