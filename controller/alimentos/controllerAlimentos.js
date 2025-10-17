/******************************************************************************************************
 * objetivo: controller responsável pela regra de negócio referente ao CROUD de alimentos
 * data: 16/10/25
 * autor: Eduarda Silva
 * versão: 1.0
 ******************************************************************************************************/

const message = require('../../modulo/config')

const alimentoDAO = require('../../model/DAO/alimento')
const alimentoCatDAO = require('../../model/DAO/alimento_categoria')
const empresaDAO = require ('../../model/DAO/empresa')


const controllerAlimentoCat  = require('./controllerAlimentoCat')

const inserirAlimento = async function (alimento, contentType){
    try {
        if (String(contentType).toLocaleLowerCase() == 'application/json') {
            if (
                alimento.nome             == "" || alimento.nome             == undefined || alimento.nome             == null || alimento.nome.length       > 150 ||
                alimento.quantidade       == "" || alimento.quantidade       == undefined || alimento.quantidade       == null || isNaN(alimento.quantidade) || Number(alimento.quantidade) <= 0 ||
                alimento.data_de_validade == "" || alimento.data_de_validade == undefined || alimento.data_de_validade == null ||
                alimento.descricao        == "" || alimento.descricao        == undefined || alimento.descricao        == null ||
                alimento.imagem           == "" || alimento.imagem           == undefined || alimento.imagem           == null ||
                alimento.id_empresa       == "" || alimento.id_empresa       == undefined || alimento.id_empresa       == null || isNaN(alimento.id_empresa) || Number(alimento.id_empresa) <= 0
            ) {
                
                return message.ERROR_REQUIRED_FIELD

            } else {
                    
                const idEmpresa = alimento.id_empresa;
                
                let empresaExiste = await empresaDAO.selectEmpresaById(idEmpresa);

                if (empresaExiste === false) {
                    return message.ERROR_INTERNAL_SERVER_MODEL
                }

                if (empresaExiste === null) {
                     
                    return message.ERROR_NOT_FOUND
                
                }

                const resultAlimento = await alimentoDAO.insertAlimento(alimento)

                if (resultAlimento) {
                    const resultadosCategorias = []
                    if (alimento.categorias && Array.isArray(alimento.categorias)) {
                            
                        

                        for(let categoria of alimento.categorias){
                            if (categoria.id && !isNaN(categoria.id)) {
                                let alimentoCat = {
                                    id_alimento : resultAlimento.id,
                                    id_categoria : categoria.id
                                }
                               const resultAlimentoCat =  await alimentoCatDAO.insertAlimentoCat(alimentoCat)

                               resultadosCategorias.push(resultAlimentoCat)
                            } 
                        }
                    } 

                    let dados = {
                        status: true,
                        status_code: message.SUCCESS_CREATED_ITEM.status_code,
                        message: message.SUCCESS_CREATED_ITEM.message,
                        alimento: resultAlimento,
                        categorias: resultadosCategorias
                    }
                    
                    return dados
                } else {
                    return message.ERROR_INTERNAL_SERVER_MODEL
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {

        console.log(error);

        return message.ERROR_INTERNAL_SERVER_CONTROLLER

    }
}

module.exports = {
    inserirAlimento
}

