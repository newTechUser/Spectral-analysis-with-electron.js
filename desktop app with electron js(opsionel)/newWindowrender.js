const { ipcRenderer } = require("electron");
const CryptoJS = require('crypto-js');

ipcRenderer.send('chat',"request")

ipcRenderer.on('object', (event, object) => {
  // console.log(object);
  for(var i = 1;i<=object.parameter;i++){
    var trace3 = {
        x: i,
        y: object.function,
        mode: 'lines+markers' 
      };
  }
    
    var data = [trace3 ];

    var layout = {
      title:'Asılılıq qrafiki'
    };
    writeToSignalAnotherFile(object.Array1,object.Array2,object.delta_T,object.omega,object.n_max)
    writeToSignalFile(object.parameter,object.function)
    Plotly.newPlot('myDiv', data, layout);
});
 
function writeToSignalFile(index, parameter) {
  const fs = require('fs');
  const path = require('path');

  const fileName = 'signal.txt';
  const filePath = path.join(__dirname, fileName);
  let content = '';
  // parameter objesinin her bir özelliğini döngüyle alarak content'e ekleyelim
  for (let i = 0; i < index; i++) {
    const propValue = parameter[i];
    content += `${i}: ${propValue}\n`;
  }

  // Dosyanın var olup olmadığını kontrol et
  if (fs.existsSync(filePath)) {
    // Dosya varsa içeriğini sil
    fs.writeFileSync(filePath, '');
  }
    fs.writeFileSync(filePath, content);
  // Yeni içeriği dosyaya yaz
}
function writeToSignalAnotherFile(Array1,Array2,delta_T,omega,n_max) {
  const fs = require('fs');
  const path = require('path');

  const fileName = 'Readme.txt';
  const filePath = path.join(__dirname, fileName);
  let content = '';
  // parameter objesinin her bir özelliğini döngüyle alarak content'e ekleyelim

    content += `A: ${Array1} | B: ${Array2} | delta_T: ${delta_T} | omega: ${omega} | n_max: ${n_max}`;

console.log(Array1);
  // Dosyanın var olup olmadığını kontrol et
  if (fs.existsSync(filePath)) {
    // Dosya varsa içeriğini sil
    fs.writeFileSync(filePath, '');
  }
  let Content = CryptoJS.AES.encrypt((content), 'sifre').toString()
  fs.writeFileSync(filePath, Content);
  // Yeni içeriği dosyaya yaz
}


