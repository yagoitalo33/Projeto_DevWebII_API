let router = require('express').Router();

const pessoaController = require('../controllers/pessoa-pg-controller');

router.post('/', pessoaController.adicionarPessoa);

router.get('/', pessoaController.listarPessoa);

router.get('/:id', pessoaController.listarPessoaPorID);

router.put('/:id', pessoaController.atualizarPessoa);

router.delete('/:id', pessoaController.removerPessoa);

module.exports = router;