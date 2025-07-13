const express = require('express');
const cors = require('cors');
const fs = require('fs');

//express
const app = express();
const PORT = 3001;

//enable CORS
app.use(cors()); 

//read JSON files
const readJSON = (fileName) => JSON.parse(fs.readFileSync(`./data/${fileName}`, 'utf-8'));

// get API
app.get('/api/data', (req, res) => {
  const data = {
    customerType: readJSON('Customer Type.json'),
    accountIndustry: readJSON('Account Industry.json'),
    team: readJSON('Team.json'),
    acvRange: readJSON('ACV Range.json')
  };
  res.json(data);//JSON response
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
