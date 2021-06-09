const {Sequelize} = require('sequelize');

// Docker 
// const sequelize = new Sequelize(`postgres://root:Luvep!ntranet2021!@localhost:5432/luvep`, {dialect: 'postgres', logging: false});

// AWS RDS
const sequelize = new Sequelize(`postgres://${process.env.POSTGRES_USERNAME}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/`, {dialect: 'postgres', logging: false});

const sincronizarPostgres = async () => {
    try{
        sequelize.sync();
        console.log("\n\nTodos os modelos foram sincronizados com sucesso. \n");
    }catch(erro){
        console.error(erro);
    }
}


module.exports = {sequelize, Sequelize, sincronizarPostgres};