const { ipcRenderer } = require('electron');

//inputlari oxuyur ve indes.js e gonderir
document.getElementById('inputForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const a0 = document.getElementById('a0').value;
    const n_max = document.getElementById('n_max').value;
    const i_max = document.getElementById('i_max').value;
    const delta_T = document.getElementById('delta_T').value;
    const omega = document.getElementById('omega').value; 

    

    let A = []
    let B = []

    for(var j = 1;j <= n_max;j++){
        A.push(document.getElementById(`a${j}`).value)
        B.push(document.getElementById(`b${j}`).value)
    }

    ipcRenderer.send('form-submission', { a0, n_max, i_max, delta_T, omega ,A ,B });
});
//nmax sayda a_nmax b_nmax inputu yaradir
document.getElementById('btnbtn').addEventListener('click',function(event) {
    event.preventDefault()

    const fs = require('fs');
    const path = require('path');
    
    const fileName = 'signal.txt';
    const filePath = path.join(__dirname, fileName);

    const content = fs.readFileSync(filePath, 'utf-8')
    
    const lines = content.split('\n');

    const data = {
        index: null,
        value: []
    };
    
    // Her satırı işleyelim
    lines.forEach(line => {
        // Her satırı ':' karakterinden ikiye bölelim
        const parts = line.split(': ');
    
        // İlk kısım index, ikinci kısım değer olacak
        // Diziyi tamsayıya dönüştürelim
        const value = parseFloat(parts[1]); // Diziyi ondalıklı sayıya dönüştürelim
    
        // Veriyi objeye ekleyelim
        data.index = data.value.length
        data.value.push(value);
    });
    
     

    ipcRenderer.send('form', data);

    ipcRenderer.send('Lastpage');

})
document.getElementById('n_max').addEventListener('input', function() {
    var n_max = parseInt(this.value);
    var dynamicInputs = document.getElementById('nmaxcon');
    dynamicInputs.innerHTML = ''; // Clear previous inputs

    for (var i = 1; i <= n_max; i++) {
        var labelA = document.createElement('label');
        labelA.innerHTML = 'a' + i + ':';
        dynamicInputs.appendChild(labelA);

        var inputA = document.createElement('input');
        inputA.type = 'text';
        inputA.id = 'a' + i;
        inputA.name = 'a' + i;
        dynamicInputs.appendChild(inputA);

        var labelB = document.createElement('label');
        labelB.innerHTML = 'b' + i + ':';
        dynamicInputs.appendChild(labelB);

        var inputB = document.createElement('input');
        inputB.type = 'text';
        inputB.id = 'b' + i;
        inputB.name = 'b' + i;
        dynamicInputs.appendChild(inputB);

        dynamicInputs.appendChild(document.createElement('br'));
    }
});
//btn e clickleyende btn eventini index.js  e gonderir
document.getElementById('btn').addEventListener('click', () => {
    ipcRenderer.send('openNewWindow');
});
 

ipcRenderer.on('objectdata', function(event, arg) {
    ipcRenderer.send('objectdata',arg)
});
