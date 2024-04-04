const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const customersDal = require('./services/m.customers.dal.js'); 
const app = express();

global.DEBUG = true;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false })); 
app.use(methodOverride("_method")); 
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/searchCustomers', (req, res) => {
  res.render('searchForm'); 
});

// Route to handle the search logic and display results
app.post('/searchCustomers', async (req, res) => {
  try {
    const searchQuery = req.body.searchQuery;
    const results = await customersDal.searchCustomers(searchQuery);
    res.render('searchCustomer', { results }); 
  } catch (error) {
    console.error('Search failed:', error);
    res.status(500).send('Internal Server Error');
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});