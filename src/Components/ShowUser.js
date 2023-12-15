import React from 'react';
import { useContext } from 'react';
import { LoginContext } from './LoginContext';

function ShowUser() { // todo: add database call, add props for pid
    const { user } = useContext(LoginContext)

    const handleSubmit = (event) => {
        event.preventDefault();
        if (user === null || !user.username) {
            alert("Not logged in")
        }
        else 
            alert(user.username)
    }

    return (
        <div>
            <button onClick={handleSubmit}>Show Logged in User</button>
        </div>
    )
}

export default ShowUser;