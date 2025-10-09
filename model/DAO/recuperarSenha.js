/*******************************************************************************************
 * objetivo: criar a comunicação com o banco de dados, para atualizar a senha de um usuário
 * data: 06/10/25
 * autor: Eduarda Silva
 *******************************************************************************************/


const message = require('../../modulo/config')

const { PrismaClient, Prisma } = require('@prisma/client')
const prisma = new PrismaClient()

const updateSenha = async function (id, senhaHash, tipo, email) {
    let tabela = ""

    const tipoUsuario = String(tipo).toLowerCase()

    if (tipoUsuario === "pessoa") {
        tabela = "tbl_usuarios"
    } else if (tipo === "ong") {
        tabela = "tbl_ongs"
    } else if (tipoUsuario === "empresa") {
        tabela = "tbl_empresas"
    } else {
        
        return false
    }

    
    let clausulaWhere = Prisma.empty
    let valorWhere = null

    if (id) {
        valorWhere = parseInt(id)
        clausulaWhere = Prisma.sql`WHERE id = ${valorWhere}`
    } else if (email) {
        valorWhere = email
        clausulaWhere = Prisma.sql`WHERE email = ${valorWhere}`
    } else {
        // Se id e email não existirem, encerra
        return false
    }

    
    const sql = Prisma.sql`UPDATE ${Prisma.raw(tabela)} SET senha = ${senhaHash} ${clausulaWhere}`
    
    try {
       
        let result = await prisma.$executeRaw(sql)
        
        return result
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_MODEL
    }
}

module.exports = {
    updateSenha
}
