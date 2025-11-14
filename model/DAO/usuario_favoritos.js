/*******************************************************************************************************
 * Objetivo:  criar a comunicação com o banco de dados, para fazer o CROUD de favoritosUsuario
 * Data: 13/11/2025
 * Autor: Eduara
 * Versão: 1.0
 ******************************************************************************************************/
//import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')

//Instancia (criar um objeto a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

const insertUserFav = async function(userFav){
  try {

      const result = await prisma.$executeRaw `CALL inserir__user_favorito(${userFav.id_usuario}, ${userFav.id_empresa}`

       if (result === 1) { 
            let lastIdResult = await prisma.$queryRawUnsafe(`SELECT LAST_INSERT_ID() AS id`)

            let idGerado = lastIdResult[0].id

            return {
                id: Number(idGerado), 
                usuario: userFav.id_usuario,
                empresa: userFav.id_empresa
            }
        } else
          return false
  } catch (error) {
      console.log(error);
      
      return false
  }
}

const insertOngFav = async function(userFav){
  try {

      const result = await prisma.$executeRaw `CALL inserir_ong_favorito(${userFav.id_ong}, ${userFav.id_empresa})`

       if (result === 1) { 
            let lastIdResult = await prisma.$queryRawUnsafe(`SELECT LAST_INSERT_ID() AS id`)

            let idGerado = lastIdResult[0].id

            return {
                id: Number(idGerado), 
                usuario: userFav.id_ong,
                empresa: userFav.id_empresa
            }
        } else
          return false
  } catch (error) {
      console.log(error);
      
      return false
  }
}

const deleteFavoritoById = async function(id_favorito){
  try {
    
    let result = await prisma.$executeRaw`CALL deletar_favorito(${id_favorito});`

    if (result)
      return true
    else 
      return false
  } catch (error) {
    return false
  }
}

const selectFavoritoUser = async function(id_usuario, id_ong){
 try {
      let result = await prisma.$queryRaw`CALL filtrar_favoritos(${id_usuario}, ${id_ong} )`
      

    if (result && result.length > 0)
      
        return result
    else 
        return false
  } catch (error) {
    console.log(error);
      return false
  }
}

const selectFavoritoById = async function (id_favorito) {

  try {
    
    let result = await prisma.$queryRaw`select * from tbl_favoritos WHERE id = ${id_favorito};`
      
    if (result && result.length > 0)
      
        return result
    else 
        return false
  } catch (error) {
    console.log(error);
    
      return false
  }
  
}


module.exports = {
    insertUserFav,
    insertOngFav, 
    selectFavoritoById,
    deleteFavoritoById,
    selectFavoritoUser
} 