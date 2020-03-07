import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Form({
  setUsers,
  users,
  editUser,
  setEditUser,
  refetch,
  setRefetch
}) {
  const [formValues, setFormValues] = useState({ name: '', bio: '' });

  useEffect(() => {
    if (editUser) {
      setFormValues(editUser);
    }
  }, [editUser]);

  const handleChange = e => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (editUser) {
      axios
        .put(`http://localhost:5000/api/users/${editUser.id}`, formValues)
        .then(res => console.log(res))
        .catch(error => console.log(error));
      setEditUser(null);
      setRefetch(!refetch);
    } else {
      axios
        .post('http://localhost:5000/api/users', formValues)
        .then(res => {
          setUsers([...users, res.data]);
        })
        .catch(error => console.log(error));
    }
    setFormValues({ name: '', bio: '' });
  };

  return (
    <div>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '200px',
          margin: '0 auto'
        }}
        onSubmit={handleSubmit}>
        <input
          type='text'
          name='name'
          placeholder='Enter Your Name'
          onChange={handleChange}
          value={formValues.name}
          required
        />
        <textarea
          type='text'
          name='bio'
          placeholder='Enter Bio'
          onChange={handleChange}
          value={formValues.bio}
          required
        />
        <button onClick={handleSubmit}>Add New User</button>
      </form>
    </div>
  );
}
