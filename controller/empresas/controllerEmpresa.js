/****************************************************************************************************
 * Objetivo: controller responsável pela regra de negócio referente ao CROUD de empresas
 * Data: 16/09/25
 * Autor: Eduarda Silva
 * Versão: 1.0
 ***************************************************************************************************/

// import do arquivo de mensagens e status code o projeto
const message = require('../../modulo/config.js')

const empresaDAO = require('../../model/DAO/empresa.js')

//import da biblioteca para criptografar as senhas
const bcrypt = require('bcrypt')

// função para tratar a inserção de um novo usuário 
const inserirEmpresa = async function (empresa, contentType) {

    try {
        
        // usar contentType para especificar quem chega no corpo da requisição, especificando que deve ser JSON
        if (String(contentType).toLowerCase() == 'application/json'){
            if
            (
                empresa.nome      == ""  || empresa.nome     == undefined  || empresa.nome     == null  || empresa.nome.length     > 100  ||
                empresa.email     == ""  || empresa.email    == undefined  || empresa.email    == null  || empresa.email.length    > 100  ||
                empresa.senha     == ""  || empresa.senha    == undefined  || empresa.senha    == null  ||   
                empresa.cnpj      == ""  || empresa.cnpj     == undefined  || empresa.cnpj     == null  || empresa.cnpj.length     > 15   ||
                empresa.telefone  == ""  || empresa.telefone == undefined  || empresa.telefone == null  || empresa.telefone.length > 15   
                
            ){
                return message.ERROR_REQUIRED_FIELD //400
            } else {
                // criptografando a senha
                let hashedSenha
                try {
                    // o numero 10 é um nível de segurança basico
                    hashedSenha = await bcrypt.hash(empresa.senha, 10)
                } catch (hashError) {
                    console.log("Erro ao gerar hash da senha:", hashError)
                    return message.ERROR_INTERNAL_SERVER_CONTROLLER // erro no servidor da controller
                }
                
                empresa.senha = hashedSenha

                let resultInsert = await usuariosDAO.insertUsuario(empresa)
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
    inserirEmpresa
}