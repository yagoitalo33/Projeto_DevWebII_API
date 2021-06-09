const unidadeModel = require('../models/unidade-model');

exports.adicionarUnidade = async (req, res) => {
    const unidade = req.body;

    const unidadeExiste = await unidadeModel.findAll({
        where: {
            email_unidade: unidade.email_unidade
        }
    });



    if (unidadeExiste.length > 0) {
        res.status(403).json({
            status: "Erro",
            resultado: `A unidade com e-mail: ${unidade.email_unidade} já está cadastrado no Sistema!` 
        })
    } else {
        const unidadeExiste = await unidadeModel.create({
            nome_unidade: unidade.nome_unidade,
            descricao_unidade: unidade.descricao_unidade,
            endereco_unidade: unidade.endereco_unidade,
            telefone_unidade: unidade.telefone_unidade,
            email_unidade: unidade.email_unidade,
            endereco_unidade: unidade.endereco_unidade,            
        });
        res.status(200).json({
            status: 'ok',
            resultado: 'Unidade criada com sucesso!'
        })
    }
}

exports.listarUnidade = async (req, res) => {
   
    try {
        const unidade = await unidadeModel.findAll();
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).json({
            status: 'OK',
            Unidades: unidade
        })
    } catch (error) {
        res.status(404).json({
            status: 'erro',
            message: 'Não foi possível recuperar os usuários'
        })
    }
}

exports.listarUnidadePorID = async (req, res) => {
    let unidade_id = req.params.id;

    try {
        const unidade = await unidadeModel.findByPk(unidade_id);

        if (unidade) {
            res.status(200).json({
                status: "ok",
                message: "usuário encontrado com sucesso!",
                aluno: unidade
            })
        } else {
            res.status(406).json({
                status: "erro",
                message: `Não foi possivel localizar o usuário de id ${unidade_id}!`
            })
        }
    } catch (erro) {
        res.status(404).json({
            status: "erro",
            message: `Erro ao localizar o usuários com id ${unidade_id}!`
        })
    }
}

exports.atualizarUnidade = async (req, res) => {

    try {
        let unidade_id = req.params.id;

        let novaUnidade = {
            nome_unidade: unidade.nome_unidade,
            descricao_unidade: unidade.descricao_unidade,
            endereco_unidade: unidade.endereco_unidade,
            telefone_unidade: unidade.telefone_unidade,
            email_unidade: unidade.email_unidade,
            endereco_unidade: unidade.endereco_unidade            
        }

        if (unidade_id) {

            let registroAtualizado = await unidadeModel.update(novaUnidade, { where: { id: unidade_id } })

            if (registroAtualizado) {
                res.status(200).json({
                    status: "ok",
                    message: "Registro atualizado com sucesso!",
                    novaUnidade: novaUnidade
                })
            } else {
                res.status(404).json({
                    status: "erro",
                    message: `Erro ao atualizar o registro de id ${unidade_id}`
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

exports.removerUnidade = async (req, res) => {
    let unidade_id = req.params.id;

    if (unidade_id) {
        try {
            let alunoDeletado = await unidadeModel.destroy({ where: { id: unidade_id } });
            if (alunoDeletado) {
                res.status(200).json({
                    status: "ok",
                    message: `Registro de id ${unidade_id} deletado com sucesso!`
                })
            } else {
                res.status(404).json({
                    status: "erro",
                    message: `Não foi possível deletar o Registro de id ${unidade_id}`
                })

            }
        } catch (erro) {
            res.status(406).json({
                status: "erro",
                message: `Não foi possível deletar o Registro de id ${unidade_id} `
            })
        }
    }

}