/****************************************************************************************************
 * Objetivo: criar a comunicação com o banco de dados, para fazer o CROUD de favoritos
 * Data: 13/11/2025
 * Autor: Eduara
 * Versão: 1.0
 ***************************************************************************************************/

//Import do arquivo de mensagens e status code do projeto
const message = require('../../modulo/config.js')


const userFavDAO = require('../../model/DAO/usuario_favoritos')


const inserirUserFav = async function(userFav, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
            if( 
                userFav.id_empresa  == "" || userFav.id_empresa == undefined || userFav.id_empresa == null || isNaN(userFav.id_empresa) || userFav.id_empresa <= 0 ||
                (userFav.id_usuario == "" || userFav.id_usuario == undefined || userFav.id_usuario == null || isNaN(userFav.id_usuario) || userFav.id_usuario <= 0 )  && 
                (userFav.id_ong     == "" || userFav.id_ong     == undefined || userFav.id_ong     == null || isNaN(userFav.id_ong)     || userFav.id_ong     <= 0 )
            ){
                return message.ERROR_REQUIRED_FIELD //400
            }else{
                if (userFav.id_usuario) {
                    
                    let resultUser = await userFavDAO.insertUserFav(userFav)

                    if(resultUser){
                            
                        let dados = {
                            status: true,
                            status_code: message.SUCCESS_CREATED_ITEM.status_code,
                            message: message.SUCCESS_CREATED_ITEM.message,
                            favorito: resultUser
                        }
                        return dados
                    }else
                        return message.ERROR_INTERNAL_SERVER_MODEL //500

                    } else if (userFav.id_ong){
                        
                        let resultOng = await userFavDAO.insertOngFav(userFav)

                        if(resultOng){
                            let dados = {
                                status: true,
                                status_code: message.SUCCESS_CREATED_ITEM.status_code,
                                message: message.SUCCESS_CREATED_ITEM.message,
                                favorito: resultOng
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

const buscarFavoritos = async function(id_usuario, id_ong){ 
    try {
        if(
            (id_usuario == '' || id_usuario == undefined || id_usuario == null || isNaN(id_usuario) || id_usuario <=0) &&
            (id_ong     == '' || id_ong     == undefined || id_ong     == null || isNaN(id_ong)     || id_ong <=0)
        ){
            return message.ERROR_REQUIRED_FIELD //400
        }else{

            let dadosEmpresa = {}
          
    
            let resultFavorito = await userFavDAO.selectFavoritoUser(id_usuario, id_ong)

             if(resultFavorito != false || typeof(resultFavorito) == 'object'){
                if(resultFavorito.length > 0){

                    const favoritosRenomeados = resultFavorito.map(item => ({
                        id_favorito: item.f0,
                        id_usuario: item.f1,
                        id_ong: item.f2,
                        id_empresa: item.f3, 
                        nome: item.f4,
                        email: item.f5, 
                        cnpj_mei: item.f6,
                        telefone: item.f7,
                        foto: item.f8
                    }))

                        //Criando um JSON de retorno de dados para a API
                        dadosEmpresa.status = true
                        dadosEmpresa.status_code = 200
                        dadosEmpresa.result = favoritosRenomeados

                        return dadosEmpresa //200
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

const deletarFavoritoById = async function(id_favorito){
    try {
        if(
            id_favorito    == '' || id_favorito   == undefined  || id_favorito   == null || isNaN(id_favorito)  || id_favorito  <=0 
        ){
            return message.ERROR_REQUIRED_FIELD //400
        }else{
        
            let resultPedido = await userFavDAO.selectPedidoById(id_favorito)

            if (resultPedido) {

                let result = await userFavDAO.deleteFavoritoById(id_favorito)

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
    inserirUserFav,
    buscarPedidos,
    deletarPedidoById
}
