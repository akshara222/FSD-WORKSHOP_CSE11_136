import { useState } from "react";
import axios from "axios";

const url = "http://localhost:3000/";

const SignUp = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(`${url}create`, formData);

      onSuccess(response.data);

      setFormData({
        id: "",
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error(error);
      setError(
        error.response.data?.message || "Signup failed. Please try again."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>

      <input
        type="number"
        name="id"
        placeholder="ID"
        value={formData.id}
        onChange={handleChange}
      />

      <br></br>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      />

      <br></br>

      <input
        type="text"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />

      <br></br>

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <br></br>

      {error && <p role="alert">{error}</p>}

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;