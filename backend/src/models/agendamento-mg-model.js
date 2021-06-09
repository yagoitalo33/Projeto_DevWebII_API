const mongoose = require('mongoose');

const agendamentoSchema = mongoose.Schema({
    id_pessoa: {
        type: mongoose.Schema.Types.String,
        required: false
    },
    id_unidade: {
        type: mongoose.Schema.Types.String,
        required: false
    },
    data_hora_agendamento: {
        type: mongoose.Schema.Types.Date,
        required: false
    },
    necessidades_especiais: {
        type: mongoose.Schema.Types.Boolean,
        required: false
    },
    observacoes_agendamento: {
        type: mongoose.Schema.Types.String,
        required: false
    },
    data_alteracao: {
        type: mongoose.Schema.Types.Date,
        default: null
    }
});

let Agendamento = module.exports = mongoose.model('agendamentos', agendamentoSchema);

module.exports.get = function(callback, limit){
    Agendamento.find(callback).limit(limit);
}