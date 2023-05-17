// Use the D3 library to read in samples.json from the URL 
const samples = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// function for initial landing page
function init() {

let dropDown = d3.select("#selDataset");

// Fetch the JSON data and console log it
d3.json(samples).then((data)=> {
  let sampleData = data.names;

  for(let i = 0; i < sampleData.length; i++) {
    dropDown.append("option").text(sampleData[i]).property("value", sampleData[i]);
  };

  console.log(sampleData);
  let first = sampleData[0];
  
  buildChart(first);
  buildMetadata(first);

});
}

// build metadata function
function buildMetadata(sample) {

  d3.json(samples).then((data)=> {
    let metaData = data.metadata;
    // look for oject with same sample number 
    let resultData = metaData.filter((sampleNum)=> sampleNum.id == sample);
    let sampResult = resultData[0];
    let demoPanel = d3.select("#sample-metadata");
    demoPanel.html("");
    Object.enteries(sampResult).forEach(([key, value]) => {demoPanel.append("h6").text(`${key}: ${value}`);
  });
   
  });
}

// bar chart function
function forCharts(sample) {
  
  // fetch data for plots
  d3.json(samples).then((data)=> {
    let sampleInfo = data.samples;

    let filterSamples = sampleInfo.filter(sampObj => 
      sampObj.id == sample);
    let resultData = filterSamples[0];
    
    // variables for charts
    let values = resultData.sample_values;
    let otu_ids = resultData.otu_ids;
    let otu_labels = resultData.otu_labels;

    // bar chart
    let trace1 = [{
      x: values.slice(0,10).reverse(),
      y: otu_ids.slice(0,10).map(otu_ids => `OTU ${otu_ids}`),
      text: otu_labels.slice(0,10).reverse(),
      type: "bar",
      orientation: "h"
    }
  ];
    let traceLayout = {
      title: "Top 10 OTUs",
      margin: {t: 30, l: 100}
    }
    Plotly.newPlot("bar", trace1, traceLayout);
    

  // bubble chart

  let trace2 = {
    x_axis: "OTU ID",
    mode: "markers"
  }

  var bubblelayout = [{
    x: otu_ids,
    y: values,
    height: 600,
    width: 600,
    mode: "markers",
    marker: {
      color: otu_ids,
      size: values
    }
  }];
  
  Plotly.newPlot('bubble', bubblelayout, trace2);
});

}

init();