let router = require('express').Router();

const mongooseController = require('../controllers/unidades-mg-controller');

router.post('/', mongooseController.adicionarUnidade);

router.get('/', mongooseController.listarUnidade);

router.get('/:id', mongooseController.listarUnidadePorId);

router.put('/:id', mongooseController.atualizarUnidade);

router.delete('/:id', mongooseController.removerUnidade);

module.exports = router;