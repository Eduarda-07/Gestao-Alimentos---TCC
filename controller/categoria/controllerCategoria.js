/******************************************************************************************************
 * objetivo: controller responsável pela regra de negócio referente ao CROUD de categorias
 * data: 14/10/25
 * autor: Eduarda Silva
 * versão: 1.0
 ******************************************************************************************************/

const message = require('../../modulo/config')

const categoriaDAO = require('../../model/DAO/categoria')

const inserirCategoria = async function (categoria, contentType){
    try {
        if (String(contentType).toLowerCase() == 'aplication/js'){
            if (
                categoria.nome == '' || categoria.nome == undefined || categoria.nome == null || categoria.nome.length > 255
            ) {
                return message.ERROR_REQUIRED_FIELD
                
            } else {
                let resultCategoria = await categoriaDAO.insertCategoria(categoria)

                if (resultCategoria) {
                    let dadosCategoria = {
                        status: true,
                        status_code: message.SUCCESS_CREATED_ITEM.status_code,
                        message: message.SUCCESS_CREATED_ITEM.message,
                        categoria: result
                    }
                    return dadosCategoria
                } else {
                    return message.ERROR_INTERNAL_SERVER_MODEL
                }
            }
            
        } else {
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarCategoria = async function (id, categoria, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json'){
            if (
                id              == ''  || id              == undefined || id             == null || isNaN(id)       || id <= 0  || 
                categoria.nome  == ''  || categoria.nome  == undefined || categoria.nome == null || categoria.nome.length > 255
               )
       
           {
               return message.ERROR_REQUIRED_FIELD //400
           }else{

               let resultCategoria = await categoriaDAO.selectCategoriaById(parseInt(id))
               
               if(resultCategoria != false || typeof(resultCategoria) == 'object'){

                    if(resultCategoria.length > 0){

                        categoria.id = parseInt(id)

                        let result = await categoriaDAO.updateCategoria(categoria)

                        if(result){
                            let dadosCategoria = {
                                status: true,
                                status_code: message.SUCCESS_UPDATED_ITEM.status_code,
                                message: message.SUCCESS_UPDATED_ITEM.message,
                                categoria: result
                            }
                            return dadosCategoria
                        }else{
                            return message.ERROR_INTERNAL_SERVER_MODEL //500
                        }

                    }else{
                        return message.ERROR_NOT_FOUND // 404
                    }
               }else{
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

const excluirCategoria = async function(id){
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELD 
        } else {

            let resultCategoria = await categoriaDAO.selectCategoriaById(parseInt(id))

            if(resultCategoria != false || typeof(resultCategoria) == 'object'){

                if (resultCategoria.length > 0) {
    
                    let result = await categoriaDAO.deleteCategoria(parseInt(id))

                    if (result) {
                        return message.SUCCESS_DELETED_ITEM //200
                    } else {
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                    }
    
                } else {
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const listarCategoria = async function(){
    try {

        let dadosCategoria = {}

        let resultCategoria = await categoriaDAO.selectAllCategorias()

        if(resultCategoria != false || typeof(resultCategoria) == 'object'){
            if(resultCategoria.length > 0){
                dadosCategoria.status = true
                dadosCategoria.status_code = 200
                dadosCategoria.itens = resultCategoria.length
                dadosCategoria.categorias = resultCategoria
        
                return dadosCategoria

            }else{
                return message.ERROR_NOT_FOUND //404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const buscarCategoria = async function(id){
    
    try {

        if ( id === ""   ||   id === undefined || id === null  || isNaN(id)  || id <= 0 ) {
            
            return message.ERROR_REQUIRED_FIELD //400

        } else {

            let dadosCategoria = {}

            let result= await categoriaDAO.selectCategoriaById(parseInt(id))

            if(result != false || typeof(result) == 'object'){

                if(result.length > 0){
                    dadosCategoria.status = true
                    dadosCategoria.status_code = 200
                    dadosCategoria.categoria = result
    
                    return dadosCategoria
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
          
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

module.exports = {
    inserirCategoria,
    atualizarCategoria,
    excluirCategoria,
    listarCategoria,
    buscarCategoria
}
