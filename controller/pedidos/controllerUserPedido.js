/****************************************************************************************************
 * Objetivo: criar a comunicação com o banco de dados, para fazer o CROUD da tbl_user_pedidos
 * Data: 12/11/2025
 * Autor: Eduara
 * Versão: 1.0
 ***************************************************************************************************/

//Import do arquivo de mensagens e status code do projeto
const message = require('../../modulo/config.js')


const userPedidoDAO = require('../../model/DAO/usuario_pedido.js')


const inserirUserPedido = async function(userPedido, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
            if( 
                userPedido.id_alimento == "" || userPedido.id_alimento == undefined || userPedido.id_alimento == null || isNaN(userPedido.id_alimento) || userPedido.id_alimento <= 0 ||
                userPedido.quantidade  == "" || userPedido.quantidade  == undefined || userPedido.quantidade  == null || isNaN(userPedido.quantidade)  || userPedido.quantidade  <= 0 ||
                (
                    (userPedido.id_usuario == "" || userPedido.id_usuario == undefined || userPedido.id_usuario == null || isNaN(userPedido.id_usuario) || userPedido.id_usuario <= 0 )  && 
                    (userPedido.id_ong     == "" || userPedido.id_ong     == undefined || userPedido.id_ong     == null || isNaN(userPedido.id_ong)     || userPedido.id_ong     <= 0 )
                )

            )
                {
                    return message.ERROR_REQUIRED_FIELD //400
                }else{

                    if (userPedido.id_usuario) {
                        
                        let resultUser = await userPedidoDAO.insertUserPedido(userPedido)

                        if(resultUser){
                            
                           let dados = {
                                        status: true,
                                        status_code: message.SUCCESS_CREATED_ITEM.status_code,
                                        message: message.SUCCESS_CREATED_ITEM.message,
                                        pedido: resultUser
                                        }
                            return dados
                        }else
                            return message.ERROR_INTERNAL_SERVER_MODEL //500

                    } else if (userPedido.id_ong){
                        
                        let resultOng = await userPedidoDAO.insertOngPedido(userPedido)

                        if(resultOng){
                            let dados = {
                                status: true,
                                status_code: message.SUCCESS_CREATED_ITEM.status_code,
                                message: message.SUCCESS_CREATED_ITEM.message,
                                pedido: resultOng
                                }
                            return dados
                        }else
                            return message.ERROR_INTERNAL_SERVER_MODEL //500

                    }

                }
        }else{
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}


// const buscarAlimentosUsuario = async function(id_usuario){
//     try {
//         if(id_usuario == '' || id_usuario == undefined || id_usuario == null || isNaN(id_usuario) || id_usuario <=0){
//             return message.ERROR_REQUIRED_FIELD //400
//         }else{

//             let dadosAlimento = {}

//             let resultAlimento = await userPedidoDAO.selectPedidoUser(parseInt(id_usuario))
            
//             if(resultAlimento != false || typeof(resultAlimento) == 'object'){
//                 if(resultAlimento.length > 0){

//                     const alimentosRenomeados = resultAlimento.map(item => ({
//                         id_pedido: item.f0,
//                         id_usuario: item.f1,
//                         id_alimento: item.f2, 
//                         quantidade_pedido: item.f3,
//                         nome_alimento: item.f4, 
//                         quantidade: item.f5,
//                         peso: item.f6,
//                         id_tipo_peso: item.f7,
//                         tipo: item.f8,
//                         data_de_validade: item.f9,
//                         descricao: item.f10,
//                         imagem: item.f11,
//                         id_empresa: item.f12,
//                         nome_empresa: item.f13,
//                         foto_empresa: item.f14
//                     }))

//                         //Criando um JSON de retorno de dados para a API
//                         dadosAlimento.status = true
//                         dadosAlimento.status_code = 200
//                         dadosAlimento.result = alimentosRenomeados

//                         return dadosAlimento //200
//                     }else{
//                         return message.ERROR_NOT_FOUND //404
//                     }
//                 } else {
//                     return message.ERROR_INTERNAL_SERVER_MODEL //404
//                 }
//         }

//     } catch (error) {
//         return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
//     }
// }

const buscarPedidos = async function(id_usuario, id_ong){ 
    try {
        if(
            (id_usuario == '' || id_usuario == undefined || id_usuario == null || isNaN(id_usuario) || id_usuario <=0) &&
            (id_ong     == '' || id_ong     == undefined || id_ong     == null || isNaN(id_ong)     || id_ong <=0)
        ){
            return message.ERROR_REQUIRED_FIELD //400
        }else{

            let dadosAlimento = {}
          
    
            let resultAlimento = await userPedidoDAO.selectPedidoUser(id_usuario, id_ong)

             if(resultAlimento != false || typeof(resultAlimento) == 'object'){
                if(resultAlimento.length > 0){

                    const alimentosRenomeados = resultAlimento.map(item => ({
                        id_pedido: item.f0,
                        id_usuario: item.f1,
                        id_ong: item.f2,
                        id_alimento: item.f3, 
                        quantidade_pedido: item.f4,
                        nome_alimento: item.f5, 
                        quantidade: item.f6,
                        peso: item.f7,
                        id_tipo_peso: item.f8,
                        tipo: item.f9,
                        data_de_validade: item.f10,
                        descricao: item.f11,
                        imagem: item.f12,
                        id_empresa: item.f13,
                        nome_empresa: item.f14,
                        foto_empresa: item.f15
                    }))

                        //Criando um JSON de retorno de dados para a API
                        dadosAlimento.status = true
                        dadosAlimento.status_code = 200
                        dadosAlimento.result = alimentosRenomeados

                        return dadosAlimento //200
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }

    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const deletarPedidoById = async function(id_pedido){
    try {
        if (
                    id_pedido    == '' || id_pedido   == undefined  || id_pedido   == null || isNaN(id_pedido)  || id_pedido  <=0 
                )
                {
                    return message.ERROR_REQUIRED_FIELD //400
                }else{

                    let resultPedido = await userPedidoDAO.selectPedidoById(id_pedido)

                    if (resultPedido) {

                        let result = await userPedidoDAO.deletePedidoById(id_pedido)

                        if(result)
                            return message.SUCCESS_DELETED_ITEM
                        else
                            return message.ERROR_INTERNAL_SERVER_MODEL //500
                        
                    } else {
                         return message.ERROR_NOT_FOUND
                    }
                }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

module.exports = {
    inserirUserPedido,
    buscarPedidos,
    deletarPedidoById
}
