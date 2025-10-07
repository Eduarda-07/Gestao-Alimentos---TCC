/**********************************************************************************************
 * Objetivo: controller responsável pela regra de negócio referente à atualização de senha
 * Data: 06/10/25
 * Autor: Eduarda Silva
 * Versão: 1.0
 **********************************************************************************************/

// import do arquivo de mensagens e status code o projeto
const message = require('../../modulo/config.js')

const senhaDAO = require('../../model/DAO/recuperarSenha.js')


const atualizarSenha = async function(id, email, tipo, contentType){

    try{
        
        if(String(contentType).toLowerCase() == 'application/json'){

            if ( 
                (id == null && id == undefined && (isNaN(id) || id <= 0)) &&   
                (email == null && email == undefined  || email == "" ))
            ) {
            
            return message.ERROR_REQUIRED_FIELD //400
    
            } else {
    
            let arrayReceita = []
            let dadosReceita = {}

            let resultReceita= await filtroDAO.selectReceitaFiltro(parseInt(id_categoria), parseInt(id_dificuldade))
            
    
            if(resultReceita!= false || typeof(resultReceita) == 'object'){
    
                if(resultReceita.length > 0){
    
                    dadosReceita.status = true
                    dadosReceita.status_code = 200
                    dadosReceita.itens = resultReceita.length
    
                    for(const itemReceita of resultReceita){
    
                        let dadosUsuario = await controllerUsuario.buscarUsuario(itemReceita.id_usuarios)
                        itemReceita.usuario = dadosUsuario.user
                        delete itemReceita.id_usuarios
                            
                        let dadosDificuldade = await controllerNivelDificuldade.buscarNivelDificuldade(itemReceita.id_nivel_dificuldade)
                        itemReceita.dificuldade = dadosDificuldade.nivel
                        delete itemReceita.id_nivel_dificuldade
    
                        let dadosCategoria = await controllerReceitaCategoria.buscarCategoriaPorReceita(itemReceita.id)
                        if (dadosCategoria && Array.isArray(dadosCategoria.receitaCategoria)) {
                            itemReceita.categoria = dadosCategoria.receitaCategoria
                        } else {
                            itemReceita.categoria = []
                        }
    
                        arrayReceita.push(itemReceita)
     
                    }
                    dadosReceita.receita = arrayReceita
    
                    return dadosReceita
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
          
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }

        }else{
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
    }
