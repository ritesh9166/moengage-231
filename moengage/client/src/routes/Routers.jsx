import { Navigate, Route, Routes } from "react-router-dom";
import List from "../pages/List";
import Search from "../pages/Search";
import Signup from "../pages/Signup";
import Login from "../pages/Login";

const Routers = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/lists" />} />
        <Route path="/lists" element={<List />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
};

export default Routers;
