/****************************************************************************************************
 * Objetivo: criar a comunicação com o banco de dados, para fazer o CROUD da tbl_alimento_categoria
 * Data: 16/10/2025
 * Autor: Eduara
 * Versão: 1.0
 ***************************************************************************************************/

//Import do arquivo de mensagens e status code do projeto
const message = require('../../modulo/config.js')


const alimentoCatDAO = require('../../model/DAO/alimento_categoria.js')

//Função para tratar a inserção de um novo genero no DAO
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

module.exports = {
    inserirAlimentoCat
}