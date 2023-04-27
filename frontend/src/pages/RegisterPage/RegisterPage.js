import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";

const RegisterPage = () => {
  const { registerUser } = useContext(AuthContext);
  const defaultValues = {
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    street_address: "",
    city: "",
    zip: "",
    phone: "",
  };

  const [formData, handleInputChange, handleSubmit] = useCustomForm(
    defaultValues,
    registerUser
  );

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Username:{" "}
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </label>
        <label>
          First Name:{" "}
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Last Name:{" "}
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Email:{" "}
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Password:{" "}
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </label>
        <label>
          street_address:{" "}
          <input
            type="text"
            name="street_address"
            value={formData.street_address}
            onChange={handleInputChange}
          />
        </label>
        <label>
          City:{" "}
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Zip:{" "}
          <input
            type="text"
            name="zip"
            value={formData.zip}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Phone:{" "}
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </label>
        <button>Register!</button>
      </form>
    </div>
  );
};

export default RegisterPage;
