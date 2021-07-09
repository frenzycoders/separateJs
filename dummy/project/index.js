const express = require('express');
const app = express();
const server = require('http').createServer(app);
require('./Config')(app);

server.listen(3000,(err)=>{
    console.log('Running...');
})