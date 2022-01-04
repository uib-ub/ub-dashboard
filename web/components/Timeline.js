import React from 'react';
import { useD3 } from '../lib/hooks/useD3';
import * as d3 from 'd3';
import { flattenDeep } from 'lodash-es'

const BarChart = ({ data }) => {
  const today = new Date()
  const alldates = flattenDeep([...data.slot.map(s => s.d)]).filter(Boolean).sort().map(date => new Date(date))
  alldates.push(today)
  const slot = [alldates[0], today]
  const year_height = 50
  const width = 2000
  const iconsSvgPath = ({
    "infoCircle": "M1152 1376v-160q0-14-9-23t-23-9h-96v-512q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v160q0 14 9 23t23 9h96v320h-96q-14 0-23 9t-9 23v160q0 14 9 23t23 9h448q14 0 23-9t9-23zm-128-896v-160q0-14-9-23t-23-9h-192q-14 0-23 9t-9 23v160q0 14 9 23t23 9h192q14 0 23-9t9-23zm640 416q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z",
    "bell": "M912 1696q0-16-16-16-59 0-101.5-42.5t-42.5-101.5q0-16-16-16t-16 16q0 73 51.5 124.5t124.5 51.5q16 0 16-16zm816-288q0 52-38 90t-90 38h-448q0 106-75 181t-181 75-181-75-75-181h-448q-52 0-90-38t-38-90q50-42 91-88t85-119.5 74.5-158.5 50-206 19.5-260q0-152 117-282.5t307-158.5q-8-19-8-39 0-40 28-68t68-28 68 28 28 68q0 20-8 39 190 28 307 158.5t117 282.5q0 139 19.5 260t50 206 74.5 158.5 85 119.5 91 88z"
  })

  const colors = {
    "Avhandlingsportalen": "#63b598",
    "Ludvig Holbergs skrifter": "#ce7d78",
    "Birgitta": "#ea9e70",
    "Marcus": "#a48a9e",
    "BOAP": "#c6e1e8",
    "SAMLA": "#f2510e",
    "ELMCIP & CELL": "#51aed9",
    "Wittgenstein Archives (WAB)": "#00f87c",
    "MeLOD": "#d36647",
    "Hordanamn": "#ce00be",
    "Søk og skriv": "#0f5997",
    "Grieg Research Guide": "#880977",
    "CLARINO": "#651be6",
    "Skeivt arkiv": "#01ac53",
    "Språksamlingane": "#e1cf3b",
  }

  const ref = useD3(
    (svg) => {
      const MARGIN = 40;
      const TITLE_HEIGHT = 200;
      const YEARS_DELTA = slot[1].getFullYear() - slot[0].getFullYear();
      const GRAPH_HEIGHT = year_height * YEARS_DELTA;
      const AXIS_WIDTH = 50;

      const timelines = data.timelines.map(g => g.timelines).reduce((a, b) => a.concat(b), []);

      // Sizes related to data count
      const LINE_SPACING = (width - AXIS_WIDTH) / (timelines.length + 1);
      const HEIGHT = MARGIN * 4 + TITLE_HEIGHT + GRAPH_HEIGHT;

      svg.append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('overflow', 'auto')
        .attr('width', width)
        .attr('height', HEIGHT)
        .attr('fill', 'white');
      const defs = svg.append('defs');
      const graph = svg.append('g')
        .attr("transform", `translate(${MARGIN},${MARGIN + TITLE_HEIGHT})`)
        .attr('font-family', 'sans-serif');

      const timeScale = d3.scaleTime().domain(slot).range([0, GRAPH_HEIGHT]);

      const infoIcon = defs.append('g').attr('id', 'info');
      infoIcon.append('circle')
        .attr('r', 7)
        .attr('fill', '#333')
        .attr('cx', 11)
        .attr('cy', 11);
      /* infoIcon.append('path')
        .attr('d', iconsSvgPath.infoCircle)
        .attr('fill', '#333')
        .attr('transform', 'scale(0.012)');
    
      const bellIcon = defs.append('g')
        .attr('id', 'bell')
        .append('path')
        .attr('d', iconsSvgPath.bell)
        .attr('fill', '#333')
        .attr('transform', 'scale(0.012)');
    */
      // Time Axis & Grid
      const timeAxis = d3.axisLeft(timeScale);
      timeAxis.ticks(d3.timeYear.every(year_height < 30 ? (year_height < 15 ? 1 : 1) : 1));
      graph.append('g')
        .attr('id', 'graph')
        .classed("y-axis", true)
        .attr("transform", `translate(${AXIS_WIDTH},0)`)
        .style("font-size", "12px")
        .call(timeAxis);

      graph.selectAll("g.y-axis g.tick")
        .append("line")
        .classed("grid-line", true)
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", (timelines.length + 1) * LINE_SPACING)
        .attr("y2", 0)
        .attr('stroke', "darkgray")
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '5,2')
        .attr('stroke-opacity', 0.7);

      if (slot[1] == today) {
        graph.append('rect')
          .attr('x', 0)
          .attr('y', timeScale(today))
          .attr('width', width - MARGIN)
          .attr('height', timeScale.range()[1] - timeScale(today) + 20)
          .attr('fill', 'lightgrey')
          .attr('fill-opacity', 0.3)

        graph.append('text')
          .text('THE FUTURE')
          .attr('font-size', (timeScale.range()[1] - timeScale(today)) / 2)
          .attr('fill', 'gainsboro')
          .attr('text-anchor', 'middle')
          .attr('font-weight', 'bold')
          .attr('x', (width - MARGIN) / 2)
          .attr('y', (timeScale(today) + 20 + timeScale.range()[1]) / 2 + 20)
      }

      // Frameworks & Apps
      const frameworks = graph.selectAll()
        .data(timelines)
        .enter()
        .append('g')
        .attr('id', 'product')
        .attr('transform', (d, i) => `translate(${AXIS_WIDTH + (i + 1) * LINE_SPACING},0)`);

      frameworks
        .append('text')
        .attr('transform', (d, i) => `rotate(-90 0 0)`)
        .text((tl) => tl.timelineName)
        .attr('font-size', 14)
        .attr('text-anchor', 'middle')
        .attr('font-weight', 'bold')
        .attr('x', (tl, i) => -timeScale(new Date(tl.events.versions[0][0])) + (tl.timelineName.length / 2) * 6 + 30)
        .attr('y', 5)

      frameworks.append('line')
        .attr('x1', 0)
        .attr('y1', (tl, i) => timeScale(new Date(tl.events.versions[0][0])))
        .attr('x2', 0)
        .attr('y2', (tl, i) => timeScale(tl.events.versions[1][0] === "" ? new Date(today) : new Date(tl.events.versions[1][0])))
        .attr('stroke', (tl) => colors[tl.timelineName] || 'black')
        .attr('stroke-width', 14);

      const versions = frameworks
        .selectAll('.version')
        .data((tl) => tl.events.versions)
        .enter();

      versions.append('use')
        .attr('href', '#info')
        .attr('x', -11)
        .attr('y', (version) => timeScale(version[0] != "" ? new Date(version[0]) : new Date(today)) - 11);

      /* versions.append('text')
        .text((version) => version[1])
        .attr('font-size', 11)
        .attr('x', 14)
        .attr('y', (version) => timeScale(version[0] != "" ? new Date(version[0]) : new Date(today)) + 3); */

      /* const events = frameworks
        .selectAll('.event')
        .data((tl) => tl.events.milestones)
        .enter();
     
      const bellTip = d3Tip().attr('class', 'd3-tip').html((milestone) => milestone[1]);
      svg.call(bellTip);
     
      events.append('use')
        .attr('href', '#bell')
        .attr('x', -30)
        .attr('y', (milestone) => timeScale(new Date(milestone[0])) - 11)
        .on('mouseover', bellTip.show)
        .on('mouseout', bellTip.hide); */

      return svg.node();
    })

  return (
    <svg
      ref={ref}
      style={{
        height: 2500,
        width: 2000,
        marginRight: "0px",
        marginLeft: "0px",
      }}
    >
    </svg>
  );
}

export default BarChart;