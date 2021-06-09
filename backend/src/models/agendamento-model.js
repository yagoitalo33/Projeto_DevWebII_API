const Sequelize = require('../services/conect.postgres').Sequelize;
const postgres = require('../services/conect.postgres').sequelize;

const agendamentoModel = postgres.define('agendamentos', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    id_pessoa: {
        type: Sequelize.INTEGER,        
        allowNull: false,
      
    },
    id_unidade: {
        type: Sequelize.INTEGER,        
        allowNull: false,
      
    },
    data_hora_agendamento: {
        type: Sequelize.DATE,
        allowNull: false
    },  
    necessidades_especiais: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }, 
    observacoes_agendamento: {
        type: Sequelize.STRING,
        allowNull: false
    },      
       
    
});

module.exports = agendamentoModel