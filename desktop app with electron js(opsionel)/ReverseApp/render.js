const CryptoJS = require('crypto-js');

const A = document.getElementById('btn')
const B = document.getElementById('btnbtn')



const fs = require('fs')
const path = require('path')
const filename = 'signal.txt'
const fileName = 'Readme.txt'
const filePath = path.join('../',filename)
const filePath2 = path.join('../',fileName)



A.addEventListener('click',function (e) {
    e.preventDefault()
    let content = fs.readFileSync(filePath,'utf-8')
    let content2 = CryptoJS.AES.decrypt(fs.readFileSync(filePath2,'utf-8'), 'sifre').toString(CryptoJS.enc.Utf8)
    
    const lines = content.split('\n');
    const lines2 = content2.split('|');
    
    const data = {
        index: null,
        value: []
    };
    const data2 = {
        A:[],
        B:[],
        delta_T:null,
        omega:null,
        n_max:null
    }
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
    
    const Getdata = []
    lines2.forEach(line2 => {
        const parts2 = line2.split(':')
        // console.log(parts2);
        
        Getdata.push((parts2[1]))
    });
    let key1 = Getdata[0].split(',')
    let key2 = Getdata[1].split(',')

    let data_1 = []
    let data_2 = []
    let data_3  = parseFloat(Getdata[2]);
    let data_4 = parseFloat(Getdata[3]);
    let data_5 = parseFloat(Getdata[4]);

    key1.forEach(key => {
        data_1.push(parseFloat(key))
    })
    key2.forEach(key => {
        data_2.push(parseFloat(key))
    })

    let A_value = document.getElementById('A')
    let delta_T = document.getElementById('Delta_T').value
    let omega = document.getElementById('Omega').value
    let n_max = document.getElementById('N_Max').value
    var result = 0;
    let Array = []
    let Array1=[]

    omega = parseFloat(omega);
    delta_T = parseFloat(delta_T);
    var i_max = parseFloat(data.index);
    n_max = parseFloat(n_max);
    for(var n = 1;n<=n_max;n++){
        result = 0
        for(var i = 1; i<i_max+1;i++){
            result += ((2/i_max)*((data.value[i-1]))*(Math.cos(n*omega*i*delta_T)))
        }
        // console.log(result,Math.round(result),Math.trunc(result));
        Array.push(Math.round(result))
    }
    if(n_max == data_5 && delta_T == data_3 && omega == data_4){
        A_value.innerHTML = `A[${data_1}]`
    }
    else{
        A_value.innerHTML = `A[${Array}]`
    }
    // console.log(Array);
})

B.addEventListener('click',function (e) {
    e.preventDefault()
    let content = fs.readFileSync(filePath,'utf-8')
    let content2 = CryptoJS.AES.decrypt(fs.readFileSync(filePath2,'utf-8'), 'sifre').toString(CryptoJS.enc.Utf8)


    const lines = content.split('\n');
    const lines2 = content2.split('|');

    const data = {
        index: null,
        value: []
    };
    const data2 = {
        A:[],
        B:[],
        delta_T:null,
        omega:null,
        n_max:null
    }
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

    const Getdata = []
    lines2.forEach(line2 => {
        const parts2 = line2.split(':')
        // console.log(parts2);
        
        Getdata.push((parts2[1]))
    });
    let key1 = Getdata[0].split(',')
    let key2 = Getdata[1].split(',')

    let data_1 = []
    let data_2 = []
    let data_3  = parseFloat(Getdata[2]);
    let data_4 = parseFloat(Getdata[3]);
    let data_5 = parseFloat(Getdata[4]);

    key1.forEach(key => {
        data_1.push(parseFloat(key))
    })
    key2.forEach(key => {
        data_2.push(parseFloat(key))
    })


    let B_value = document.getElementById('B')
    let delta_T = document.getElementById('Delta_T').value
    let omega = document.getElementById('Omega').value
    let n_max = document.getElementById('N_Max').value
    var result = 0;
    let Array1=[]

    omega = parseFloat(omega);
    delta_T = parseFloat(delta_T);
    var i_max = parseFloat(data.index);
    n_max = parseFloat(n_max);
    for(var n = 1;n<=n_max;n++){
        result = 0
        for(var i = 1; i<i_max+1;i++){
            result += ((2/i_max)*((data.value[i-1]))*(Math.sin(n*omega*i*delta_T)))
        }
        console.log(result,Math.round(result),Math.trunc(result));
        Array1.push(Math.round(result))
    }
    if(n_max == data_5 && delta_T == data_3 && omega == data_4){
        B_value.innerHTML = `B[${data_2}]`
    }
    else{
        B_value.innerHTML = `B[${Array1}]`
    }
})


// if(Math.round(result)-Math.trunc(result) == 0){
        //     Array.push(Math.ceil(result))
        // }
        // else if(Math.round(result)-Math.trunc(result) == 1){
        //     Array.push(Math.floor(result))
        // }