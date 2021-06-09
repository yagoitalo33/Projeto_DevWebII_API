const Sequelize = require('../services/conect.postgres').Sequelize;
const postgres = require('../services/conect.postgres').sequelize;

const unidadeModel = postgres.define('unidades', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome_unidade: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao_unidade: {
        type: Sequelize.STRING,
        allowNull: false
    },
    endereco_unidade: {
        type: Sequelize.STRING,
        allowNull: false
    },
    telefone_unidade: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email_unidade: {
        type: Sequelize.STRING,
        allowNull: false
    },  
    // latlong_unidade: {
    //     type: Sequelize.STRING,
    //     allowNull: false
    // },  
    
    
    
});

module.exports = unidadeModel