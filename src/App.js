import React from "react";
import Login from "./pages/login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Chat from "./pages/chat";
import { useSelector } from "react-redux";

const App = () => {
  return (
    <div className="bg-main h-screen w-screen">
      <Router>
        <Routes>
          <Route exact path="/" Component={Login} />
          <Route exact path="/chat" Component={Chat} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
