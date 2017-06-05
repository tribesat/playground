/**
 *
 */

/**
 * Sleep function
 * Intended for use with await
 * example usage: await sleep(1 * 1000); // sleeps for 1 second
 *
 * @param {Number} ms number of milliseconds to sleep
 */
function sleep(ms) {
  return new Promise(res => setTimeout(res, ms));
}

/**
 * Mocks API calls
 */
function getTemp() {
  return Math.random();
}

/**
 * Start the line chart
 */
async function createLineChart() {
  // constants
  const SVG_WIDTH = 600;
  const SVG_HEIGHT = 300;
  const CHART_WIDTH = 600;
  const CHART_HEIGHT = 300;
  const MAX_VALS = 20;

  // set up elements
  const svg = d3.select('#line-chart').append('svg')
    .attr('width', SVG_WIDTH)
    .attr('height', SVG_HEIGHT);
  const g = svg.append('g');

  // set up scales
  const x = d3.scaleLinear()
    .range([0, CHART_WIDTH]);
  const y = d3.scaleLinear()
    .range([0, CHART_HEIGHT]);

  // set up lines
  const line = d3.line()
    .x((_, i) => x(i))
    .y(d => y(d));

  const data = [];
  let temp;

  const path = g.append('path')
   .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 1.5)
      .attr('d', line);

  while (true) {
    await sleep(.5 * 1000);

    temp = getTemp();
    data.push(temp);

    x.domain([0, data.length]);
    y.domain([0, d3.max(data)]);

    path
        .attr('d', line)
        .attr('transform', null)
      .transition()
        .attr('transform', 'translate(' + (data.length > MAX_VALS ?x(-1) : 0) + ')');

    if (data.length > MAX_VALS)
      data.shift();
  }
}

/**
 * Entry point to the app
 */
(function main() {
  createLineChart();
})();
