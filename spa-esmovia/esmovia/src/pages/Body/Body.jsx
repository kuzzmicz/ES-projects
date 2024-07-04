import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../Home/Home";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Admin from "../Admin/Admin";
import Details from "../Details/Details";

function Body() {
  return (
    <>
      <Routes>
        <Route path="*" element={<Navigate to={"/"} replace/>} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/details" element={<Details />} />
      </Routes>
    </>
  );
}

export default Body;