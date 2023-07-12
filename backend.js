const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/countries', function(req, res) {
  MongoClient.connect(url, function(err, client) {
    const db = client.db(dbName);
    const collection = db.collection('countries');

    collection.find({}).toArray(function(err, result) {
      res.json(result);
      client.close();
    });
  });
});

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});

const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');

const url = 'mongodb://localhost:27017';
const dbName = 'olympics';

MongoClient.connect(url, function(err, client) {
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  const collection = db.collection('countries');

  const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

  collection.insertMany(data.countries, function(err, result) {
    console.log(`Inserted ${result.insertedCount} documents into the collection`);
    client.close();
  });
});
