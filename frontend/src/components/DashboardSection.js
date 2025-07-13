import React from 'react';
import ChartCard from './ChartCard';

const DashboardSection = ({ title, rawData, labelKey }) => 
{
const grouped = {};


//show data by quarter and sum ACV values 
  rawData.forEach((item) => {
    const quarter = item.closed_fiscal_quarter;
    const label = item[labelKey];
    if (!grouped[quarter]) grouped[quarter] = {};
    grouped[quarter][label] = (grouped[quarter][label] || 0) + item.acv;
  });


//showing data to chart card
  return <ChartCard title={title} groupedData={grouped} />;

  
};

export default DashboardSection;