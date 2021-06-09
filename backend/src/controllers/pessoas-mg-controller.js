const pessoasModel = require('../models/pessoas-mg-model');
const agendamentoModel = require('../models/agendamento-mg-model');
const mongodb = require('../services/conect.mongodb');

exports.adicionarPessoas = async (req, res) => {

    pessoasModel.find((error, pessoas) => {
        if (error) {
            // console.log("Não foi possível recuperar as pessoas");
            res.json({
                status: 'erro',
                message: "Não foi possível recuperar as pessoas"
            });
        }

        for (let i = 0; i < pessoas.length; i++) {
            if (req.body.email_pessoa == pessoas[i].email_pessoa) {
                res.json({
                    status: 'erro',
                    message: `A pessoa ${req.body.nome_pessoa} já está cadastrado com o email: ${req.body.email_pessoa}`
                });
                return;
            }
        }

        //Pessoa
        let pessoa = new pessoasModel();
        pessoa.nome_pessoa = req.body.nome_pessoa;
        pessoa.cpf_pessoa = req.body.cpf_pessoa;
        pessoa.data_nascimento = req.body.data_nascimento;
        pessoa.telefone_pessoa = req.body.telefone_pessoa;
        pessoa.grupo_prioritario = req.body.grupo_prioritario;
        pessoa.endereco_pessoa = req.body.endereco_pessoa;
        pessoa.email_pessoa = req.body.email_pessoa;
        // console.log('Pessoa:' + pessoa);

        //Agendamento     
        let agendamento = new agendamentoModel();
        agendamento.id_pessoa = pessoa._id;
        agendamento.id_unidade = req.body.id_unidade;
        agendamento.data_hora_agendamento = req.body.data_hora_agendamento;
        agendamento.necessidades_especiais = req.body.necessidades_especiais;
        agendamento.observacoes_agendamento = req.body.observacoes_agendamento;
        agendamento.data_alteracao = Date();

        // console.log('agendamento:' + agendamento)

        pessoa.save((error) => {
            if (error) {
                res.json({
                    status: 'erro',
                    message: `Não foi possivel realizar o agendamento! \n`
                });
            } else {
                // console.log(`Casdastro realizado com sucesso ${req.body.nome_pessoa}`);
                agendamento.save((error) => {
                    if (error) {
                        res.json({
                            status: 'erro',
                            message: `Não foi possivel realizar o agendamento! \n`
                        });
                    } else {
                        // console.log(`Casdastro realizado com sucesso ${req.body.nome_pessoa}`);
                        res.json({
                            status: 'ok',
                            message: `Agendamento realizado com sucesso! \n`
                        });
                    }
                });
            }
        });

    });



}

exports.listarPessoas = async (req, res) => {
    pessoasModel.find((error, pessoas) => {
        if (error) {
            // console.log("Não foi possível listar as pessoas");
            res.json({
                status: 'erro',
                message: 'Não foi possível listar as pessoas'
            });
        } else {
            res.json({
                status: 'ok',
                message: pessoas
            });
        }
    });
}

exports.listarPessoasPorId = async (req, res) => {

    let id_pessoa = req.params.id;

    pessoasModel.findById(id_pessoa, (error, pessoas) => {
        if (error || !pessoas) {
            // console.log(`Não foi possível encontrar a pessoa ${id_pessoa}`);
            res.json({
                status: 'erro',
                message: `Não foi possível encontrar a pessoa ${id_pessoa}`
            });
        } else {
            // console.log(`Pessoa de id ${id_pessoa} encontrado na base de dados`);
            res.json({
                status: 'ok',
                message: pessoas
            });
        }
    });
}

exports.atualizarPessoas = async (req, res) => {

    let id_pessoa = req.params.id;

    pessoasModel.findById(id_pessoa, (error, pessoas) => {
        if (error || !pessoas) {
            // console.log(`Não foi possível atualizar a pessoa com o id ${id_pessoa}`);
            res.json({
                status: 'erro',
                message: `Não foi possível atualizar a pessoa com o id ${id_pessoa}`
            });
        } else {
            pessoas.nome_pessoa = req.body.nome_pessoa;
            pessoas.cpf = req.body.cpf;
            pessoas.data_nascimento = req.body.data_nascimento;
            pessoas.telefone_pessoa = req.body.telefone_pessoa;
            pessoas.grupo_prioritario = req.body.grupo_prioritario;
            pessoas.endereco_pessoa = req.body.endereco_pessoa;
            pessoas.email_pessoa = req.body.email_pessoa;
            pessoas.data_alteracao = Date.now();

            pessoas.save((error) => {
                if (error) {
                    res.json({
                        status: 'erro',
                        // message: `Houve um erro ao atualizar a pessoa ${pessoas.nome_pessoa}`
                        message: error
                    });
                } else {
                    res.json({
                        status: 'ok',
                        message: `A informações ${pessoas.nome_pessoa} foram atualizadas com sucesso`,
                        novaPessoa: pessoas
                    });
                }
            });
        }
    });
}

exports.removerPessoas = async (req, res) => {
    let id_pessoa = req.params.id;

    pessoasModel.remove({
        _id: id_pessoa
    }, (error, pessoas) => {
        if (error) {
            res.json({
                status: 'erro',
                message: `Não foi possível remover a pessoa ${pessoas.nome_pessoa}`
            });
        } else {
            res.json({
                status: 'ok',
                message: `A Pessoa foi deletada com sucesso`
            });
        }
    });
}
