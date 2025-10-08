/**********************************************************************************************
 * Objetivo: controller responsável pela regra de negócio referente à atualização de senha
 * Data: 06/10/25
 * Autor: Eduarda Silva
 * Versão: 1.0
 **********************************************************************************************/

// import do arquivo de mensagens e status code o projeto
const message = require('../../modulo/config.js')

const senhaDAO = require('../../model/DAO/recuperarSenha.js')


const atualizarSenha = async function(id, email, tipo, senha, contentType){

    try{
        
        if(String(contentType).toLowerCase() == 'application/json'){

            if( 
                tipo  == "" || tipo  == undefined || tipo  == null || tipo.trim() === ''||
                senha == "" || senha == undefined || senha == null || senha.trim() === ''||
                (
                    (email === "" || email === undefined || email === null || email.trim() === '')  && 
                    (id === "" || id === undefined || id === null || isNaN(id) || id <= 0)
                )

            ) {
            
                return message.ERROR_REQUIRED_FIELD //400
    
            } else {
                let senhaHash
                    try {
                        // o numero 10 é um nível de segurança basico
                        hashedSenha = await bcrypt.hash(senha, 10)
                    } catch (hashError) {
                        console.log("Erro ao gerar hash da senha:", hashError)
                        return message.ERROR_INTERNAL_SERVER_CONTROLLER // erro no servidor da controller
                    }

                let result = await senhaDAO.updateSenha(parseInt(id), senhaHash, tipo, email)
            
    
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
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
