import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [])

    // Delete an user 
    const handleDeleteUser = (id) => {
        const proceed = window.confirm('Are you sure about delete this item?');
        if (proceed) {
            const url = `http://localhost:5000/users/${id}`
            fetch(url, {
                method: 'DELETE',
            }).then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('User Deleted Successfully');
                        const remainingUser = users.filter(user => user._id !== id);
                        setUsers(remainingUser)
                    }
                })
        }
    }
    return (
        <div>
            <h2>Total Users {users.length}</h2>
            <ul>{
                users.map(user => <li key={user._id}>Name: {user.name} || Email: {user.email}
                    <Link to={`/users/update/${user._id}`}>
                        <button>Update</button>
                    </Link>
                    <button onClick={() => { handleDeleteUser(user._id) }}>X</button>
                </li>)
            }</ul>
        </div>
    );
};

export default Users;