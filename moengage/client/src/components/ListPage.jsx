// components/ListsPage.js
import { useEffect, useState } from 'react';
import axios from 'axios';

const ListsPage = () => {
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);

  useEffect(() => {
    const fetchLists = async () => {
      const res = await axios.get(`/api/lists/${localStorage.getItem('userId')}`);
      setLists(res.data);
    };
    fetchLists();
  }, []);

  const handleDelete = async (listId) => {
    await axios.delete(`/api/lists/${listId}`);
    setLists(lists.filter((list) => list._id !== listId));
  };

  const handleEdit = (list) => {
    const newName = prompt('Enter new list name', list.name);
    if (!newName) return;
    axios.put(`/api/lists/${list._id}`, { name: newName, codes: list.codes }).then((res) => {
      setLists(lists.map((l) => (l._id === list._id ? res.data : l)));
    });
  };

  return (
    <div>
      <h2>Saved Lists</h2>
      <ul>
        {lists.map((list) => (
          <li key={list._id}>
            <span onClick={() => setSelectedList(list)}>{list.name}</span>
            <button onClick={() => handleDelete(list._id)}>Delete</button>
            <button onClick={() => handleEdit(list)}>Edit</button>
          </li>
        ))}
      </ul>
      {selectedList && (
        <div>
          <h3>{selectedList.name}</h3>
          {selectedList.codes.map((code) => (
            <div key={code.code}>
              <img src={code.imageUrl} alt={code.code} />
              <p>{code.code}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListsPage;
