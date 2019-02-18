//import modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser'); //import parser

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const DBurl = "mongodb://127.0.0.1:27017/";
const DBname = "test";

let dbo = null;
MongoClient.connect(DBurl, (error, db) => {
    if (error) throw error;
    dbo = db.db(DBname);
})


app.use(bodyParser.urlencoded({extended: false}))

//endpoint get
app.get('/tes', (request, respone)=>{
    dbo.collection("siswa").find().toArray((err, res)=>{
        if(err) throw err;
        respone.json(res);
    })
})

// endpoint insert data ke db
app.post('/tes', (request, respone)=>{
    let namaSiswa = request.body.nama;
    let alamatSiswa = request.body.alamat;
    dbo.collection("siswa").insertOne({
        nama : namaSiswa,
        alamat : alamatSiswa
    }, (err, res)=>{
        if(!(err)){
            respone.json(res);
            respone.end("data berhasil masuk");
        }else{
            throw err;
        }
    })
})

//endpoint post
// app.post('/siswa/', (request, respone)=>{
//     let namaSiswa = request.body.name;
//     let alamat = request.body.adress;
//     respone.end('Menampilkan siswa baru ' + namaSiswa + ', yang beralamat di ' + alamat);
// })

//endpoint delete
app.delete('/tes/:id', (request, respone)=>{
    let id = request.params.id;
    let id_object = new ObjectID(id);
    dbo.collection("siswa").deleteOne({
        _id : id_object
    }, (err, res)=>{
        if(err) throw err;
        respone.end("data berhasil dihapus");
    })
})

//endpoint update
app.put('/tes/:id', (request, respone)=>{
    let id = request.params.id;
    let id_object = new ObjectID(id);
    let namaSiswa = request.body.nama;
    let kelasSiswa = request.body.kelas;
    let jurusanSiswa = request.body.jurusanSiswa
    dbo.collection("siswa").updateOne({
        _id : id_object
    }, {$set: {
        nama : namaSiswa,
        kelas : kelasSiswa,
        jurusan : jurusanSiswa
    }},
    (err, res) =>{
        if(err) throw err;
        respone.end("data berhasil diupdate");
    })
});


// inisialisasi port
app.listen('8080', (e)=>{
    console.log(e);
});