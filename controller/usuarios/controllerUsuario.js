/****************************************************************************************************
 * Objetivo: controller responsável pela regra de negócio referente ao CROUD de usuários
 * Data: 16/09/25
 * Autor: Eduarda Silva
 * Versão: 1.0
 ***************************************************************************************************/

// import do arquivo de mensagens e status code o projeto
const message = require('../../modulo/config.js')

const usuarioDAO = require('../../model/DAO/usuario.js')

//import da biblioteca para criptografar as senhas
const bcrypt = require('bcrypt')

// função para tratar a inserção de um novo usuário 
const inserirUsuario = async function (usuario, contentType) {

    try {
        
        // usar contentType para especificar quem chega no corpo da requisição, especificando que deve ser JSON
        if (String(contentType).toLowerCase() == 'application/json'){
            if
            (
                usuario.nome      == ""  || usuario.nome     == undefined  || usuario.nome     == null  || usuario.nome.length     > 100  ||
                usuario.email     == ""  || usuario.email    == undefined  || usuario.email    == null  || usuario.email.length    > 100  ||
                usuario.senha     == ""  || usuario.senha    == undefined  || usuario.senha    == null  || 
                usuario.cpf       == ""  || usuario.cpf      == undefined  || usuario.cpf      == null  || usuario.cpf.length      > 15   ||
                usuario.telefone  == ""  || usuario.telefone == undefined  || usuario.telefone == null  || usuario.telefone.length > 15   
            ){
                return message.ERROR_REQUIRED_FIELD //400
            } else {
                // criptografando a senha
                let hashedSenha
                try {
                    // o numero 10 é um nível de segurança basico
                    hashedSenha = await bcrypt.hash(usuario.senha, 10)
                } catch (hashError) {
                    console.log("Erro ao gerar hash da senha:", hashError)
                    return message.ERROR_INTERNAL_SERVER_CONTROLLER // erro no servidor da controller
                }
                
                usuario.senha = hashedSenha

                let resultInsert = await usuarioDAO.insertUsuario(usuario)
                if (resultInsert){
                    let dadosUsuario = {
                        status: true,
                        status_code: message.SUCCESS_CREATED_ITEM.status_code,
                        message: message.SUCCESS_CREATED_ITEM.message,
                        usuario: resultInsert
                    }
                    return dadosUsuario
                } else {
                    return message.ERROR_INTERNAL_SERVER_MODEL // Retorna 500 - Erro no modelo/DAO
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
    
}

// exportando funções
module.exports = {
    inserirUsuario
}