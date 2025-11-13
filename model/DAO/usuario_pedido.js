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
      console.log(error);
      
      return false
  }
}

const insertOngPedido = async function(userPedido){
  try {

      const result = await prisma.$executeRaw `CALL inserir_pedido_ong(${userPedido.id_ong}, ${userPedido.id_alimento}, ${userPedido.quantidade})`

       if (result === 1) { 
            let lastIdResult = await prisma.$queryRawUnsafe(`SELECT LAST_INSERT_ID() AS id`)

            let idGerado = lastIdResult[0].id

            return {
                id: Number(idGerado), 
                usuario: userPedido.id_ong,
                alimento: userPedido.id_alimento,
                quantidade: userPedido.quantidade
            }
        } else
          return false
  } catch (error) {
      console.log(error);
      
      return false
  }
}



const deletePedidoById = async function(id_pedido){
  try {
    
    let result = await prisma.$executeRaw`CALL deletar_pedido_usuario(${id_pedido});`

    if (result)
      return true
    else 
      return false
  } catch (error) {
    return false
  }
}


const selectPedidoUser = async function(id_usuario, id_ong){
 try {
      let result = await prisma.$queryRaw`CALL filtrar_pedidos(${id_usuario}, ${id_ong} )`
      

    if (result && result.length > 0)
      
        return result
    else 
        return false
  } catch (error) {
    console.log(error);
      return false
  }
}

const selectPedidoById = async function (id_pedido) {

  try {
    
    let result = await prisma.$queryRaw`select * from tbl_user_pedidos WHERE id = ${id_pedido};`
      
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
    insertUserPedido,
    selectPedidoUser,
    deletePedidoById,
    selectPedidoById,
    insertOngPedido
} 