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
    //updateMetadata(firstbutton);
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

  });
};

function optionChanged(newSample) {
  //test(newSample);
  //updateMetadata(newSample);
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