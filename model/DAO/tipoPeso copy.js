/************************************************************************************************
 * objetivo: criar a comunicação com o banco de dados, para fazer o CRUD de peso
 * data: 04/11/25
 * autor: Eduarda Silva
 * versão: 1.1
 ************************************************************************************************/

// import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')
const e = require('cors')

// instancia a biblioteca do prisma/client
const prisma = new PrismaClient()


const insertPeso = async function(peso) {
    try {
        let result = await prisma.$executeRaw `INSERT INTO tbl_peso (peso) VALUES (${peso.peso})`
        
        if (result > 0){
            let ultimoId =  await prisma.$queryRawUnsafe(`SELECT LAST_INSERT_ID() AS id`)

            let idGerado = ultimoId[0].id

            return {
                id: Number(idGerado), 
                peso: peso.peso
            }
          
        }else{
            return false
        }

    } catch (error) {
        console.log(error);
        
        return false
    }
}


const updatePeso = async function(peso) {
    try {
        let sql = `UPDATE tbl_peso
                   SET tipo = '${peso.peso}'
                   WHERE id = ${peso.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result > 0){

            return {
                peso: peso.peso
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
    insertTipoPeso: insertPeso,
    updateTipoPeso: updatePeso,
    deleteTipoPeso,
    selectAllTipoPeso,
    selectTipoPesoById
}