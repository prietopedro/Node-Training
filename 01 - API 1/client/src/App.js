import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Form from './Components/Form';

function App() {
  const [users, setUsers] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/users')
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => console.log(console.log(err)));

    axios
      .get('http://localhost:5000/api/users/11')
      .then(res => {
        setUser(res.data);
      })
      .catch(err => console.log(console.log(err)));
  }, [refetch]);
  console.log(user);

  const deleteUser = id => {
    axios
      .delete(`http://localhost:5000/api/users/${id}`)
      .then(res => setRefetch(!refetch))
      .catch(error => console.log(error));
  };

  return (
    <div className='App'>
      {user && <h1>{user.name}</h1>}
      {users.map(user => (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            width: '20%'
          }}
          key={user.id}>
          <h1>{user.name}</h1>
          <h2>{user.bio}</h2>
          <h3>{user.id}</h3>
          <button onClick={() => setEditUser(user)}>Edit User</button>
          <button onClick={() => deleteUser(user.id)}>Delete User</button>
        </div>
      ))}
      <Form
        setUsers={setUsers}
        users={users}
        editUser={editUser}
        setEditUser={setEditUser}
        setRefetch={setRefetch}
        refetch={refetch}
      />
    </div>
  );
}

export default App;
