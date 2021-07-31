function init(){
    var selector = d3.select("#selDataset");

    d3.json("samples.json").then((data) =>{
      let testData = data;
        var subjectName = data.names;
        subjectName.forEach((ID) => {
            selector.append('option').text(ID).property('value', ID);
        });
    var initSample = subjectName[0];
    test(initSample);
    //updateCharts(firstbutton);
    //updateMetadata(firstbutton);
    });
};

function optionChanged(newSample) {
  test(newSample);
  //updateMetadata(newSample);
  //updateCharts(newSample);
}

function test(sample){
  d3.json("samples.json").then((data)=>{
    let sampleData = data.metadata.filter(ID=>ID.id==sample) 
    console.log(sampleData)
    console.log(sampleData[0].age)
  })
  //console.log(sample);
};

init();