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


const totalMensajesLeidos = async (req,res)=>{
    const mensajesPara=req.params.para;
    const mensajesDe = req.params.de;
    const mensaje= await Mensaje.find({de:mensajesDe, para:mensajesPara, leido:true}) ;

    res.json({
        ok:true +'aqui',
        mensajesLeidos:mensaje.length,
        de:mensajesDe,
        para:mensajesPara
    })

}
const totalMensajesNoLeidos = async (req,res)=>{
    const mensajesPara=req.params.para;
    const mensajesDe = req.params.de;
    const mensaje= await Mensaje.find({de:mensajesDe, para:mensajesPara, leido:false}) ;

    res.json({
        ok:true +'aqui',
        mensajesNoLeidos:mensaje.length,
        de:mensajesDe,
        para:mensajesPara

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
    actualizarMensajesLeidos,
    totalMensajesLeidos,
    totalMensajesNoLeidos
    
    
}