import { useState } from "react";
import axios from "axios";

const SearchPage = () => {
  const [filter, setFilter] = useState("");
  const [responseCodes, setResponseCodes] = useState([]);

  const handleSearch = async () => {
    const res = await axios.get(`/api/responseCodes/${filter}`);
    setResponseCodes(res.data);
  };

  const handleSave = async () => {
    const listName = prompt("Enter list name");
    if (!listName) return;
    const res = await axios.post("/api/lists", {
      name: listName,
      codes: responseCodes,
      userId: localStorage.getItem("userId"),
    });
    alert("List saved");
  };

  return (
    <div>
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <div>
        {responseCodes.map((code) => (
          <div key={code.code}>
            <img src={code.imageUrl} alt={code.code} />
            <p>{code.code}</p>
          </div>
        ))}
      </div>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default SearchPage;
