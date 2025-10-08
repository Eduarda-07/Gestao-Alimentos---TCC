/*******************************************************************************************
 * objetivo: criar a comunicação com o banco de dados, para atualizar a senha de um usuário
 * data: 06/10/25
 * autor: Eduarda Silva
 * versão: 1.0
 *******************************************************************************************/


// import da biblioteca do prisma client para executar os scripts SQL
const{PrismaClient } = require('@prisma/client')

// instancia (criar um objeto a ser utilizado) a bliblioteca do prisma/client
const prisma = new PrismaClient()

const updateSenha = async function (id, senhaHash, tipo, email) {
    let tipoUsuario = ""

    if (String(tipo).toLocaleLowerCase() === "pessoa"){
        tipoUsuario = "tbl_usuarios"
    }else if (String(tipo).toLocaleLowerCase() === "ong"){
        tipoUsuario = "tbl_ongs"
    }else if (String(tipo).toLocaleLowerCase() === "empresa"){
        tipoUsuario = "tbl_empresas"
    }else{
        return false
    }

    let params = [senhaHash]
    let where = ""

    if (id) {
        whereCondition = `id = $2` 
        params.push(parseInt(id))
    } else if (email) {
        whereCondition = `email = $2`
        params.push(email) 
    } else {
        return false
    }
    let sql = `update ${tipoUsuario} set senha = $1 where ${where}`

    try {
        let result = await prisma.$executeRaw(sql, ...params)
        return result   
    } catch (error) {
        console.error("Erro no DAO updateSenha:", error)
        throw error
    
    }

}




module.exports = {
    updateSenha
}