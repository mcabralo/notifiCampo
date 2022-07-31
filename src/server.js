require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();

//Middlewares
app.use(cors());

//Static
app.use(express.static(__dirname + '/public'));

//SPA
app.use(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));

//Port
const port = process.env.PORT;
app.listen(port, () => console.log(`Servidor iniciado na porta ${port}`));
