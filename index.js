const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
//use bodyparser
app.use(express.json());

const port = 3000;
app.use(cors());

let obj = {};

app.get('/', function (req, res) {
  readJson();
  res.send(JSON.stringify(obj));
})

app.post('/add', function (req, res) {
  let addObj = req.body;
  console.log(addObj);
  obj.liste.push(addObj);
  writeJson();
  res.send(JSON.stringify(obj));
})

app.get('/del/:id', function (req, res) {
  console.log(req.params.id);
  obj.liste.splice(req.params.id, 1);
  writeJson();
  res.send(JSON.stringify(obj));
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const readJson = () => {
  fs.readFile('liste.json', 'utf8', (error, jsonFile) => {
    if (error) {
      console.log('An error has occurred ', error);
      return;
    }
    obj = JSON.parse(jsonFile);
  });
}

const writeJson = () => {
  fs.writeFile('liste.json', JSON.stringify(obj, null, 2), (error) => {
    if (error) {
      console.log('An error has occurred ', error);
      return;
    }
    console.log('Data written successfully');
  });
}
