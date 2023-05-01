import React, { useState, useEffect } from "react";
import axios from "axios";

const OfficialsList = () => {
  const [officialsList, setOfficialsList] = useState([
    {
      phone: null,
      position: null,
      id: 1,
      email: "test1@test1",
      blocked: null,
      zip: 0,
      city: "",
      first_name: "test1",
      last_name: "test1",
      username: "test1",
      street_address: "",
    },
    {
      phone: 123,
      position: null,
      id: 2,
      email: "test1@test.com",
      blocked: false,
      zip: 55555,
      city: "Test",
      first_name: "test1",
      last_name: "test1",
      username: "test123",
      street_address: "123 Test Lane",
    },
    {
      phone: 12345,
      position: "Roads",
      id: 3,
      email: "bob@government.com",
      blocked: null,
      zip: 55555,
      city: "Wausau",
      first_name: "Bob",
      last_name: "Jones",
      username: "Bobber",
      street_address: "123 Test Lane",
    },
    {
      phone: 23456,
      position: "Finance",
      id: 4,
      email: "alice@government.com",
      blocked: null,
      zip: 55555,
      city: "Houston",
      first_name: "Alice",
      last_name: "Lyndon",
      username: "ALyndon",
      street_address: "234 Test Lane",
    },
    {
      phone: 55555,
      position: null,
      id: 5,
      email: "test4@test4.com",
      blocked: false,
      zip: 55555,
      city: "test4",
      first_name: "test4",
      last_name: "test4",
      username: "test4",
      street_address: "test4",
    },
  ]);

  useEffect(() => {
    const getOfficialsList = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:5000/api/officials");
        setOfficialsList(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    getOfficialsList();
  }, []);

  return (
    <div>
      <h2>List of Officials</h2>
      {officialsList.map((official, index) => (
        <div key={index}>
          <h2>
            {official.first_name} {official.last_name}
          </h2>
          <p>Email Address: {official.email}</p>
          <p>Phone Number: {official.phone}</p>
        </div>
      ))}
    </div>
  );
};

export default OfficialsList;
