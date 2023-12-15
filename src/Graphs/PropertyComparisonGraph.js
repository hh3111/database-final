import React, { useEffect, useState } from 'react';
import Navigation from '../Components/Navigation';
import "../Navigation.scss"
import axios from 'axios'
import { Chart } from 'react-google-charts'
import { Link } from 'react-router-dom';

const PropertyComparisonGraph = () => {
  const [data, setData] = useState([])
  const [month, setMonth] = useState(11)

  const options = {
    title: "Total Energy Consumption by Property (Monthly)",
    chartArea: { width: "50%" },
  }

  useEffect(() => {
    axios.post('http://localhost:3001/dataquery', {
      query: `SELECT address, SUM(value) AS sum FROM Property p JOIN Device de ON p.pid = de.pid JOIN Data da ON de.did = da.did WHERE MONTH(timestamp) = '${month}' AND label = 'energy use' GROUP BY address`
    }).then((response) => {
      const energyData = [['Property', 'Total Energy Use']]
      const tempdata = response.data
      tempdata.map(function (element) {
        energyData.push([element.address, parseFloat(element.sum)])
      })
      setData(energyData)
    })

  }, [month]);

  return (
    <div>
      <Navigation />
      <div className='nav'>
        <Link className='a' to="/energyday">Energy Use by Day</Link>
        <Link className='a' to="/energyavg">Average Energy Use</Link>
        <Link className='a' to="/deviceenergy">Energy Use by Device</Link>
        <Link className='a' to="/propertyenergy">Energy Use by Property</Link>
      </div>
      <h1>Graphs</h1>
      <h3>Total Energy Consumption by Property (Monthly)</h3>
      <select onChange={(e) => setMonth(e.target.value)}>
        <option selected value={11}>November</option>
        <option value={12}>December</option>
      </select>
      <Chart className='chart' chartType="PieChart" data={data} options={options}/>
    </div>
  );
};

export default PropertyComparisonGraph;