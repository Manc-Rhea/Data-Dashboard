import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardSection from './components/DashboardSection';
import { Typography, Container } from '@mui/material';

function App() {
  const [data, setData] = useState(null);

  //fetch data from backend API
  useEffect(() => 
  {
    axios.get('http://localhost:3001/api/data').then((res) => setData(res.data));
  }, []);


 // shwoing loading while data is fetched
  if (!data) return <div>Loading...</div>;

  return (
  <Container maxWidth="lg" style={{ paddingTop: 32, paddingBottom: 32 }}>
    <Typography variant="h4" align="center" gutterBottom>
      Dashboard
    </Typography>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
      <DashboardSection title="Customer Type" rawData={data.customerType} labelKey="Cust_Type" />
      <DashboardSection title="Account Industry" rawData={data.accountIndustry} labelKey="Acct_Industry" />
      <DashboardSection title="Team" rawData={data.team} labelKey="Team" />
      <DashboardSection title="ACV Range" rawData={data.acvRange} labelKey="ACV_Range" />
    </div>
  </Container>
  
  );
}

export default App;
