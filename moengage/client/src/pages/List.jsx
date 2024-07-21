import { useState } from "react";
import axios from "axios";

const List = () => {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    userId: "",
    image: null,
  });

  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    setFormData({
      ...formData,
      [id]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }

    try {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      if (!token) {
        throw new Error("No token found in local storage");
      }

      const response = await axios.post("http://localhost:8000/api/v1/lists", form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Add the token to the Authorization header
        },
      });

      console.log("List created successfully", response.data);
      setMessage("List created successfully");
    } catch (err) {
      console.error("Error creating list", err.response ? err.response.data : err.message);
      setMessage("Error creating list: " + (err.response ? err.response.data.message : err.message));
    }
  };

  return (
    <div className="container-fluid col-9 mt-4 mb-4">
      <h1 className="text-center">HTTP Status Dogs</h1>
      <h4 className="text-center mt-2">
        Dogs for every HyperText Transfer Protocol response status code.
      </h4>

      <div className="container-fluid col-6 mt-4 mb-4 p-2 border border-primary rounded">
        <h3>Create a List</h3>
        {message && <div className="alert alert-info">{message}</div>}
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="code" className="form-label">
              Code
            </label>
            <input
              type="number"
              className="form-control"
              id="code"
              value={formData.code}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="userId" className="form-label">
              UserId
            </label>
            <input
              type="text"
              className="form-control"
              id="userId"
              value={formData.userId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="image" className="form-label">
              Image
            </label>
            <input
              type="file"
              className="form-control"
              id="image"
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12 mb-2">
            <button type="submit" className="btn btn-primary">
              Create List
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default List;
