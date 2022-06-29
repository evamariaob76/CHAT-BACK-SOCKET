const { response } = require('express');
const { find } = require('../models/mensaje');
const mensaje = require('../models/mensaje');
const Mensaje = require('../models/mensaje');
const usuario = require('../models/usuario');
const Usuario = require("../models/usuario");

const obtenerChat = async (req, res)=>{

    const miId =req.uid;
    const mensajesDe = req.params.de;
    const last30 = await Mensaje.find({
        $or:[
            {de: miId, para:mensajesDe},
            {de: mensajesDe, para:miId},
        ]
    })
        .sort ({createAt:'asc'})
        .limit(30 );


    res.json({
        ok:true,
        mensajes:last30
    })
}


const totalMensajes = async (uid)=>{
    const mensaje = await Mensaje.find({para:uid, leido:false})
   // const cantidad =mensaje.length; 
  // const filter = {_id:uid};
    //const update ={totalNoLeidos:cantidad}  
   // const total = await Usuario.findOneAndUpdate(filter, update);
       // console.log(mensaje.length)
        // console.log(usuario)

   // const usuario= await Usuario.findOneAndUpdate('62b70002b34a03634fe2a3f1',update )
   /*res.json({
        ok:true,
        mensaje,
        usuario,
     
    })*/
   // console.log(mensaje)

     return mensaje
  



}


const totalMensajesLeidos = async (req,res)=>{
    const mensajesPara=req.params.para;
    const mensajesDe = req.params.de;
    const mensaje= await Mensaje.find({de:mensajesDe, para:mensajesPara, leido:true}) ;

    res.json({
        ok:true +'aqui',
        mensajesLeidos:mensaje.length,
        de:mensajesDe
    })

}
const totalMensajesNoLeidos = async (req,res)=>{
    const mensajesPara=req.params.para;
    const mensajesDe = req.params.de;
    const mensaje= await Mensaje.find({de:mensajesDe, para:mensajesPara, leido:false}) ;

    res.json({
        ok:true +'aqui',
        mensajesNoLeidos:mensaje.length,
        de:mensajesDe
    })

}
    


const actualizarMensajesLeidos = async (req,res)=>{
    const mensajesPara=req.params.para;
    const mensajesDe = req.params.de;

    const mensaje= await Mensaje.updateMany({de:mensajesDe, para:mensajesPara},{$set:{"leido":true}}) ;

    res.json({
        ok:true +'aqui',
        mensajesLeidos:mensaje
    })


}



module.exports={
    obtenerChat,
    totalMensajes,
    actualizarMensajesLeidos,
    totalMensajesLeidos,
    totalMensajesNoLeidos
    
    
}