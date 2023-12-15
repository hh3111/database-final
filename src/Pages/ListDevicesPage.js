// AboutPage.js
import React, { useState, useEffect, useContext } from 'react';
import CreateProperty from '../Components/CreateProperty'
import RegisterDevice from '../Components/RegisterDevice';
import Navigation from '../Components/Navigation';
import axios from 'axios';
import { LoginContext } from '../Components/LoginContext';

const ListDevicesPage = () => {
    const [devices, setDevices] = useState([])
    const [refresh, setRefresh] = useState(false)
    const { user } = useContext(LoginContext)

    function deleteDevice(did) {
        axios.post('http://localhost:3001/deletedevice', {
            did: did
        }).then((response) => {
            axios.post('http://localhost:3001/getdevicesofuser', {
                cid: user.cid < 1 ? 1 : user.cid
            }).then((response) => {
                setDevices(response.data)
            })
        })
    }

    useEffect(() => {
        axios.post('http://localhost:3001/getdevicesofuser', {
            cid: user.cid < 1 ? 1 : user.cid
        }).then((response) => {
            setDevices(response.data)
        })
    }, [user]);

    return (
        <div>
            <Navigation />
            <h1>Your Devices</h1>
            {devices.map((device) => {
                return (
                    <div className='propertylist'>
                        <p>Device Type: {device.type}</p>
                        <p>Device Model: {device.model}</p>
                        <p>Address: {device.address}, {device.zip}</p>
                        <button onClick={() => deleteDevice(device.did)}>Remove Device</button>
                    </div>
                )
            })}
        </div>
    );
};

export default ListDevicesPage;