import React, { useEffect, useState } from 'react';
import "../Navigation.scss"
import AdminPage from './AdminPage'
import axios from 'axios'

const DeviceTable = () => {
  const [devices, setDevices] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/getdevices')
      .then((response) => {
        setDevices(response.data)
      })
  }, []);


  return (
    <div>
      <AdminPage />
      <h1>Devices</h1>
      <div className='jsondata'>
        {devices.map((device) => {
          delete device.password
          return (
            <p>{JSON.stringify(device)}</p>
          )
        })}
      </div>
    </div>
  );
};

export default DeviceTable;