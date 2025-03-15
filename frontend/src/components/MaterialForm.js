import React, { useState } from "react";
import { API_BASE_URL } from "../config";

const MaterialForm = ({ setRecommendations }) => {
  const [formData, setFormData] = useState({
    material_type: "",
    recyclable: "",
    compostable: "",
    dimensions: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const query = new URLSearchParams(formData).toString();
    const response = await fetch(`${API_BASE_URL}/recommend?${query}`);
    const data = await response.json();
    setRecommendations(data);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <label>
        Material Type:
        <input type="text" name="material_type" value={formData.material_type} onChange={handleChange} required />
      </label>
      <label>
        Recyclable:
        <select name="recyclable" value={formData.recyclable} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </label>
      <label>
        Compostable:
        <select name="compostable" value={formData.compostable} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </label>
      <label>
        Dimensions (LxWxH or Radius for Cylinder):
        <input type="text" name="dimensions" value={formData.dimensions} onChange={handleChange} required />
      </label>
      <button type="submit">Get Recommendations</button>
    </form>
  );
};

export default MaterialForm;
