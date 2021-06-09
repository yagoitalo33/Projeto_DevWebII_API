let router = require('express').Router();

const mongooseController = require('../controllers/agendamento-mg-controller');

router.post('/', mongooseController.adicionarAgendamentos);

router.get('/', mongooseController.listarAgendamentos);

router.get('/:id', mongooseController.listarAgendamentosPorId);

router.put('/:id', mongooseController.atualizarAgendamentos);

router.delete('/:id', mongooseController.removerAgendamentos);

module.exports = router;