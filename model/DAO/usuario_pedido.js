/*******************************************************************************************************
 * Objetivo:  criar a comunicação com o banco de dados, para fazer o CROUD de pedidosUsuario
 * Data: 12/11/2025
 * Autor: Eduara
 * Versão: 1.0
 ******************************************************************************************************/
//import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')

//Instancia (criar um objeto a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

const insertUserPedido = async function(userPedido){
  try {

      const result = await prisma.$executeRaw `CALL inserir_pedido_usuario(${userPedido.id_usuario}, ${userPedido.id_alimento}, ${userPedido.quantidade})`

       if (result === 1) { 
            let lastIdResult = await prisma.$queryRawUnsafe(`SELECT LAST_INSERT_ID() AS id`)

            let idGerado = lastIdResult[0].id

            return {
                id: Number(idGerado), 
                usuario: userPedido.id_usuario,
                alimento: userPedido.id_alimento,
                quantidade: userPedido.quantidade
            }
        } else
          return false
  } catch (error) {
      
      return false
  }
}

//Função para atualizar um FilmeGenero existente
// const updateFilmeGenero = async function(filmeGenero){
//   try {
//       let sql = `update tbl_filme_genero set id_filme  = '${filmeGenero.id_filme}',
//                                              id_genero = '${filmeGenero.id_genero}'
                                        
//                             where id = ${filmeGenero.id}                
//                             `
//       let resultFilmeGenero = await prisma.$executeRawUnsafe(sql)

//       if(resultFilmeGenero)
//         return true
//       else
//         return false
//   } catch (error) {
//     return false
//   }
// }
  
//Função para excluir um FilmeGenero existente
// const deleteByFilme = async function(id_filme){
//   try {
//     let sql = `delete from tbl_filme_genero where id_filme = ${id_filme}`

//     let result = await prisma.$executeRawUnsafe(sql)

//     if (result)
//       return true
//     else 
//       return false
//   } catch (error) {
//     return false
//   }
// }

// //Função para retornar todos os FilmeGeneros existentes
// const selectAllFilmeGenero = async function(){

//     try {
//       //ScriptSQL para retornar todos os dados
//       let sql = 'select * from tbl_filme_genero order by id desc'

//       //Executa o scriptSQL no BD e aguarda o retorno dos dados
//       let result = await prisma.$queryRawUnsafe(sql)

//       if(result)
//         return result
//       else
//         return false

//     } catch (error) {
//       return false
//     }
// }

// //Função para buscar um FilmeGenero pelo ID
// const selectByIdFilmeGenero = async function(id){
//   try {
//     let sql = `select * from tbl_filme_genero where id = ${id}`

//     let result = await prisma.$queryRawUnsafe(sql)

//     if (result)
//       return result
//     else 
//       return false
//   } catch (error) {
//     return false
//   }
// }

// //Função para retornar os filmes pelo genero
// const selectFilmeByIdGenero = async function(idCategoria){
//   try {
//       let sql = `select * from tbl_filme 
//                                             inner join tbl_alimento_categoria
//                                               on tbl_alimento.id = tbl_alimento_categoria.id_alimento
//                                             inner join tbl_categorias
//                                               on tbl_categorias.id = tbl_alimento_categoria.id_categoria
//                   where tbl_alimento_categoria.id_categoria = ${idCategoria}`

//        let result = await prisma.$queryRawUnsafe(sql)
     
//     if (result){
//       return result
//     }else {
      
//       return false
//     }
//   } catch (error) {
    
//       return false
//   }
// }


const selectCatByIdAlimento = async function(idAlimento){
 try {
      let sql = `SELECT tbl_categoria.* FROM tbl_alimento_categoria 
                   INNER JOIN tbl_categoria
                     ON tbl_categoria.id = tbl_alimento_categoria.id_categoria
                   WHERE tbl_alimento_categoria.id_alimento = ${idAlimento}`

      let result = await prisma.$queryRawUnsafe(sql)
      console.log(result);

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
    selectCatByIdAlimento
} 