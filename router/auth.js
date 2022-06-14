//path: api/login

const {Router} = require ('express');
const { check } = require('express-validator');
const { crearUsuario, renewToken, login,actualizarAvatar } = require('../controllers/auth');
const { validarCampos } = require('../middelwares/validar-campos');
const { validarJWT } = require('../middelwares/validar-jwt');


const router = Router();

router.post('/new',[
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('email', 'el email es obligatorio').isEmail(),
    check('password', 'el password es obligatorio').not().isEmpty(),
    validarCampos    
], crearUsuario);



router.post('/', [
    check('email', 'el email es obligatorio').isEmail(),
    check('password', 'el password es obligatorio').not().isEmpty(),
    validarCampos
],login);

router.put('/actualizarAvatar', [

],actualizarAvatar);


router.get('/renew', [validarJWT],renewToken );
module.exports = router;