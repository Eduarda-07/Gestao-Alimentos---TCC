/******************************************************************************************************
 * objetivo: controller responsável pela regra de negócio referente ao CROUD de tipo de peso
 * data: 04/11/25
 * autor: Eduarda Silva
 * versão: 1.0
 ******************************************************************************************************/

const message = require('../../modulo/config')

const tipoPesoDAO = require('../../model/DAO/tipoPeso')

const inserirTipoPeso = async function (tipo, contentType){
    try {
        if (String(contentType).toLowerCase() == 'application/json'){
            if (
                tipo.tipo == '' || tipo.tipo == undefined || tipo.tipo == null || tipo.tipo.length > 45
            ) {
                return message.ERROR_REQUIRED_FIELD
                
            } else {
                let result = await tipoPesoDAO.insertTipoPeso(tipo)
                
                if (result) {
                    
                    let dadosTipoPeso = {
                        status: true,
                        status_code: message.SUCCESS_CREATED_ITEM.status_code,
                        message: message.SUCCESS_CREATED_ITEM.message,
                        tipoPeso: result
                    }
                    
                    return dadosTipoPeso
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

const atualizarTipoPeso = async function (id, tipo, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json'){
            if (
                id              == ''  || id              == undefined || id             == null || isNaN(id)       || id <= 0  || 
                tipo.tipo  == ''  || tipo.tipo  == undefined || tipo.tipo == null || tipo.tipo.length > 45
               )
       
           {
               return message.ERROR_REQUIRED_FIELD //400
           }else{

               let result = await tipoPesoDAO.selectTipoPesoById(parseInt(id))
               
               if(result != false || typeof(result) == 'object'){

                    if(result.length > 0){

                        tipo.id = parseInt(id)

                        let result = await tipoPesoDAO.updateTipoPeso(tipo)

                        if(result){
                            let dadosPeso = {
                                status: true,
                                status_code: message.SUCCESS_UPDATED_ITEM.status_code,
                                message: message.SUCCESS_UPDATED_ITEM.message,
                                tipoPeso: result
                            }
                            return dadosPeso
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

const excluirTipoPeso = async function(id){
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELD 
        } else {

            let result = await tipoPesoDAO.selectTipoPesoById(parseInt(id))

            if(result != false || typeof(result) == 'object'){

                if (result.length > 0) {
    
                    let result = await tipoPesoDAO.deleteTipoPeso(parseInt(id))

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

const listarTipoPeso = async function(){
    try {

        let dadosTipoPeso = {}

        let result = await tipoPesoDAO.selectAllTipoPeso()

        if(result != false || typeof(result) == 'object'){
            if(result.length > 0){
                dadosTipoPeso.status = true
                dadosTipoPeso.status_code = 200
                dadosTipoPeso.itens = result.length
                dadosTipoPeso.tipos = result
        
                return dadosTipoPeso

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

const buscarTipoPeso = async function(id){
    
    try {

        if ( id === ""   ||   id === undefined || id === null  || isNaN(id)  || id <= 0 ) {
            
            return message.ERROR_REQUIRED_FIELD //400

        } else {

            let dadosTipoPeso = {}

            let result= await tipoPesoDAO.selectTipoPesoById(parseInt(id))

            if(result != false || typeof(result) == 'object'){

                if(result.length > 0){
                    dadosTipoPeso.status = true
                    dadosTipoPeso.status_code = 200
                    dadosTipoPeso.tipo = result
    
                    return dadosTipoPeso
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
          
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

module.exports = {
   inserirTipoPeso,
   atualizarTipoPeso,
   excluirTipoPeso,
   listarTipoPeso,
   buscarTipoPeso
}
