/******************************************************************************************************
 * objetivo: controller responsável pela regra de negócio referente ao filtro
 * data: 04/11/25
 * autor: Eduarda Silva
 * versão: 1.0
 ******************************************************************************************************/

const message = require('../../modulo/config')

const filtrosDAO = require('../../model/DAO/filtros')

const categoriaDAO = require('../../model/DAO/categoria')

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
                            id_alimento: item.f0, // Mapeado de 'a.id'
                            nome_alimento: item.f1, // Mapeado de 'a.nome'
                            quantidade: item.f2,
                            peso: item.f3,
                            id_tipo_peso: item.f4,
                            data_de_validade: item.f5,
                            descricao: item.f6,
                            imagem: item.f7,
                            id_empresa: item.f8,
                            nome_empresa: item.f9,
                            foto_empresa: item.f10,
                            nome_categoria: item.f11 // O campo final, que é o nome da categoria
                        }));

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


module.exports = {
    buscarAlimentoCat
}