import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Header1 from "./pages/Header1";
import Header2 from "./pages/Header2";
import PrivateRoute from "./components/PrivateRoute";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/header1"
          element={
            <PrivateRoute>
              <Header1 />
            </PrivateRoute>
          }
        />
        <Route
          path="/header2"
          element={
            <PrivateRoute>
              <Header2 />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
