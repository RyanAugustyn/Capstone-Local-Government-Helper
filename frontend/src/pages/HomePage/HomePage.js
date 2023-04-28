import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import {
  DrawingManager,
  GoogleMap,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import "../../App.css";

import axios from "axios";
import SubmitRequest from "../../components/SubmitRequest";

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  const [user, token] = useAuth();
  const [cars, setCars] = useState([]);
  const [requests, setRequests] = useState([
    {
      id: 1,
      user: {
        id: 2,
        street_address: "123 Test Lane",
        blocked: false,
        first_name: "test1",
        position: null,
        phone: 123,
        email: "test1@test.com",
        username: "test123",
        city: "Test",
        last_name: "test1",
        zip: 55555,
      },
      requester: "Bob Jobs",
      seen: false,
      progress: 0,
      description: "UPDATE 2 THE PEACKOCKS ARE STILL SQUAKING",
      type: "animal control",
      assigned_to: null,
      user_id: 2,
      latitude: 45.0,
      longitude: -89.0,
    },
    {
      id: 2,
      user: {
        id: 2,
        street_address: "123 Test Lane",
        blocked: false,
        first_name: "test1",
        position: null,
        phone: 123,
        email: "test1@test.com",
        username: "test123",
        city: "Test",
        last_name: "test1",
        zip: 55555,
      },
      requester: "Bob Jobs",
      seen: false,
      progress: 0,
      description: "THE NEIGHBORS ARE TOO YOUNG TO BE PARTYING",
      type: "animal control",
      assigned_to: null,
      user_id: 2,
      latitude: 45.0,
      longitude: -89.0,
    },
    {
      id: 4,
      user: {
        id: 5,
        street_address: "test4",
        blocked: false,
        first_name: "test4",
        position: null,
        phone: 55555,
        email: "test4@test4.com",
        username: "test4",
        city: "test4",
        last_name: "test4",
        zip: 55555,
      },
      requester: "it me",
      seen: false,
      progress: 0,
      description: "ITS HUGE",
      type: "pothole",
      assigned_to: null,
      user_id: 5,
      latitude: 45.0,
      longitude: -89.445,
    },
    {
      id: 5,
      user: {
        id: 5,
        street_address: "test4",
        blocked: false,
        first_name: "test4",
        position: null,
        phone: 55555,
        email: "test4@test4.com",
        username: "test4",
        city: "test4",
        last_name: "test4",
        zip: 55555,
      },
      requester: "",
      seen: false,
      progress: 0,
      description: "",
      type: "",
      assigned_to: null,
      user_id: 5,
      latitude: 0.0,
      longitude: 0.0,
    },
    {
      id: 6,
      user: {
        id: 5,
        street_address: "test4",
        blocked: false,
        first_name: "test4",
        position: null,
        phone: 55555,
        email: "test4@test4.com",
        username: "test4",
        city: "test4",
        last_name: "test4",
        zip: 55555,
      },
      requester: "Bigsby",
      seen: false,
      progress: 0,
      description: "down in the street",
      type: "Power Line",
      assigned_to: null,
      user_id: 5,
      latitude: 45.3234,
      longitude: -89.776,
    },
    {
      id: 7,
      user: {
        id: 5,
        street_address: "test4",
        blocked: false,
        first_name: "test4",
        position: null,
        phone: 55555,
        email: "test4@test4.com",
        username: "test4",
        city: "test4",
        last_name: "test4",
        zip: 55555,
      },
      requester: "Bigsby",
      seen: false,
      progress: 0,
      description: "TOO MANY DOGS",
      type: "Animal Control",
      assigned_to: null,
      user_id: 5,
      latitude: 45.0,
      longitude: -89.776,
    },
    {
      id: 8,
      user: {
        id: 5,
        street_address: "test4",
        blocked: false,
        first_name: "test4",
        position: null,
        phone: 55555,
        email: "test4@test4.com",
        username: "test4",
        city: "test4",
        last_name: "test4",
        zip: 55555,
      },
      requester: "Bigsby",
      seen: false,
      progress: 0,
      description: "TOO MANY DOGS",
      type: "Animal Control",
      assigned_to: null,
      user_id: 5,
      latitude: 45.0,
      longitude: -89.776,
    },
    {
      id: 9,
      user: {
        id: 5,
        street_address: "test4",
        blocked: false,
        first_name: "test4",
        position: null,
        phone: 55555,
        email: "test4@test4.com",
        username: "test4",
        city: "test4",
        last_name: "test4",
        zip: 55555,
      },
      requester: "Bigsby",
      seen: false,
      progress: 0,
      description: "TOO MANY DOGS",
      type: "Animal Control",
      assigned_to: null,
      user_id: 5,
      latitude: 45.0,
      longitude: -89.776,
    },
    {
      id: 10,
      user: {
        id: 5,
        street_address: "test4",
        blocked: false,
        first_name: "test4",
        position: null,
        phone: 55555,
        email: "test4@test4.com",
        username: "test4",
        city: "test4",
        last_name: "test4",
        zip: 55555,
      },
      requester: "it me",
      seen: false,
      progress: 0,
      description: "BEARS ",
      type: "Pothole",
      assigned_to: null,
      user_id: 5,
      latitude: 46.0,
      longitude: 47.0,
    },
  ]); //get list of requests through axios so can see on the map
  const [markerPosition, setMarkerPosition] = useState(null);

  const handleMapClick = (e) => {
    console.log(e);
    const { latLng } = e;
    const lat = latLng.lat();
    const lng = latLng.lng();
    setMarkerPosition({ lat, lng });
  };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:5000/api/user_cars", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setCars(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchCars();
  }, [token]);

  const center = useMemo(
    () => ({ lat: requests[0].latitude, lng: requests[0].longitude }),
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
          zoom={10}
          center={center}
          mapContainerClassName="mapContainer"
          options={options}
          onClick={handleMapClick}
        >
          {/* {requests.map((marker) => (
            <Marker
              position={{ lat: marker.latitude, lng: marker.longitude }}
            ></Marker>
          ))} */}
          <Marker
            position={markerPosition}
            draggable={true}
            onMouseUp={handleMapClick}
          ></Marker>
        </GoogleMap>
      )}
      <SubmitRequest
        lat={markerPosition.lat}
        lng={markerPosition.lng}
        user={user}
      ></SubmitRequest>
    </div>
  );
};

export default HomePage;
