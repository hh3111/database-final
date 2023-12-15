import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { LoginContext } from './LoginContext';
import axios from 'axios'
import Navigation from './Navigation';
import Sanitize from '../Sanitize';

function RegisterDevice() { // todo: add database call, add props for pid
    const [type, setType] = useState("Refrigerator");
    const [model, setModel] = useState("Bosch 800");
    const [property, setProperty] = useState("")
    const [properties, setProperties] = useState([])
    const { user } = useContext(LoginContext)

    useEffect(() => {
        axios.post('http://localhost:3001/getpropertiesofuser', {
            cid: user.cid < 1 ? 1 : user.cid
        }).then((response) => {
            setProperties(response.data)
            setProperty(JSON.stringify(response.data[0] ? response.data[0].pid : 1))
        })
    }, [user]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (user.cid === -1) {
            alert('Must be logged in to register property')
        } else {
            axios.post('http://localhost:3001/adddevice', {
                pid: Sanitize(property),
                type: Sanitize(type),
                model: Sanitize(model)
            })
            alert("Registered Successfully")
        }
    }

    return (
        <div>
            <Navigation />
            <div className='input'>
                <h1>Register New Device</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Property Address</label>
                        <select onChange={(e) => {
                            setProperty(e.target.value)
                        }}>
                            {properties.map((property) => {
                                return (
                                    <option key={property.pid} value={property.pid}>{property.address}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div>
                        <label>
                            Device Type:
                        </label>
                        <select onChange={(e) => {
                            setType(e.target.value)
                            e.target.value === "Refrigerator" ? setModel("Bosch 800") :
                                e.target.value === "AC" ? setModel("Window") :
                                    setModel("Top Loading")
                        }}>
                            <option selected value="Refrigerator" >Refrigerator</option>
                            <option value="AC">AC</option>
                            <option value="Dryer">Dryer</option>
                        </select>
                    </div>
                    <div>
                        <label>
                            Device Model:
                        </label>
                        {type === "Refrigerator" ?
                            <select onChange={(e) => setModel(e.target.value)}>
                                <option selected value="Bosch 800">Bosch 800</option>
                                <option value="Samsung 3-Door">Samsung 3-Door</option>
                                <option value="LG InstaView">LG InstaView</option>
                            </select>
                            : type === "AC" ?
                                <select onChange={(e) => setModel(e.target.value)}>
                                    <option value="Central">Central</option>
                                    <option selected value="Window">Window</option>
                                    <option value="Fan">Fan</option>
                                </select>
                                : type === "Dryer" ?
                                    <select onChange={(e) => setModel(e.target.value)}>
                                        <option value="Front Loading">Front Loading</option>
                                        <option selected value="Top Loading">Top Loading</option>
                                        <option value="Connected">Connected</option>
                                    </select>
                                    : null
                        }
                    </div>
                    <input type="submit" value="Register" />
                </form>
            </div>

        </div>
    )
}

export default RegisterDevice;