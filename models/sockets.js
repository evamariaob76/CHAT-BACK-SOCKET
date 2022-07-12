const { comprobarJWT } = require('../helpers/jwt');
const { usuarioConectado,
        usuarioDesconectado,
        grabarMensaje,
        getUsuarios,
        totalMensajesNoLeidosUsuario,
        totalMensajesNoLeidos,
        actualizarMensajesLeidos } = require('../controllers/sockets');

class Sockets {

    constructor( io ) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {


        // On connection
        this.io.on('connection', async( socket ) => {
            const [ valido, uid ] = comprobarJWT( socket.handshake.query['x-token']  );
            const para='';
            console.log('cliente conecyado')

            if ( !valido ) {
                console.log('socket no identificado');
                return socket.disconnect();
            }
           await usuarioConectado( uid );
           //await totalMensajes( uid );
            // Unir al usuario a una sala de socket.io
            socket.join( uid );
            // TODO: Validar el JWT 
            // Si el token no es válido, desconectar

            // TODO: Saber que usuario está activo mediante el UID

            // TODO: Emitir todos los usuarios conectados
            this.io.emit( 'lista-usuarios', await getUsuarios() )
            this.io.emit( 'lista-mensajes-No-Leidos', await totalMensajesNoLeidos(uid) )
            //this.io.emit( 'actualizar-Mensajes-Leidos', await actualizarMensajesLeidos(uid) )

            //Emitir todos los mensajes no leidos

          //  this.io.emit('actualizarMensajes', await actualizarMensajesLeidos(uid) )
       // this.io.to(uid).emit( 'lista-mensajes-No-Leidos-Usuario', await totalMensajesNoLeidos(uid) )

            // TODO: Escuchar cuando el cliente manda un mensaje
                socket.on( 'lista-mensajes-No-Leidos-Usuario', async( payload ) => {
                                  // console.log(payload)

                     const mensaje =await totalMensajesNoLeidosUsuario(payload.de,payload.para)
                    console.log(mensaje)
                   // this.io.emit(mensaje)
              // this.io.emit('lista-mensajes-No-Leidos',{mensaje})
              // this.io.emit('lista-mensajes-No-Leidos',mensaje)

              // this.io.to( payload.de.uid ).emit( 'lista-mensajes-No-Leidos-Usuario',mensaje);
              this.io.to( payload.para ).emit( 'lista-mensajes-No-Leidos-Usuario',mensaje );
               this.io.to( payload.de ).emit( 'lista-mensajes-No-Leidos-Usuario',mensaje );

               // this.io.to( payload.de ).emit( 'lista-mensajes-No-Leidos',  );

            })



            // TODO: Escuchar cuando el cliente manda un mensaje
                socket.on( 'mensaje-personal', async( payload ) => {
                const mensaje = await grabarMensaje( payload );
                     const mensaje2 =await totalMensajesNoLeidosUsuario(payload.de,payload.para)

                this.io.to( payload.para ).emit( 'mensaje-personal', mensaje );
                this.io.to( payload.de ).emit( 'mensaje-personal', mensaje );
              // this.io.emit('lista-mensajes-No-Leidos', await totalMensajesNoLeidosUsuario(payload.de,payload.para))


            });
   


            // TODO: Disconnect
            // Marcar en la BD que el usuario se desconecto
            // TODO: Emitir todos los usuarios conectados
            socket.on('disconnect', async() => {
                await usuarioDesconectado( uid );
                this.io.emit( 'lista-usuarios', await getUsuarios() )
            })
            
        
        });
    }


}


module.exports = Sockets;