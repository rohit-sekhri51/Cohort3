import React, { useState, useEffect } from 'react';

const UserListxxx = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Empty dependency array means this runs once when the component mounts.

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <ul> for id=3,4,5 only 3 rows
            {users.map(user => (
                <li key={user.id}> <b>Name</b> {user.name} <b>Email </b> {user.email}</li>
            ))}
        </ul>
    );
};

export default UserListxxx;
