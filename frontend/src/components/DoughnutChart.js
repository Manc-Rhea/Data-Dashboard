import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const DoughnutChart = ({ groupedData }) => {
  const ref = useRef();
  useEffect(() => 
  {
    const totals = {};
    Object.values(groupedData).forEach((cat) => 
    {
      for (const [k, v] of Object.entries(cat)) 
      {
        totals[k] = (totals[k] || 0) + v;
      }
    });
    const data = Object.entries(totals);
    const svg = d3.select(ref.current);
    svg.selectAll('*').remove();

    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;
    const color = d3.scaleOrdinal(d3.schemeCategory10);
    const pie = d3.pie().value(d => d[1]);
    const arc = d3.arc().innerRadius(70).outerRadius(radius);

    svg.attr('viewBox', `0 0 ${width} ${height}`);
    const g = svg.append('g').attr('transform', `translate(${width / 2},${height / 2})`);
    const pieData = pie(data);

    g.selectAll('path').data(pieData).join('path').attr('d', arc).attr('fill', (d, i) => color(i));
    g.selectAll('text').data(pieData).join('text').attr('text-anchor', 'middle').style('font-size', '10px').style('fill', 'white').style('pointer-events', 'none')
      .each(function(d, i) {
  const lines = [`${d.data[0]}`, `${Math.round(d.data[1] / 1000)}K`];
  //smaller size vertical offset
  const isSmall = (d.endAngle - d.startAngle) < 0.2;
  const adjustY = isSmall ? (i % 2 === 0 ? -10 : 10) : 0;

  lines.forEach((line, j) => 
  {
    d3.select(this.parentNode).append('text').attr('transform', `translate(${arc.centroid(d)[0]},${arc.centroid(d)[1] + j * 12 - 6 + adjustY})`)
      .attr('text-anchor', 'middle').style('font-size', '10px').style('fill', 'white').text(line);
  });
  d3.select(this).remove();
});
  }, [groupedData]);

  return <svg ref={ref} style={{ width: '100%', height: 400 }} />;
};

export default DoughnutChart;