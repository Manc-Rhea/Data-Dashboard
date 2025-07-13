import React from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import BarChart from './BarChart';
import DoughnutChart from './DoughnutChart';
import DataTable from './DataTable';
import * as d3 from 'd3'; 


const ChartCard = ({ title, groupedData }) => 
{
    const allLabels = new Set();  //unique labels
  Object.values(groupedData).forEach(q => Object.keys(q).forEach(l => allLabels.add(l)));
  const legendItems = Array.from(allLabels);

  return (
    <Card style={{ marginBottom: 40, padding: '16px', minHeight: '500px' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>{title}</Typography>

      {/* Legends above bar chart */}
      <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap" mb={2}>
      {legendItems.map((label, i) => (
    <Box key={label} display="flex" alignItems="center" gap={1}>
      <Box width={16} height={16} borderRadius={2} style={{ backgroundColor: d3.schemeCategory10[i % 10] }} />
      <Typography variant="body2">{label}</Typography>
    </Box>
      ))}
      </Box>

        {/*Chart section */}
    <Grid container spacing={5} alignItems="flex-start">
    <Grid item xs={12} md={6}>
  <Typography variant="subtitle1" align="center" gutterBottom>
    Quarterly ACV Breakdown
  </Typography>
  <BarChart groupedData={groupedData} />
  </Grid>
  <Grid item xs={12} md={6}>
  <Typography variant="subtitle1" align="center" gutterBottom>
    Total ACV Share
  </Typography>
  <DoughnutChart groupedData={groupedData} />
</Grid>
  </Grid>

  {/* Add Table below charts */}
  <Box mt={4}>
  <Typography variant="subtitle1" align="center" gutterBottom>
    Summary Table
  </Typography>
  <DataTable groupedData={groupedData} />
</Box>
</CardContent>
</Card>
  );
};

export default ChartCard;
