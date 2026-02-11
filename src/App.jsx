import React from "react";
import {useEffect,useState  } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Logging/Logging";
import AfterLogging from "./components/AfterLogging/AfterLogging";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    chrome.storage.local.get(["token"], (result) => {
      if (result.token) {
        setLoggedIn(true);
      }
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <HashRouter>
      <Routes>

        <Route
          path="/"
          element={loggedIn ? <AfterLogging setLoggedIn={setLoggedIn} /> : <Login />}
        />

        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </HashRouter>
  );
}

export default App;