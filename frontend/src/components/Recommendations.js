import React from "react";

const Recommendations = ({ recommendations }) => {
  return (
    <div className="recommendations-container">
      <h2>Recommended Packaging Solutions</h2>
      {recommendations.length === 0 ? (
        <p>No recommendations available.</p>
      ) : (
        <ul>
          {recommendations.map((item, index) => (
            <li key={index}>
              <strong>{item["Material Type"]}</strong> - {item.Recyclable ? "Recyclable" : "Non-recyclable"}, {item.Compostable ? "Compostable" : "Non-compostable"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Recommendations;
