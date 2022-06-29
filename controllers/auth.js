const bcrypt = require("bcryptjs");
const { response } = require("express");
const Usuario = require("../models/usuario");
const {generarJWT} = require('../helpers/jwt');
const Mensaje = require("../models/mensaje");

const crearUsuario = async (req, res= response)=>{
    try {

        const{email, password}= req.body;
        const existeEmail= await Usuario.findOne({email});
        if(existeEmail){
            return res.status(400).json({
                ok:false,
                msg:'Ya existe el usuario'
            })
        };
        const usuario = new Usuario (req.body);
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        usuario.save();

        const token = await generarJWT (usuario.id);

        res.json({
            ok:true,
            usuario,
            token
        })
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'hable con el administrador'
        })
        
    }

}
const actualizarAvatar=async(req, res)=>{
        const {  email, img } = req.body;
        console.log(email,img)
         try {
        const existeEmail= await Usuario.findOne({email});
           // console.log(existeEmail)
        // Verificar si existe el correo
        if ( !existeEmail ) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado'
            });
        }
     await Usuario.updateOne({email}, {img})

       res.json({
            ok: true,
            img,
        });



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}
const login = async(req, res) => {

    const {  email, password } = req.body;

    try {
        
        // Verificar si existe el correo
        const usuarioDB = await Usuario.findOne({ email });
        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado'
            });
        }

        // Validar el password
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );
        if ( !validPassword ) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado'
            });
        }

        // Generar el JWT
        const token = await generarJWT( usuarioDB.id );


        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const renewToken = async(req, res) => {

    const uid = req.uid;

    // Generar un nuevo JWT
    const token = await generarJWT( uid );

    // Obtener el usuario por UID
    const usuario = await Usuario.findById( uid );

    res.json({
        ok: true,
        usuario,
        token,
    })



}
   

module.exports ={
    crearUsuario,
    login,
    renewToken,
    actualizarAvatar,
}