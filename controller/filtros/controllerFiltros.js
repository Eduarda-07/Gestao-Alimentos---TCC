/******************************************************************************************************
 * objetivo: controller responsável pela regra de negócio referente ao filtro
 * data: 04/11/25
 * autor: Eduarda Silva
 * versão: 1.0
 ******************************************************************************************************/

const message = require('../../modulo/config')

const filtrosDAO = require('../../model/DAO/filtros')

const buscarAlimentoCat = async function(id_categoria){
    try {
        if(id_categoria == '' || id_categoria == undefined || id_categoria == null || isNaN(id_categoria) || id_categoria <=0){
            return message.ERROR_REQUIRED_FIELD //400
        }else{
            let dadosAlimentoCat = {}

            let resultAlimentoCat = await filtrosDAO.selectAlimentoCat(parseInt(id_categoria))
            
            if(resultAlimentoCat != false || typeof(resultAlimentoCat) == 'object'){
                if(resultAlimentoCat.length > 0){
                     //Criando um JSON de retorno de dados para a API
                    dadosAlimentoCat.status = true
                    dadosAlimentoCat.status_code = 200
                    dadosAlimentoCat.receitaCategoria = resultAlimentoCat

                    return dadosAlimentoCat //200
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
    buscarAlimentoCat
}