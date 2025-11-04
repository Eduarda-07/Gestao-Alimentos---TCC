/************************************************************************************************
 * objetivo: criar a comunicação com o banco de dados, para fazer o CRUD de tipo de peso
 * data: 04/11/25
 * autor: Eduarda Silva
 * versão: 1.1
 ************************************************************************************************/

// import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')
const e = require('cors')

// instancia a biblioteca do prisma/client
const prisma = new PrismaClient()

// função para inserir um novo tipo
const insertTipoPeso = async function(tipo) {
    try {
        let result = await prisma.$executeRaw `INSERT INTO tbl_tipo_peso (tipo) VALUES (${tipo.tipo})`
        
        if (result > 0){
            let ultimoId =  await prisma.$queryRawUnsafe(`SELECT LAST_INSERT_ID() AS id`)

            let idGerado = ultimoId[0].id

            return {
                id: Number(idGerado), 
                tipo: tipo.tipo
            }
          
        }else{
            return false
        }

    } catch (error) {
        console.log(error);
        
        return false
    }
}

// função para atualizar um tipo de peso
const updateTipoPeso = async function(tipo) {
    try {
        let sql = `UPDATE tbl_tipo_peso
                   SET tipo = '${tipo.tipo}'
                   WHERE id = ${tipo.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result > 0){

            return {
                tipo: tipo.tipo
            }
           
        }else{
            return false
        }

    } catch (error) {
        // console.log(error)
        return false
    }
}

// função para deletar um tipo de peso
const deleteTipoPeso = async function(id) {
    try {
        let sql = `DELETE FROM tbl_tipo_peso WHERE id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        // console.log(error)
        return false
    }
}

// função para retornar todos os tipos
const selectAllTipoPeso = async function() {
    try {
        let sql = 'SELECT * FROM tbl_tipo_peso ORDER BY id DESC'

        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false
    } catch (error) {
        // console.log(error)
        return false
    }
}

// função para buscar um tipo pelo id
const selectTipoPesoById = async function(id) {
    try {
        let sql = `SELECT * FROM tbl_tipo_peso WHERE id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false
    } catch (error) {
        // console.log(error)
        return false
    }
}

// exporta as funções para uso externo
module.exports = {
    insertTipoPeso,
    updateTipoPeso,
    deleteTipoPeso,
    selectAllTipoPeso,
    selectTipoPesoById
}