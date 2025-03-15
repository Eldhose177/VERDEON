import React, { useState } from "react";
import MaterialForm from "./components/MaterialForm";
import Recommendations from "./components/Recommendations";
import "./styles/App.css";

function App() {
  const [recommendations, setRecommendations] = useState([]);

  return (
    <div className="container">
      <h1>Eco-Friendly Packaging Advisor</h1>
      <MaterialForm setRecommendations={setRecommendations} />
      <Recommendations recommendations={recommendations} />
    </div>
  );
}

export default App;
