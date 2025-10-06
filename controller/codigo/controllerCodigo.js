/****************************************************************************************************
 * Objetivo: controller responsável pela regra de negócio referente ao envio de emial
 * Data: 02/10/25
 * Autor: Eduarda Silva
 * Versão: 1.0
 ***************************************************************************************************/

// import do arquivo de mensagens e status code o projeto
const message = require('../../modulo/config.js')

const codigoDAO = require('../../model/DAO/recuperarSenha.js')
const emailService = require('../../index.js')


const enviarCodigo = async function(usuario, contentType){
    try {

        if(String(contentType).toLowerCase() == 'application/json'){
            if( 
                usuario.email === "" || usuario.email === undefined || usuario.email === null ||
                usuario.tipo === "" || usuario.tipo === undefined || usuario.tipo === null
            ){
                return message.ERROR_REQUIRED_FIELD //400
            }else{
                //chama o index para enviar email
                let result = await emailService.enviarEmailRecuperacao(usuario.email, usuario.tipo)

                if (result && result.success) {
                    return { status_code: 200, message: "Código de recuperação enviado com sucesso!" }
                } else {
                    // Erro pode vir do DAO (email não existe) ou do NodeMailer (conexão)
                    return { status_code: 500, message: result.message || result.error || "Falha ao enviar o código."}
                }
            }
        } else{
         return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const consultarCodigo = async function(usuario,contentType){

    try {
        if(String(contentType).toLowerCase() == 'application/json'){
            if ( 
                usuario.email      == ""  || usuario.email     == undefined  || usuario.email     == null   || usuario.email.length     > 100  ||
                usuario.tipo       == ""  || usuario.tipo      == undefined  || usuario.tipo      == null   ||
                usuario.codigo     == ""  || usuario.codigo    == undefined  || usuario.codigo    == null  
            ) {
                return message.ERROR_REQUIRED_FIELD // 400
    
            }else{
                const result = await codigoDAO.CodigoByEmail(usuario.email, usuario.tipo)
    
                if (!result) {
                    // Erro interno no DAO
                    return message.ERROR_INTERNAL_SERVER_MODEL 
                }else if (!result || !result.codigo_recuperacao) {
                // Email existe, mas não tem código de recuperação ou já foi usado
                    return { status: 404, valido: false, message: "Token não encontrado ou inválido." }
                } else if (result){

                    //
                    const { codigo_recuperacao, codigo_expiracao } = result

                    const agora = new Date();
                    const expiracao = new Date(codigo_expiracao);
    
                    if (agora > expiracao) {
                        // Token expirado: LIMPA O TOKEN e avisa o usuário
                        await codigoDAO.deleteCodigo(usuario.email, usuario.tipo)
                        return { status: 401, valido: false, message: "Código de verificação expirou. Solicite um novo." };
                    }else {

                        // verificando se o código digitado é igual ao código cadastradi no banco
                        if (usuario.codigo === codigo_recuperacao) {
                            return message.SUCCESS_UPDATED_ITEM
                        } else {
                            return { status: 401, valido: false, message: "Código de verificação inválido." }
                        }
                    }
                }
            }
        }else {
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        console.log(error);
        
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
    
   
}

const apagarCodigo = async function(usuario, contentType){
    try {

        if(String(contentType).toLowerCase() == 'application/json'){
            if( 
                usuario.email === "" || usuario.email === undefined || usuario.email === null ||
                usuario.tipo === "" || usuario.tipo === undefined || usuario.tipo === null
            ){
                return message.ERROR_REQUIRED_FIELD //400
            }else{
                
                let result = await codigoDAO.deleteCodigo(usuario.email, usuario.tipo)

                if (result) {
                    return message.SUCCESS_DELETED_ITEM
                } else {
                    return message.ERROR_INTERNAL_SERVER_MODEL
                }
            }
        } else{
         return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}


module.exports = {
    consultarCodigo,
    enviarCodigo,
    apagarCodigo
}