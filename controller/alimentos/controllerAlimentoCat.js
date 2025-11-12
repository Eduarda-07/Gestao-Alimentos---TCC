/****************************************************************************************************
 * Objetivo: criar a comunicação com o banco de dados, para fazer o CROUD da tbl_alimento_categoria
 * Data: 16/10/2025
 * Autor: Eduara
 * Versão: 1.0
 ***************************************************************************************************/

//Import do arquivo de mensagens e status code do projeto
const message = require('../../modulo/config.js')


const alimentoCatDAO = require('../../model/DAO/alimento_categoria.js')


const inserirAlimentoCat = async function(alimentoCat, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
                if (
                    alimentoCat.id_alimento       == ''   || alimentoCat.id_alimento     == undefined    || alimentoCat.id_alimento  == null || isNaN(alimentoCat.id_alimento)  || alimentoCat.id_alimento  <=0 ||
                    alimentoCat.id_categoria      == ''   || alimentoCat.id_categoria    == undefined    || alimentoCat.id_categoria == null || isNaN(alimentoCat.id_categoria) || alimentoCat.id_categoria <=0
                )
                {
                    return message.ERROR_REQUIRED_FIELD //400
                }else{
                    //Chama a função para inserir no BD e aguarda o retorno da função
                    let resultAlimentoCat = await alimentoCatDAO.insertAlimentoCat(alimentoCat)

                    if(resultAlimentoCat)
                        return message.SUCCESS_CREATED_ITEM //201
                    else
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                }
        }else{
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para retornar os generos relacionados a um filme
const buscarCatPorAlimento = async function(idAlimento){
    try {
        if(idAlimento == '' || idAlimento == undefined || idAlimento == null || isNaN(idAlimento) || idAlimento <=0){
            return message.ERROR_REQUIRED_FIELD //400
        }else{
            let dadosAlimentoCat = {} 

            let result = await alimentoCatDAO.selectCatByIdAlimento(parseInt(idAlimento))
            
            if(result && Array.isArray(result) && result.length > 0){
               
                dadosAlimentoCat.status = true
                dadosAlimentoCat.status_code = 200
                dadosAlimentoCat.categoria = result 

                return dadosAlimentoCat // 200
            }else{
           
                return message.ERROR_NOT_FOUND // 404
            }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

module.exports = {
    inserirAlimentoCat,
    buscarCatPorAlimento
}