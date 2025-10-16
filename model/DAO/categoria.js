/************************************************************************************************
 * objetivo: criar a comunicação com o banco de dados, para fazer o CRUD de categorias
 * data: 16/10/25
 * autor: Eduarda Silva
 * versão: 1.1
 ************************************************************************************************/

// import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')
const e = require('cors')

// instancia a biblioteca do prisma/client
const prisma = new PrismaClient()

// função para inserir uma nova categoria
const insertCategoria = async function(categoria) {
    try {
        let result = await prisma.$executeRaw `INSERT INTO tbl_categoria (nome) VALUES (${categoria.nome})`
        
        if (result > 0){
            let ultimoId =  await prisma.$queryRawUnsafe(`SELECT LAST_INSERT_ID() AS id`)

            let idGerado = ultimoId[0].id

            return {
                id: Number(idGerado), 
                categoria: categoria.nome
            }
           
          
        }else{
            return false
        }

    } catch (error) {
        console.log(error);
        
        return false
    }
}



// função para atualizar uma categoria existente
const updateCategoria = async function(categoria) {
    try {
        let sql = `UPDATE tbl_categoria
                   SET nome = '${categoria.nome}'
                   WHERE id = ${categoria.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result > 0){

            return {
                categoria: categoria.nome
            }
           
          
        }else{
            return false
        }

    } catch (error) {
        console.log(error)
        return false
    }
}

// função para deletar uma categoria existente
const deleteCategoria = async function(id) {
    try {
        let sql = `DELETE FROM tbl_categoria WHERE id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        console.log(error)
        return false
    }
}

// função para retornar todas as categorias
const selectAllCategorias = async function() {
    try {
        let sql = 'SELECT * FROM tbl_categoria ORDER BY id DESC'

        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false
    } catch (error) {
        console.log(error)
        return false
    }
}

// função para buscar uma categoria pelo id
const selectCategoriaById = async function(id) {
    try {
        let sql = `SELECT * FROM tbl_categoria WHERE id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false
    } catch (error) {
        console.log(error)
        return false
    }
}

// exporta as funções para uso externo
module.exports = {
    insertCategoria,
    updateCategoria,
    deleteCategoria,
    selectAllCategorias,
    selectCategoriaById
}