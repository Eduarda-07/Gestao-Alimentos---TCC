/*******************************************************************************************************
 * Objetivo:  criar a comunicação com o banco de dados, para fazer o CROUD de filmes
 * Data: 13/06/2025
 * Autor: Eduara
 * Versão: 1.0
 ******************************************************************************************************/
//import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')

//Instancia (criar um objeto a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

//Função para inserir um novo FilmeGenero
const insertAlimentoCat = async function(alimentoCat){
  try {

      let sql = `insert into tbl_alimento_categoria  ( 
                                          id_alimento,
                                          id_categoria
                                        ) 
                                          values 
                                        (
                                          ${alimentoCat.id_alimento},
                                          ${alimentoCat.id_categoria}
                                        )`
                                
      let result = await prisma.$executeRawUnsafe(sql)

       if (result === 1) { 
            let lastIdResult = await prisma.$queryRawUnsafe(`SELECT LAST_INSERT_ID() AS id`)

            let idGerado = lastIdResult[0].id

            return {
                id: Number(idGerado), 
                alimento: alimentoCat.id_alimento,
                categoria: alimentoCat.id_categoria
            }
        } else
          return false
  } catch (error) {
      
      return false
  }
}

//Função para atualizar um FilmeGenero existente
const updateFilmeGenero = async function(filmeGenero){
  try {
      let sql = `update tbl_filme_genero set id_filme  = '${filmeGenero.id_filme}',
                                             id_genero = '${filmeGenero.id_genero}'
                                        
                            where id = ${filmeGenero.id}                
                            `
      let resultFilmeGenero = await prisma.$executeRawUnsafe(sql)

      if(resultFilmeGenero)
        return true
      else
        return false
  } catch (error) {
    return false
  }
}
  
//Função para excluir um FilmeGenero existente
const deleteByFilme = async function(id_filme){
  try {
    let sql = `delete from tbl_filme_genero where id_filme = ${id_filme}`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
      return true
    else 
      return false
  } catch (error) {
    return false
  }
}

//Função para retornar todos os FilmeGeneros existentes
const selectAllFilmeGenero = async function(){

    try {
      //ScriptSQL para retornar todos os dados
      let sql = 'select * from tbl_filme_genero order by id desc'

      //Executa o scriptSQL no BD e aguarda o retorno dos dados
      let result = await prisma.$queryRawUnsafe(sql)

      if(result)
        return result
      else
        return false

    } catch (error) {
      return false
    }
}

//Função para buscar um FilmeGenero pelo ID
const selectByIdFilmeGenero = async function(id){
  try {
    let sql = `select * from tbl_filme_genero where id = ${id}`

    let result = await prisma.$queryRawUnsafe(sql)

    if (result)
      return result
    else 
      return false
  } catch (error) {
    return false
  }
}

//Função para retornar os filmes pelo genero
const selectFilmeByIdGenero = async function(idGenero){
  try {
      let sql = `select * from tbl_filme 
                                            inner join tbl_filme_genero
                                              on tbl_filme.id = tbl_filme_genero.id_filme
                                            inner join tbl_genero
                                              on tbl_genero.id = tbl_filme_genero.id_genero
                  where tbl_filme_genero.id_genero = ${idGenero}`

       let result = await prisma.$queryRawUnsafe(sql)
     
    if (result){
      return result
    }else {
      
      return false
    }
  } catch (error) {
    
      return false
  }
}

//Função para retornar os generos pelo Filme
const selectGeneroByIdFilme = async function(idFilme){
 try {
      let sql = `select tbl_genero.* from tbl_filme_genero
                                inner join tbl_genero
                                  on tbl_genero.id_genero = tbl_filme_genero.id_genero
                  where tbl_filme_genero.id_filme = ${idFilme}`
                  
      let result = await prisma.$queryRawUnsafe(sql)
    if (result && result.length > 0)
        return result
    else 
        return false
  } catch (error) {
      return false
  }
}



module.exports = {
    insertAlimentoCat,
    updateFilmeGenero,
    deleteByFilme,
    selectAllFilmeGenero,
    selectByIdFilmeGenero,
    selectFilmeByIdGenero,
    selectGeneroByIdFilme
} 