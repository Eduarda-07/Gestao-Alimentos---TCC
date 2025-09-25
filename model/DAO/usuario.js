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
        const result = await prisma.$executeRaw`CALL inserir_usuario(${usuario.nome}, ${usuario.email}, ${usuario.senha}, ${usuario.cpf}, ${usuario.telefone})`

        // result === 1 -> para verificar se uma linha foi afetada (adicionada)
        if (result === 1) { 
            let lastIdResult = await prisma.$queryRawUnsafe(`SELECT LAST_INSERT_ID() AS id`)


            let idGerado = lastIdResult[0].id

            return {
                id: Number(idGerado), 
                nome: usuario.nome,
                email: usuario.email,
                senha: usuario.senha,
                cpf: usuario.cpf,
                telefone: usuario.telefone
            }
        } else {
            return false
        }

    } catch (error) {
        console.log(error)
        return false
    }
}

// exportando funções
module.exports = {
    insertUsuario
}