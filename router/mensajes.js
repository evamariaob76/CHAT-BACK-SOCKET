//path: api/mensajes

const {Router} = require ('express');
const { obtenerChat,  totalMensajesNoLeidos,actualizarMensajesLeidos, totalMensajesLeidos } = require('../controllers/mensajes');
const { validarJWT } = require('../middelwares/validar-jwt');


const router = Router();

router.get('/:de', [validarJWT], obtenerChat );
router.get('/actualizar/:para/:de', actualizarMensajesLeidos );
router.get('/totalNoLeidos/:para/:de', totalMensajesNoLeidos );
router.get('/totalLeidos/:para/:de', totalMensajesLeidos );

module.exports = router;