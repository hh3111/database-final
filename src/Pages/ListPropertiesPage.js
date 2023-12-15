// AboutPage.js
import React, { useState, useEffect, useContext } from 'react';
import CreateProperty from '../Components/CreateProperty'
import RegisterDevice from '../Components/RegisterDevice';
import Navigation from '../Components/Navigation';
import axios from 'axios';
import { LoginContext } from '../Components/LoginContext';

const ListPropertiesPage = () => {
    const [properties, setProperties] = useState([])
    const [devices, setDevices] = useState([])
    const { user } = useContext(LoginContext)

    function deleteProperty(pid) {
        axios.post('http://localhost:3001/getdevicesofproperty', {
            pid: pid
        }).then((response) => {
            setDevices(response.data)
            for (var i = 0; i < response.data.length; i++) {
                axios.post('http://localhost:3001/deletedevice', {
                    did: response.data[i].did
                })
            }
            axios.post('http://localhost:3001/deleteproperty', {
                pid: pid
            }).then((response) => {
                axios.post('http://localhost:3001/getpropertiesofuser', {
                    cid: user.cid < 1 ? 1 : user.cid
                }).then((response) => {
                    setProperties(response.data)
                })
            })

        })
    }

    useEffect(() => {
        axios.post('http://localhost:3001/getpropertiesofuser', {
            cid: user.cid < 1 ? 1 : user.cid
        }).then((response) => {
            setProperties(response.data)
        })
    }, [user]);

    return (
        <div>
            <Navigation />
            <h1>Your Properties</h1>
            {properties.map((property) => {
                return (
                    <div className='propertylist'>
                        <p>Address: {property.address}, {property.zip}</p>
                        <p>Date Registered: {property.date.substring(0, 10)}</p>
                        <p>Square Feet: {property.sqft}</p>
                        <p>Beds: {property.beds}</p>
                        <p>Occupants: {property.occupants}</p>
                        <button onClick={() => deleteProperty(property.pid)}>Remove Property</button>
                    </div>
                )
            })}
        </div>
    );
};

export default ListPropertiesPage;