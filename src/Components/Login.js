import React from 'react';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios'
import { LoginContext } from './LoginContext';
import { Navigate } from 'react-router-dom';

function Login() { // todo: add database call to register
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useContext(LoginContext)
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        setUser(null)
    }, []);

    async function hash(data) {
        const encoder = new TextEncoder();
        const dataBuffer = encoder.encode(data);
        const hashBuffer = await window.crypto.subtle.digest('SHA-256', dataBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
        setPassword(hashHex)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        axios.get('http://localhost:3001/getcustomers')
            .then((response) => {
                if (response.data.some(login => login.username === username && login.password === password)) {
                    setUser(response.data.find(login => login.username === username && login.password === password))
                    setLoggedIn(true)
                } else {
                    alert("Incorrect username or password")
                }
            })
    }

    return (
        <div>
            <div className='logininput'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>
                            Username:
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>
                            Password:
                        </label>
                        <input
                            type="password"
                            onChange={(e) => hash(e.target.value)}
                        />
                    </div>
                    <input type="submit" value="Login" />
                </form>
                {loggedIn ? <Navigate to="/addproperty" /> : null}
            </div>
        </div>
    )
}

export default Login;