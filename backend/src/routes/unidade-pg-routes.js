let router = require('express').Router();

const unidadeController = require('../controllers/unidade-pg-controller');

router.post('/', unidadeController.adicionarUnidade);

router.get('/', unidadeController.listarUnidade);

router.get('/:id', unidadeController.listarUnidadePorID);

router.put('/:id', unidadeController.atualizarUnidade);

router.delete('/:id', unidadeController.removerUnidade);

module.exports = router;