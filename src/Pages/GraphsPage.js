import React, { useEffect, useState } from 'react';
import Navigation from '../Components/Navigation';
import "../Navigation.scss"
import AdminPage from './AdminPage'
import axios from 'axios'
import { Chart } from 'react-google-charts'
import EnergyPerDayGraph from '../Graphs/EnergyPerDayGraph';
import AvgEnergyUseGraph from '../Graphs/AvgEnergyUseGraph';
import DeviceConsumptionGraph from '../Graphs/DeviceConsumptionGraph';
import PropertyComparisonGraph from '../Graphs/PropertyComparisonGraph';
import MonthlyComparisonGraph from '../Graphs/MonthlyComparisonGraph';
import "../Navigation.scss"
import { Link } from 'react-router-dom';

const GraphsPage = () => {
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
      <MonthlyComparisonGraph />
    </div>
  );
};

export default GraphsPage;