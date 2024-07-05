import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../Home/Home";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";

import { myContext } from "../../app/context";
import { useContext } from "react";

function Body() {
  const { state } = useContext(myContext);
  return (
    <>
      <Routes>
        <Route path="*" element={<Navigate to={"/"} replace />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {}
        {state.auth.token !== "" ? (
          <Route path="/profile" element={<Profile />} />
        ) : null}
      </Routes>
    </>
  );
}

export default Body;