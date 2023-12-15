import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import Navigation from './Navigation';
import { Link, Navigate } from 'react-router-dom'
import Sanitize from '../Sanitize.js'

function RegisterUser() { // todo: add database call to register
    const [fname, setfName] = useState("");
    const [lname, setlName] = useState("");
    const [address, setAddress] = useState("");
    const [zip, setZip] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")
    const [registered, setRegistered] = useState(false)

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
                console.log(response.data)
                if (response.data.some(user => user.username === Sanitize(username))) {
                    alert("The username you entered is already used by another user. Please try another username")
                } else {
                    axios.post('http://localhost:3001/addcustomer', {
                        username: Sanitize(username),
                        password: Sanitize(password),
                        fname: Sanitize(fname),
                        lname: Sanitize(lname),
                        address: Sanitize(address),
                        zip: Sanitize(zip)
                    })
                    alert("Registered Successfully")
                    setRegistered(true)
                }
            })
    }

    return (
        <div>
            <div className='registerinput'>
                <h1>Register New User</h1>
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
                    <div>
                        <label>
                            First Name:
                        </label>
                        <input
                            type="text"
                            value={fname}
                            onChange={(e) => setfName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>
                            Last Name:
                        </label>
                        <input
                            type="text"
                            value={lname}
                            onChange={(e) => setlName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>
                            Address:
                        </label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>
                            Zip Code:
                        </label>
                        <input
                            type="text"
                            value={zip}
                            onChange={(e) => setZip(e.target.value)}
                        />
                    </div>
                    <input type="submit" value="Register" />
                </form>
            </div>
            {registered ? <Navigate to="/" /> : null}
            <Link className='createaccount' to="/"><h5>Login</h5></Link>
        </div>
    )
}

export default RegisterUser;