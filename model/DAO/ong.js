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
       
        const result = await prisma.$executeRaw `CALL inserir_ong(${ong.nome}, ${ong.email}, ${ong.senha}, ${ong.telefone})`;


        // result === 1 -> para verificar se uma linha foi afetada (adicionada)
        if (result === 1) { 
            let lastIdResult = await prisma.$queryRawUnsafe(`SELECT LAST_INSERT_ID() AS id`)


            let idGerado = lastIdResult[0].id

            return {
                id: Number(idGerado), 
                nome: ong.nome,
                email: ong.email,
                senha: ong.senha,
                telefone: ong.telefone
            }
        } else {
            return false
        }

    } catch (error) {
        console.log(error)
        return false
    }
}

const selectOngById = async function(id) {
    try {
        const sql = `SELECT * FROM tbl_ongs WHERE id = ${id}`;
        
        const result = await prisma.$queryRawUnsafe(sql);
        // console.log(result);
        
        if (result && result.length > 0) {
            return result[0]
        } else {
            return null 
        }
    } catch (error) {
        return false
    }
}


// exportando funções
module.exports = {
    insertOng,
    selectOngById
}