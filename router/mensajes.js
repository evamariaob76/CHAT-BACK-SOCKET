//path: api/mensajes

const {Router} = require ('express');
const { obtenerChat,  totalMensajesNoLeidos,actualizarMensajesLeidos, totalMensajesLeidos,totamensajesPorLeer } = require('../controllers/mensajes');
const { totalUsuarios } = require('../controllers/sockets');
const { validarJWT } = require('../middelwares/validar-jwt');

const router = Router();

router.get('/:de', [validarJWT], obtenerChat );
router.get('/actualizar/:para/:de', actualizarMensajesLeidos );
router.get('/totalNoLeidos/:para/:de', totalMensajesNoLeidos );
router.get('/totalLeidos/:para/:de', totalMensajesLeidos );
router.get('/totalUsuarios/', totalUsuarios );
router.get('/totalPorLeer/:para/:de', totamensajesPorLeer );

module.exports = router;

