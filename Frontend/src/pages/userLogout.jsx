import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLogout = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("Logout successful");
          localStorage.removeItem("token");
          navigate("/user-login");
        }
      })
      .catch((error) => {
        localStorage.removeItem("token");
        navigate("/user-login");
      });
  }, [navigate, token]);

  return <div>Logging out...</div>;
};

export default UserLogout;
