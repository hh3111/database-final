import React from 'react';
import { useState, useContext } from 'react';
import { LoginContext } from './LoginContext';
import axios from 'axios'
import Navigation from './Navigation';
import ShowUser from './ShowUser';
import '../Navigation.scss'
import Sanitize from '../Sanitize';

function CreateProperty() { // todo: add database call, add props for cid
    const convertToSQLDate = (date) => {
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        month = month < 10 ? '0' + month : month;

        let day = date.getDate();
        day = day < 10 ? '0' + day : day;

        return `${year}-${month}-${day}`;
    };

    const [sqft, setSqft] = useState("");
    const [beds, setBeds] = useState("");
    const [address, setAddress] = useState("");
    const [zip, setZip] = useState("");
    const [occupants, setOccupants] = useState("");
    const [date, setDate] = useState(convertToSQLDate(new Date()));
    const { user } = useContext(LoginContext)

    const handleSubmit = (event) => {
        event.preventDefault();
        if (user.cid == -1) {
            alert('Must be logged in to register property')
        } else {
            axios.get('http://localhost:3001/getproperties')
                .then((response) => {
                    console.log(response.data)
                    if (response.data.some(property => property.address === address && property.cid === user.cid)) {
                        alert("You have already registered a property with this address.")
                    } else {
                        axios.post('http://localhost:3001/addproperty', {
                            cid: user.cid,
                            address: Sanitize(address),
                            zip: Sanitize(zip),
                            date: date,
                            sqft: Sanitize(sqft),
                            beds: Sanitize(beds),
                            occupants: Sanitize(occupants)
                        })
                        alert("Registered Successfully")
                    }
                }
            )
        }
    }

    return (
        <div>
            <Navigation />
            <div className='input'>
                <h1>Register New Property</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>
                            Square Footage:
                        </label>
                        <input
                            type="text"
                            value={sqft}
                            onChange={(e) => setSqft(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>
                            Number of Bedrooms:
                        </label>
                        <input
                            type="text"
                            value={beds}
                            onChange={(e) => setBeds(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>
                            Number of Occupants:
                        </label>
                        <input
                            type="text"
                            value={occupants}
                            onChange={(e) => setOccupants(e.target.value)}
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
        </div>

    )
}

export default CreateProperty;