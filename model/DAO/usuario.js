/************************************************************************************************
 * Objetivo: criar a comunicação com o banco de dados, para fazer o CRUD de usuários
 * Data: 16/09/25
 * Autor: Eduarda Silva
 * Versão: 1.1
 ************************************************************************************************/

// import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')

// instancia a biblioteca do prisma/client
const prisma = new PrismaClient()

// função para inserir um novo usuario
const insertUsuario = async function(usuario) {
    try {
        let sql = `INSERT INTO tbl_usuarios(
                       nome,
                       email,
                       senha,
                       cpf,
                       telefone 
                   )
                   VALUES (
                       '${usuario.nome}',
                       '${usuario.email}',
                       '${usuario.senha}',
                       '${usuario.cpf}',
                       '${usuario.telefone}'
                   )`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        console.log(error)
        return false
    }
}

// exportando funções
module.exports = {
    insertUsuario
}