import React from 'react';
import { useContext } from 'react';
import { LoginContext } from './LoginContext';

function LogOut() { // todo: add database call, add props for pid
    const { user, setUser } = useContext(LoginContext)

    const handleSubmit = (event) => {
        event.preventDefault();
        setUser({cid: 0, username: '', password: '', fname: '', lname: '', address: '', zip:''})
        alert('Log out successful')
    }

    return (
        <div>
            <button onClick={handleSubmit}>Log Out</button>
        </div>
    )
}

export default LogOut;