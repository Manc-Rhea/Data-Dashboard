import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const BarChart = ({ groupedData }) => {
const ref = useRef();

useEffect(() => 
{

    const data = Object.entries(groupedData).map(([quarter, categories]) => {
      return { quarter, ...categories };
    });
    const labels = Object.keys(data[0]).filter((k) => k !== 'quarter');
    const quarters = data.map((d) => d.quarter);
    const svg = d3.select(ref.current);
    svg.selectAll('*').remove();

//chart measures
    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 50, left: 60 };

    const x = d3.scaleBand().domain(quarters).range([margin.left, width - margin.right]).padding(0.3);
    const y = d3.scaleLinear().domain([0, d3.max(data, d => labels.reduce((a, l) => a + (d[l] || 0), 0))])
      .nice().range([height - margin.bottom, margin.top]);

    const color = d3.scaleOrdinal(d3.schemeCategory10);


    
    const stack = d3.stack().keys(labels);
    const series = stack(data);

    svg.attr('viewBox', `0 0 ${width} ${height}`);

    svg.append('g').call(g =>
      g.selectAll('g').data(series).join('g').attr('fill', (d, i) => color(i)).selectAll('rect').data(d => d).join('rect')
        .attr('x', d => x(d.data.quarter)).attr('y', d => y(d[1])).attr('height', d => y(d[0]) - y(d[1])).attr('width', x.bandwidth())
    );

    svg.append('g').attr('transform', `translate(0,${height - margin.bottom})`).call(d3.axisBottom(x));

    svg.append('g').attr('transform', `translate(${margin.left},0)`).call(d3.axisLeft(y));
  }, [groupedData]);

  return <svg ref={ref} style={{ width: '100%', height: 400 }} />;
};

export default BarChart;