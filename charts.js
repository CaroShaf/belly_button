function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {

  // 3. Create a variable that holds the samples array. 
    var samples = data.samples;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var filterArray = samples.filter(sampleObj => sampleObj.id == sample);
    //  5. Create a variable that holds the first sample in the array.
    var result = filterArray[0];

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;
    // 7. Create the yticks for the bar chart.

    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last.

 
    // 8. Create the trace for the bar chart. 
    var trace1 = {
      x: sample_values.slice(0,10).reverse(),
      y: otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse(),
      text: otu_labels.slice(0,10).reverse(),
      type: "bar",
      orientation: 'h'
    };
     
    var barData = [trace1];
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      margin: { t: 30, l: 150 }
      };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);  


 // 1. Create the trace for the bubble chart.

 var trace2 = {
   x: otu_ids,
   y: sample_values,
   text: otu_labels,
   mode: "markers",
   marker: {color: otu_ids, size: sample_values, colorscale: "Earth"}
 }
 
 var bubbleData = [trace2];

// 2. Create the layout for the bubble chart.
var bubbleLayout = {
  title: 'Bacteria Cultures per Sample', 
  hovermode: 'closest',
  xaxis: {title:"OTU (Operational Taxonomic Unit) ID " +sample}  
};

// 3. Use Plotly to plot the data with the layout.

Plotly.newPlot('bubble', bubbleData, bubbleLayout);


// 1. create a variable that filters the metadata array 
// for an object in the array whose id property matches the ID number passed into buildCharts() function as the argument.
var metadata = data.metadata;
var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);

// 2. create a variable that holds the first sample in the array created in Step 2.
var weeklyFreq = resultArray[0].wfreq;


// 3. create a variable that converts the washing frequency to a floating point number.

// 4. Create the trace for the gauge chart.
var gaugeData = [
  {
    domain: { x: [0, 1], y: [0, 1] },
    title: {
      text: "Belly Button Washing Frequency <br>Scrubs per Week"
    },
    type: "indicator",

    mode: "gauge",
    gauge: {
      axis: {
        range: [0, 9],
        tickvals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        ticks: "outside"
      },

      steps: [
        { range: [0, 1], color: "EEDFE7" },
        { range: [1, 2], color: "#E2CBD2" },
        { range: [2, 3], color: "#D5B6BA" },
        { range: [3, 4], color: "#C9A4A2" },
        { range: [4, 5], color: "#BC998E" },
        { range: [5, 6], color: "#AF917A" },
        { range: [6, 7], color: "#A28B67" },
        { range: [7, 8], color: "#797B4C" },
        { range: [8, 9], color: "#5D673E" }
      ],
      threshold: {
        line: { color: "red", width: 4 },
        thickness: 1,
        value: weeklyFreq
      }
    }
  }
];
// 5. Create the layout for the gauge chart.
var gaugeLayout = {
  width: 600,
   height: 450,
   margin: { t: 100, r: 100, l: 100, b: 100 },
   line: {
   color: 'lightgray'
   },
 };


// 6. Use Plotly to plot the gauge data and layout.
Plotly.newPlot("gauge", gaugeData, gaugeLayout);
});
}
