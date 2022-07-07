const Usuario = require('../models/usuario');
const Mensaje = require('../models/mensaje');

const usuarioConectado = async( uid ) => {

    const usuario = await Usuario.findById(uid);
    usuario.online = true;
    await usuario.save();
    
    return usuario;
}

const usuarioDesconectado = async( uid ) => {
    const usuario = await Usuario.findById(uid);
    usuario.online = false;
    await usuario.save();
    
    return usuario;
}


const getUsuarios = async() => {

    const usuarios = await Usuario
        .find()
        .sort('-online');

    return usuarios;
}
const totalUsuarios = async() => {

    const usuarios = await Usuario.find({});

    res.json({
        ok:true +'aqui',
        usuarios:usuarios.length       
    })}


const grabarMensaje = async( payload ) => {
  
    try {
        
        const mensaje = new Mensaje( payload );
        await mensaje.save();
//totalMensajesNoLeidos(miId, mensajesDe)

        return mensaje;

    } catch (error) {
        console.log(error);
        return false;
    }

}

const totalMensajesNoLeidosUsuario = async (de,para)=>{
 
    const mensaje= await Mensaje.find({de:de, para:para, leido:false}); ;
  //console.log(mensaje)
const count = await Mensaje.aggregate([ 
        { $match:{ leido:false}}, 

    { $group:{ _id:'$de',       y: { $first : "$para" }
,  totales: { $sum:1 } } },
])
const eva = await Mensaje.find({de:de, para:para, leido:false}).populate('de')
//console.log(count)

    return count;

}


const totalMensajesNoLeidos = async (uid)=>{

 var msg2 = await Mensaje.find({ "para": uid, leido:false });
const count = await Mensaje.aggregate([ 
        { $match:{ leido:false}}, 

    { $group:{ _id:'$de',       y: { $first : "$para" }
,  totales: { $sum:1 } } },



])

const eva = await Mensaje.countDocuments({para:uid, leido:false})


    const mensaje= await Mensaje.find({ para:uid,leido:false});
   const body = {
  feature: await Mensaje.find({ para:uid,leido:false})
};
console.log(msg2)
    return msg2;

}


const actualizarMensajesLeidos = async (uid)=>{
   

    const mensaje= await Mensaje.updateMany({para:uid,$set:{leido:true}}) ;
console.log(uid)
console.log(mensaje)
return mensaje;

}
module.exports = {
    usuarioConectado,
    usuarioDesconectado,
    getUsuarios,
    grabarMensaje,
    totalMensajesNoLeidosUsuario,
    totalMensajesNoLeidos,
    totalUsuarios,
    actualizarMensajesLeidos
}
