require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();


//Middlewares
app.use(cors());

//Static
app.use(express.static(__dirname + '/src'));

//SPA
app.use(/.*/, (req, res) => res.sendFile(__dirname + '/src/index.js'));

//Port
const port = process.env.PORT || 6598;
app.listen(port, () => console.log(`Servidor iniciado na porta ${port}`));
