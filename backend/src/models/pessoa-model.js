const Sequelize = require('../services/conect.postgres').Sequelize;
const postgres = require('../services/conect.postgres').sequelize;

const pessoaModel = postgres.define('pessoas', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome_pessoa: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cpf_pessoa: {
        type: Sequelize.STRING,
        allowNull: false
    },
    data_nascimento: {
        type: Sequelize.STRING,
        allowNull: false
    },
    telefone_pessoa: {
        type: Sequelize.STRING,
        allowNull: false
    },   
    endereco_pessoa: {
        type: Sequelize.STRING,
        allowNull: false
    },  
    email_pessoa: {
        type: Sequelize.STRING,
        allowNull: false
    },  
    grupo_prioritario: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }    
       
    
});

module.exports = pessoaModel