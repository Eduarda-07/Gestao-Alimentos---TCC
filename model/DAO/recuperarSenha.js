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

const updateSenha = async function (id, novaSenhaHash, tipo, email) {
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

    let where = ""

    let sql = `update ${tipoUsuario} set senha = '${novaSenhaHash}' where `

    if(id){
        where = `id = '${id}'`
        sql = sql+ where
    }else if(email){
        where = `email = '${email}'`
        sql = sql+ where
    }else{
        return false
    }


    try {
        let result = await prisma.$executeRawUnsafe(sql)
        return result   
    } catch (error) {
        return false
    }

}




module.exports = {
    updateSenha
}