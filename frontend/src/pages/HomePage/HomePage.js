import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import "../../App.css";

import axios from "axios";
import SubmitRequest from "../../components/SubmitRequest";
import OfficialsList from "../../components/OfficialsList";

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  const [user, token] = useAuth();
  const [requests, setRequests] = useState([]); //get list of requests through axios so can see on the map
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
    const fetchRequests = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:5000/api/user_cars");
        setRequests(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchRequests();
  }, [token]);

  const center = useMemo(
    () => ({ lat: 44.76490162041539, lng: -89.39070129394531 }),
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
          {requests.map((marker) => (
            <Marker
              position={{ lat: marker.latitude, lng: marker.longitude }}
            ></Marker>
          ))}
          <Marker
            position={markerPosition}
            draggable={true}
            onMouseUp={handleMapClick}
          ></Marker>
        </GoogleMap>
      )}
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
