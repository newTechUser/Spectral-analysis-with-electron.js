const { app, BrowserWindow, ipcMain, ipcRenderer } = require('electron');
const path = require('path');
const fs = require('fs')
 
//esas pencere parametrleri daxil edilir ve acilir
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 500,
    webPreferences: {
      nodeIntegration: true,
      sandbox:false, 
      contextIsolation: false 
    }
  });
  mainWindow.loadFile('index.html');
}

app.whenReady().then(createWindow);

//btn e clickleyende yeni pencere acir
ipcMain.on('openNewWindow', () => {
  const newWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
        sandbox:false,
        contextIsolation: false
      }
  });
  newWindow.loadFile('newWindow.html');
});

ipcMain.on('Lastpage', () => {
  const newWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
        sandbox:false,
        contextIsolation: false
      }
  });
  newWindow.loadFile('Lastpage.html');
});


ipcMain.on('form-submission', (event, arg) => {
  // Form verilerini alıp konsola yazdırma
  // console.log("Form verileri:", arg);

  var result = 0;
  let X = []

   
  arg.omega = parseFloat(arg.omega);
  arg.delta_T = parseFloat(arg.delta_T);
  arg.a0 = parseFloat(arg.a0);
  arg.i_max = parseFloat(arg.i_max);
  arg.n_max = parseFloat(arg.n_max);

  for(var i = 1; i<=arg.i_max;i++){
    result = 0;
    for(var N = 1;N<arg.n_max+1;N++){
      result += (arg.A[N-1]*Math.cos(N*arg.omega*i*arg.delta_T)
      +arg.B[N-1]*Math.sin(N*arg.omega*i*arg.delta_T));
    }
    result+=(arg.a0/2);
    X.push(result)
  }
  // İşlenmiş veriyi geri gönderme (opsiyonel)

  
  
  const object = {
    parameter:arg.i_max,
    function:X,
    Array1:arg.A,
    Array2:arg.B,
    delta_T:arg.delta_T,
    omega:arg.omega,
    n_max:arg.n_max
  }
  
  event.reply('form-submission-reply',object);

  ipcMain.on('chat',(event,data) => {
    event.reply('object',object)
  })

});


ipcMain.on('form',(event,data) => {
  event.preventDefault()
  ipcMain.on('chat2',(event,arg) => {
    event.reply('object2',data)
  })
})
