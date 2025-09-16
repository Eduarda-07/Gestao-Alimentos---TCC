/************************************************************************************************
 * Objetivo: criar a comunicação com o banco de dados, para fazer o CRUD de ongs
 * Data: 16/09/25
 * Autor: Eduarda Silva
 * Versão: 1.1
 ************************************************************************************************/

// import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')

// instancia a biblioteca do prisma/client
const prisma = new PrismaClient()

// função para inserir uma nova ong
const insertOng = async function(ong) {
    try {
        let sql = `INSERT INTO tbl_ongs(
                       nome,
                       email,
                       senha,
                       telefone 
                   )
                   VALUES (
                       '${ong.nome}',
                       '${ong.email}',
                       '${ong.senha}',
                       '${ong.telefone}'
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
    insertOng
}