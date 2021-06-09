//Variaveis de ambiente 
require('dotenv').config({
  path: ".env"
});


const express = require('express');
var cors = require('cors');

const syncPG = require('./services/conect.postgres').sincronizarPostgres;
const syncDB = require('./services/conect.mongodb');  //Sincroniza o Mongodb
const app = express();

const port = process.env.APP_PORT;
const hostname = process.env.APP_HOSTNAME;

(async () => await syncPG())() //Sincroniza o Postgres

const defaultRoutes = require('./routes/default-routes');
const postgresqlRoutes = require('./routes/postgresql-routes');
const mongodbRoutes  = require('./routes/mongodb-routes');

// Postgres
const pessoaPgRoutes = require('./routes/pessoa-pg-routes');
const unidadePgRoutes = require('./routes/unidade-pg-routes');
const agendamentoPgRoutes = require('./routes/agendamento-pg-routes');

// MongoDB
const pessoaMgRoutes = require('./routes/pessoas-mg-routes');
const unidadeMgRoutes = require('./routes/unida-mg-routes');
const agendamentoMgRoutes = require('./routes/agendamento-mg-routes');

//Parsing do conteúdo das requisições 
app.use(express.urlencoded({
  extended: true
}));

app.use(express.json());
app.use(cors());

//Rotas 
app.use('/', defaultRoutes);
app.use('/postgresql', postgresqlRoutes);
app.use('/mongodb', mongodbRoutes);

//Rotas - Postgres
app.use('/pg/pessoas/', pessoaPgRoutes);
app.use('/pg/unidades/', unidadePgRoutes);
app.use('/pg/agendamentos/', agendamentoPgRoutes);

//Rotas - MongoDB
app.use('/mg/pessoas/', pessoaMgRoutes);
app.use('/mg/unidades/', unidadeMgRoutes);
app.use('/mg/agendamentos/', agendamentoMgRoutes);

app.listen(port, hostname, () => {
  console.log(`Servidor rodando no endereço: http://${hostname}:${port}\n\n`);
});

