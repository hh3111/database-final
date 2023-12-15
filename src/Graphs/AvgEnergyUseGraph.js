import React, { useEffect, useState } from 'react';
import Navigation from '../Components/Navigation';
import "../Navigation.scss"
import axios from 'axios'
import { Chart } from 'react-google-charts'
import { Link } from 'react-router-dom';

const AvgEnergyUseGraph = () => {
  const [data, setData] = useState([])
  const [month, setMonth] = useState(11)

  const options = {
    title: "Average Rolling Energy Use (Monthly)",
    chartArea: { width: "50%" },
    hAxis: {
      title: "Day of the Month",
      minValue: 1,
    },
    vAxis: {
      title: "Energy Consumption",
    },
  }

  useEffect(() => {
    axios.post('http://localhost:3001/dataquery', {
      query: `SELECT DAY(timestamp) AS day, SUM(value) AS sum FROM Data WHERE MONTH(timestamp) = '${month}' GROUP BY day`
    }).then((response) => {
      const energyData = [['Day', 'Rolling Average']]
      const tempdata = response.data
      tempdata.map(function (element) {
        energyData.push([parseInt(element.day), parseFloat(element.sum)])
      })
      energyData.sort(function (a, b) {
        return a[0] - b[0];
      });
      var avg = 0
      for (let i = 1; i < energyData.length; i++) {
        avg = avg * (i - 1)
        avg = avg + energyData[i][1]
        avg = avg / i
        energyData[i][1] = avg
      }
      setData(energyData)
    })

  }, [month]);

  return (
    <div className='jsondata'>
      <Navigation />
      <div className='nav'>
        <Link className='a' to="/energyday">Energy Use by Day</Link>
        <Link className='a' to="/energyavg">Average Energy Use</Link>
        <Link className='a' to="/deviceenergy">Energy Use by Device</Link>
        <Link className='a' to="/propertyenergy">Energy Use by Property</Link>
      </div>
      <h1>Graphs</h1>
      <h3>Average Rolling Energy Use (Monthly)</h3>
      <select onChange={(e) => setMonth(e.target.value)}>
        <option selected value={11}>November</option>
        <option value={12}>December</option>
      </select>
      <Chart className='chart' chartType="LineChart" data={data} options={options} />
    </div>
  );
};

export default AvgEnergyUseGraph;