const agendamentoModel = require('../models/agendamento-model');

exports.adicionarAgendamentos = (req, res) => {
    agendamentoModel.find((error, agendamentos) => {
        if (error) {
            console.log("Não foi possível registrar este agendamento");
            res.json({
                status: 'erro',
                message: 'Não foi possível inserir o novo agendamento'
            });
        }
        for (let i = 0; i < agendamentos.length; i++) {

            if (req.body.data_hora_agendamento == agendamentos[i].data_hora_agendamento) {
                res.json({
                    status: 'erro',
                    message: `O agendamento com o horário ${req.body.data_hora_agendamento} já está preenchido`
                });
            }
            return;
        }
        let agendamento = new agendamentoModel();
        // agendamento.id_pessoa = pessoa._id;
        // agendamento.id_unidade = parseInt(req.body.id_unidade);
        agendamento.data_hora_agendamento = req.body.data_hora_agendamento;
        agendamento.necessidades_especiais = req.body.necessidades_especiais;
        agendamento.observacoes_agendamento = req.body.observacoes_agendamento;
        agendamento.data_alteracao = Date();

        agendamento.save((error) => {
            if (error) {
                res.send({
                    status: 'erro',
                    message: 'Não foi possível inserir o agendamento'
                });
            } else {
                res.send({
                    status: 'ok',
                    message: `O agendamento de data e hora ${agendamento.data_hora_agendamento} foi inserido com sucesso`
                });
            }
        });
    });
}

exports.listarAgendamento = async (req, res) => {

    try {
        const agendamento = await agendamentoModel.findAll();
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).json({
            status: 'OK',
            Agendamentos: agendamento
        })
    } catch (error) {
        res.status(404).json({
            status: 'erro',
            message: 'Não foi possível recuperar os usuários'
        })
    }
}

exports.listarAgendamentoPorID = async (req, res) => {
    let agendamento_id = req.params.id;

    try {
        const agendamento = await agendamentoModel.findByPk(agendamento_id);

        if (agendamento) {
            res.status(200).json({
                status: "ok",
                message: "usuário encontrado com sucesso!",
            })
        } else {
            res.status(406).json({
                status: "erro",
                message: `Não foi possivel localizar o usuário de id ${agendamento_id}!`
            })
        }
    } catch (erro) {
        res.status(404).json({
            status: "erro",
            message: `Erro ao localizar o usuários com id ${agendamento_id}!`
        })
    }
}

exports.atualizarAgendamento = async (req, res) => {

    try {
        let agendamento_id = req.params.id;

        let novoRegistro = {
            nome: req.body.nome,
            email: req.body.email,
            idade: req.body.idade,
            data_alteracao: new Date()
        }

        if (agendamento_id) {

            let registroAtualizado = await agendamentoModel.update(novoRegistro, { where: { id: agendamento_id } })

            if (registroAtualizado) {
                res.status(200).json({
                    status: "ok",
                    message: "Registro atualizado com sucesso!",
                    novoRegistro: novoRegistro
                })
            } else {
                res.status(404).json({
                    status: "erro",
                    message: `Erro ao atualizar o registro de id ${agendamento_id}`
                })
            }
        } else {
            console.log('Sem id');
        }
    } catch (error) {
        res.status(406).json({
            status: "erro",
            message: error
        })
    }

}

exports.removerAgendamento = async (req, res) => {
    let agendamento_id = req.params.id;

    if (agendamento_id) {
        try {
            let agendamentoDeletado = await agendamentoModel.destroy({ where: { id: agendamento_id } });
            if (agendamentoDeletado) {
                res.status(200).json({
                    status: "ok",
                    message: `o Agendamento com id ${agendamento_id}, foi deletado com sucesso!`
                })
            } else {
                res.status(404).json({
                    status: "erro",
                    message: `Não foi possível deletar o Registro de id ${agendamento_id}`
                })

            }
        } catch (erro) {
            res.status(406).json({
                status: "erro",
                message: `Não foi possível deletar o Registro de id ${agendamento_id} `
            })
        }
    }

}