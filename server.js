const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const userDb = require('./client/database/userDb');
const clientDb = require('./client/database/clientDb');

app.use(express.static(path.join(__dirname, './node_modules/')));
app.use(express.static(path.join(__dirname, './client/')));
app.use(bodyParser());

app.get('/', (req, res)=>{
  res.render('index');
});

app.post('/validateUser', (req, res)=>{
  userDb.isValid(req.body).then((result)=>{
    console.log("looking for a result",result);
    if(result){
       res.send(true);
       return;
    }
    res.send(false);
  });
});

app.post('/addUser', (req, res)=>{
  userDb.create(req.body);
});


app.post('/createTable', (req, res)=>{
  console.log("posting to createTable", clientDb);
});

app.listen(8000, () => {
  console.log('Listening on port 3000');
});
