const express = require('express');
const app = express();
const properties = require('./config/properties');
const DB = require('./config/db');
//init DB
DB();
const routes = require('./routes/routes');

app.use(express.json());
app.use(routes);

app.listen(properties.PORT, ()=>{
    console.log(`Server running on port ${properties.PORT}`);
});
