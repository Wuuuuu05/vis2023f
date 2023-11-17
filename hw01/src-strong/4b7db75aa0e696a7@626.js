import define1 from "./a33468b95d0b15b0@817.js";

function _1(md){return(
md`<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">HW1 Strong baseline</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# HW1 Strong baseline

`
)}

function _key(Swatches,chart){return(
Swatches(chart.scales.color, {columns: "180px"})
)}

function _chart(d3,data)
{
  // Specify the chart’s dimensions.
  const width = 1500;
  const height = 600;
  const marginTop = 20;
  const marginRight = 10;
  const marginBottom = 20;
  const marginLeft = 10;

  // Transform the data to make it suitable for stacking.
  const stackedData = d3.stack()
    .keys(["作業一", "作業二", "作業三", "作業四", "作業五", "作業六", "作業七", "作業八", "作業九", "作業十"])
    .order(d3.stackOrderNone) // Maintain the input order
    .offset(d3.stackOffsetNone) // Stack values directly
    (data);

  // Prepare the scales for positional and color encodings.
  const x = d3.scaleLinear()
    .domain([1, 120]) // Assuming "序號" ranges from 1 to 120
    .range([marginLeft, width - marginRight]);

  const y = d3.scaleLinear()
    .domain([0, 100]) // Assuming y-axis range is 0 to 100
    .range([height - marginBottom, marginTop]);
  
  const color = d3.scaleOrdinal()
    .domain(["作業一", "作業二", "作業三", "作業四", "作業五", "作業六", "作業七", "作業八", "作業九", "作業十"])
    .range(d3.schemeTableau10);

  // Construct an area shape.
  const area = d3.area()
    .x((d, i) => x(i + 1))
    .y0(d => y(d[0]))
    .y1(d => y(d[1]));

  // Create the SVG container.
  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto;");

  // Create a tooltip div
  const tooltip = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  // Append a path for each series with tooltip events.
  svg.append("g")
    .selectAll()
    .data(stackedData)
    .join("path")
    .attr("fill", d => color(d.key))
    .attr("d", area)
    .append("title")
    .text(d => d.key)
    .on("mouseover", (event, d) => {
      const total = d3.sum(d, (data) => data[1] - data[0]);
      tooltip.transition()
        .duration(200)
        .style("opacity", 0.9);
      tooltip.html(`<strong>${d.key}</strong><br>Total: ${total.toFixed(2)}`)
        .style("left", (event.pageX) + "px")
        .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", () => {
      tooltip.transition()
        .duration(500)
        .style("opacity", 0);
    });
  
  
  
  // Add the y-axis, remove the domain line, add grid lines, and a label.
  svg.append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y).ticks(height / 80))
    .call(g => g.select(".domain").remove())
    .call(g => g.selectAll(".tick line").clone()
      .attr("x2", width - marginLeft - marginRight)
      .attr("stroke-opacity", 0.1))
    .call(g => g.append("text")
      .attr("x", -marginLeft)
      .attr("y", 10)
      .attr("fill", "currentColor")
      .attr("text-anchor", "start")
      .text("↑ Stacked Scores"));

  // Append a path for each series.
  svg.append("g")
    .selectAll()
    .data(stackedData)
    .join("path")
    .attr("fill", d => color(d.key))
    .attr("d", area)
    .append("title")
    .text(d => d.key);

  // Append the horizontal axis.
  svg.append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x).tickValues(d3.range(1, 121)).tickSizeOuter(0));

  // Return the chart with the color scale as a property (for the legend).
  return Object.assign(svg.node(), { scales: { color } });
}


function _data(FileAttachment){return(
FileAttachment("data.csv").csv({typed: true})
)}

function _6(md){return(
md`Using [Observable Plot](https://observablehq.com/plot)’s concise API, you can create a similar chart with an [area mark](https://observablehq.com/plot/marks/area). See the [Plot: Stacked area chart](https://observablehq.com/@observablehq/plot-stacked-area-chart?intent=fork) example notebook.`
)}

function _data1(__query,FileAttachment,invalidation){return(
__query(FileAttachment("data.csv"),{from:{table:"data"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["data.csv", {url: new URL("./files/af98ff083264478d2741db1a8bff220d211812b68bebdb1ad1cdbbdb177e3b09f85ee070c112fcbc302715e19abc034bfc2a0aa4c340dc51f5abd6b4b9fbccce.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("key")).define("key", ["Swatches","chart"], _key);
  main.variable(observer("chart")).define("chart", ["d3","data"], _chart);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  const child1 = runtime.module(define1);
  main.import("Swatches", child1);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("data1")).define("data1", ["__query","FileAttachment","invalidation"], _data1);
  return main;
}
