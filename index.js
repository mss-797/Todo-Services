const express = require('express');
const app = express();
const { dbConnection } = require('./config/dbConnection');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const TOdoRoutes = require('./routes/home');


app.use(cors())
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/todo', TOdoRoutes);
dbConnection();

console.log('Server Created...');
app.get('/', async(req,res) => {
    res.end('Hello World');
    console.log('Hello World');
}).listen(process.env.PORT, () => { console.log('Todo Services Running on port : 9090 ')});