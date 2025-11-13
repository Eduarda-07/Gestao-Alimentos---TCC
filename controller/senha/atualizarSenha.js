/**********************************************************************************************
 * Objetivo: controller responsável pela regra de negócio referente à atualização de senha
 * Data: 06/10/25
 * Autor: Eduarda Silva
 * Versão: 1.0
 **********************************************************************************************/

// import do arquivo de mensagens e status code o projeto
const message = require('../../modulo/config.js')

const senhaDAO = require('../../model/DAO/recuperarSenha.js')

const bcrypt = require('bcrypt')


const atualizarSenha = async function( dados,contentType){

    try{
        
        if(String(contentType).toLowerCase() == 'application/json'){

            if( 
                // .trim() verifica se foi enviado um campo apenas com espaço
                dados.tipo  == "" || dados.tipo  == undefined || dados.tipo  == null || dados.tipo.trim() === ''||
                dados.senha == "" || dados.senha == undefined || dados.senha == null || dados.senha.trim() === ''||
                (
                    (dados.email === "" || dados.email === undefined || dados.email === null || dados.email.trim() === '')  && 
                    (dados.id === "" || dados.id === undefined || dados.id === null || isNaN(dados.id) || dados.id <= 0)
                )

            ) {
                
                return message.ERROR_REQUIRED_FIELD //400
    
            } else {
                let senhaHash
                    try {
                        // o numero 10 é um nível de segurança basico
                        senhaHash = await bcrypt.hash(dados.senha, 10)
                    } catch (hashError) {
                        console.log("Erro ao gerar hash da senha:", hashError)
                        return message.ERROR_INTERNAL_SERVER_CONTROLLER // erro no servidor da controller
                    }

                let result = await senhaDAO.updateSenha(parseInt(dados.id), senhaHash, dados.tipo, dados.email)
            
    
                if(result){
                    return message.SUCCESS_UPDATED_ITEM
                } else if (result === 0) {

                    return message.ERROR_NOT_FOUND // 404
                } else {
                    return message.ERROR_INTERNAL_SERVER_MODEL // 500
                }
        }

        }else{
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        console.log(error);
        
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

module.exports = {
    atualizarSenha
}