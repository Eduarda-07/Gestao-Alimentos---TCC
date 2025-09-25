/******************************************************************************************************
 * objetivo: criar a comunicação com o banco de dados, para fazer o login de suarios, ongs e empresas
 * data: 19/09/25
 * autor: Eduarda Silva
 * versão: 1.0
 ******************************************************************************************************/


// import da biblioteca do prisma client para executar os scripts SQL
const{PrismaClient } = require('@prisma/client')

// instancia (criar um objeto a ser utilizado) a bliblioteca do prisma/client
const prisma = new PrismaClient()

const selectEmailLogin = async function (email, tipo) {
    try {
        if (tipo === "pessoa"){
            let sql = `SELECT * FROM tbl_usuarios WHERE email = '${email}'`
      
            let result = await prisma.$queryRawUnsafe(sql)

            if (result) {
                return result
            } else {
                return false
            }
            
        } else if (tipo === "empresa"){
            let sql = `SELECT * FROM tbl_empresas WHERE email = '${email}'`
      
            let result = await prisma.$queryRawUnsafe(sql)

            if (result) {
                return result
            } else {
                return false
            }
            
        } else if (tipo === "ong"){
            let sql = `SELECT * FROM tbl_ongs WHERE email = '${email}'`
      
            let result = await prisma.$queryRawUnsafe(sql)

            if (result) {
                return result
            } else {
                return false
            }
        }
        
    } catch (error) {
        console.log(error)
        return false;
    }
}


module.exports = {
    selectEmailLogin
}