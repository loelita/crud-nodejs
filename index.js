//create server

const express = require('express'); //import module express
const app = express(); //eksekusi module express

//eksekusi express dg memanggil var app
app.get('/test', function(request, respone){ //merupakan suatu end point; req(requsest) & res(respone)
    respone.send('abcdefgh') //mengirimkan res dr http & dikembalikan
}) 

app.get('/rpl', function(request, respone){ //merupakan suatu end point; req(requsest) & res(respone)
    respone.send('LOELITA ALIFIA') //mengirimkan res dr http & dikembalikan
})

app.listen('12345'); //definisi hal port