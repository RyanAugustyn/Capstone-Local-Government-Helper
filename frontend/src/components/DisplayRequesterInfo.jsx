import React from "react";

const DisplayRequesterInfo = ({ requester }) => {
  return (
    <div className="card">
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          Full name: {requester.first_name} {requester.last_name}
        </li>
        <li className="list-group-item">Email: {requester.email}</li>
        <li className="list-group-item">Phone: {requester.phone}</li>
        <li className="list-group-item">
          Street Address: {requester.street_address}
        </li>
        <li className="list-group-item">City: {requester.city}</li>
        <li className="list-group-item">
          Blocked(if applicable)? {requester.blocked}{" "}
        </li>
      </ul>
    </div>
  );
};

export default DisplayRequesterInfo;
