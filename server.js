const express = require('express');
const app = express();
const properties = require('./config/properties');
const cors = require('cors');
const DB = require('./config/db');
//init DB
DB();
const routes = require('./routes/routes');

app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));
app.use(routes);

app.listen(properties.PORT, ()=>{
    console.log(`Server running on port ${properties.PORT}`);
});
