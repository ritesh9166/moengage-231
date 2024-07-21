import { useState } from "react";
import axios from "axios";

const Search = () => {
  const [filter, setFilter] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8800/api/v1/response-code/filter/${filter}`, { withCredentials: true });
      setResults(response.data.data);
    } catch (err) {
      console.error("Error fetching response codes", err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Search Response Codes</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter filter pattern"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>
      <ul className="list-group">
        {results.map((result) => (
          <li key={result._id} className="list-group-item">
            {result.code}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
