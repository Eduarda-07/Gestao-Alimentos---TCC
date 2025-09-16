/****************************************************************************************************
 * Objetivo: controller responsável pela regra de negócio referente ao CROUD de ongs
 * Data: 16/09/25
 * Autor: Eduarda Silva
 * Versão: 1.0
 ***************************************************************************************************/

// import do arquivo de mensagens e status code o projeto
const message = require('../../modulo/config.js')

const ongDAO = require('../../model/DAO/ong.js')

//import da biblioteca para criptografar as senhas
const bcrypt = require('bcrypt')

// função para tratar a inserção de uma nova ong 
const inserirOng = async function (ong, contentType) {
    try {
        // usar contentType para especificar quem chega no corpo da requisição, especificando que deve ser JSON
        if (String(contentType).toLowerCase() == 'application/json'){
            if
            (
                ong.nome      == ""  || ong.nome     == undefined  || ong.nome     == null  || ong.nome.length     > 100  ||
                ong.email     == ""  || ong.email    == undefined  || ong.email    == null  || ong.email.length    > 100  ||
                ong.senha     == ""  || ong.senha    == undefined  || ong.senha    == null  ||  
                ong.telefone  == ""  || ong.telefone == undefined  || ong.telefone == null  || ong.telefone.length > 15   
            ){
                return message.ERROR_REQUIRED_FIELD //400
            } else {
                // criptografando a senha
                let hashedSenha
                try {
                    // o numero 10 é um nível de segurança basico
                    hashedSenha = await bcrypt.hash(ong.senha, 10)
                } catch (hashError) {
                    console.log("Erro ao gerar hash da senha:", hashError)
                    return message.ERROR_INTERNAL_SERVER_CONTROLLER // erro no servidor da controller
                }
                
                ong.senha = hashedSenha

                let resultInsert = await ongDAO.insertOng(ong)
                if (resultInsert){
                    let dadosOng = {
                        status: true,
                        status_code: message.SUCCESS_CREATED_ITEM.status_code,
                        message: message.SUCCESS_CREATED_ITEM.message,
                        ong: resultInsert
                    }
                    return dadosOng
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
    inserirOng
}