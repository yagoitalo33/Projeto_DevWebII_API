let router = require('express').Router();

const mongooseController = require('../controllers/pessoas-mg-controller');

router.post('/', mongooseController.adicionarPessoas);

router.get('/', mongooseController.listarPessoas);

router.get('/:id', mongooseController.listarPessoasPorId);

router.put('/:id', mongooseController.atualizarPessoas);

router.delete('/:id', mongooseController.removerPessoas);

module.exports = router;