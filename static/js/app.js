function init(){
    var selector = d3.select("#selDataset");

    d3.json("samples.json").then((data) =>{
      let testData = data;
        var subjectName = data.names;
        subjectName.forEach((ID) => {
            selector.append('option').text(ID).property('value', ID);
        });
    var initSample = subjectName[0];
    //test(initSample);
    updateCharts(initSample);
    updateDemoInfo(initSample);
    });
};

function updateDemoInfo(sample) {
  d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      var filteredSubject = metadata.filter(sampleObject => sampleObject.id == sample);
      var metaPanel = d3.select("#sample-metadata");
      metaPanel.html("");
      Object.entries(filteredSubject[0]).forEach(([key, value]) => {
          metaPanel.append("h6").text(`${key}: ${value}`)
      })
    });
};
  

function updateCharts(sample) {    
  d3.json("samples.json").then((data) => {
  var subject = data.samples;
  var filteredSubject = subject.filter(ID => ID.id == sample);
  var otu_ids = filteredSubject[0].otu_ids;
  var sample_values = filteredSubject[0].sample_values;
  var otu_labels = filteredSubject[0].otu_labels;

  var trace1 = {
    x: otu_ids,
    y: sample_values,
    text: otu_labels,
    mode: 'markers',
    marker: {
      size: sample_values,
      color: otu_ids
    }
  };
  var data = [trace1];
  var layout =  {

  };
  Plotly.newPlot("bubble",data,layout);
  
  var sliceSample = sample_values.slice(0,10).reverse();
  var slicedOtu = otu_ids.slice(0,10).map(ID =>ID).reverse();
  var slicedLabels = otu_labels.slice(0,10).reverse();

  var trace2 = {
    x: sliceSample,
    y: slicedOtu,
    text: slicedLabels,
    type: "bar",
    orientation: "h"
  };
  data2 = [trace2];
  var layout2 = {};
  Plotly.newPlot("bar",data2,layout2);
  });
};

function optionChanged(newSample) {
  //test(newSample);
  updateDemoInfo(newSample);
  updateCharts(newSample);
}

//test function
function test(sample){
  d3.json("samples.json").then((data)=>{
    let sampleData = data.metadata.filter(ID=>ID.id==sample) 
    //console.log(sampleData)
    //console.log(sampleData[0].age)
  })
};

init();