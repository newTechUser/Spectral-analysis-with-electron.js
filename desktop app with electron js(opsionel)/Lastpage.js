const { ipcRenderer } = require("electron");

 
ipcRenderer.send('chat2',"request")

ipcRenderer.on('object2', (event, object) => {
  console.log(object.index);
  for(var i = 1;i<=object.index;i++){
    var trace3 = {
        x: i,
        y: object.value,
        mode: 'lines+markers' 
      };
  }
    
    var data = [trace3 ];

    var layout = {
      title:'Asılılıq qrafiki'
    };
    Plotly.newPlot('myDiv', data, layout);
});




