
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const DataTable = ({ groupedData }) => 
  
  {
  const quarters = Object.keys(groupedData);  //getting labels and quarters
  const categories = Array.from(new Set(quarters.flatMap(q => Object.keys(groupedData[q])))
  );

  const totals = {};
  categories.forEach(cat => 
   {
    totals[cat] = 0;
    quarters.forEach(q => 
    {
      totals[cat] += groupedData[q][cat] || 0;
    });
  });

  return (


    <TableContainer component={Paper}>
    <Table size="small">
    <TableHead>
      <TableRow>
      <TableCell>Category</TableCell>
      {quarters.map(q => <TableCell key={q} align="right">{q}</TableCell>)}
      <TableCell align="right"><strong>Total</strong></TableCell>
    </TableRow>
    </TableHead>
  <TableBody>
    {categories.map(cat => (
      <TableRow key={cat}>
        <TableCell component="th" scope="row">{cat}</TableCell>
        {quarters.map(q => (
          <TableCell key={q} align="right">{groupedData[q][cat] ? Math.round(groupedData[q][cat]) : '-'}</TableCell>
        ))}
        <TableCell align="right"><strong>{Math.round(totals[cat])}</strong></TableCell>
      </TableRow>
    ))}
  </TableBody>
    </Table>
    </TableContainer>

  );

};

export default DataTable;