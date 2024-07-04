import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../Home/Home";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";

function Body() {
  return (
    <>
      <Routes>
        <Route path="*" element={<Navigate to={"/"} replace/>} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default Body;