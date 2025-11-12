/******************************************************************************************************
 * objetivo: controller responsável pela regra de negócio referente ao filtro
 * data: 04/11/25
 * autor: Eduarda Silva
 * versão: 1.0
 ******************************************************************************************************/

const message = require('../../modulo/config')

const filtrosDAO = require('../../model/DAO/filtros')

const categoriaDAO = require('../../model/DAO/categoria')
const empresaDAO = require('../../model/DAO/empresa')

const buscarAlimentoCat = async function(id_categoria){
    try {
        if(id_categoria == '' || id_categoria == undefined || id_categoria == null || isNaN(id_categoria) || id_categoria <=0){
            return message.ERROR_REQUIRED_FIELD //400
        }else{

            let resultCategoria = await categoriaDAO.selectCategoriaById(parseInt(id_categoria))

            if (resultCategoria) {
                let dadosAlimentoCat = {}

                let resultAlimentoCat = await filtrosDAO.selectAlimentoCat(parseInt(id_categoria))
            
                if(resultAlimentoCat != false || typeof(resultAlimentoCat) == 'object'){
                    if(resultAlimentoCat.length > 0){

                        const alimentosRenomeados = resultAlimentoCat.map(item => ({
                            id_alimento: item.f0, 
                            nome_alimento: item.f1, 
                            quantidade: item.f2,
                            peso: item.f3,
                            id_tipo_peso: item.f4,
                            tipo: item.f5,
                            data_de_validade: item.f6,
                            descricao: item.f7,
                            imagem: item.f8,
                            id_empresa: item.f9,
                            nome_empresa: item.f10,
                            foto_empresa: item.f11,
                            nome_categoria: item.f12 
                        }))

                        //Criando um JSON de retorno de dados para a API
                        dadosAlimentoCat.status = true
                        dadosAlimentoCat.status_code = 200
                        dadosAlimentoCat.resultFiltro = alimentosRenomeados

                        return dadosAlimentoCat //200
                    }else{
                        return message.ERROR_NOT_FOUND //404
                    }
                } else {
                    return message.ERROR_INTERNAL_SERVER_MODEL //404
                }
            
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const buscarEmpresaAlimentos = async function(id_empresa){
    try {
        if(id_empresa == '' || id_empresa == undefined || id_empresa == null || isNaN(id_empresa) || id_empresa <=0){
            return message.ERROR_REQUIRED_FIELD //400
        }else{

            let resultEmpresa = await empresaDAO.selectEmpresaById(parseInt(id_empresa))

            if (resultEmpresa) {
                let dadosAlimento = {}

                let resultAlimento = await filtrosDAO.selectAlimentoEmpresa(parseInt(id_empresa))
            
                if(resultAlimento != false || typeof(resultAlimento) == 'object'){
                    if(resultAlimento.length > 0){

                        const alimentosRenomeados = resultAlimento.map(item => ({
                            id_alimento: item.f0, 
                            nome_alimento: item.f1, 
                            quantidade: item.f2,
                            peso: item.f3,
                            id_tipo_peso: item.f4,
                            tipo: item.f5,
                            data_de_validade: item.f6,
                            descricao: item.f7,
                            imagem: item.f8,
                            id_empresa: item.f9,
                            nome_empresa: item.f10,
                            foto_empresa: item.f11,
                            nome_categoria: item.f12 
                        }))

                        //Criando um JSON de retorno de dados para a API
                        dadosAlimento.status = true
                        dadosAlimento.status_code = 200
                        dadosAlimento.resultFiltro = alimentosRenomeados

                        return dadosAlimento //200
                    }else{
                        return message.ERROR_NOT_FOUND //404
                    }
                } else {
                    return message.ERROR_INTERNAL_SERVER_MODEL //404
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
    buscarAlimentoCat,
    buscarEmpresaAlimentos
}