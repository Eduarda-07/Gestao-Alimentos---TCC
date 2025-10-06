/************************************************************************************************
 * Objetivo: criar a comunicação com o banco de dados, para recuperar senha por email
 * Data: 02/10/25
 * Autor: Eduarda Silva
 * Versão: 1.1
 ************************************************************************************************/

// import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')

// instancia a biblioteca do prisma/client
const prisma = new PrismaClient()

// Função para atualizar o campo de código no banco e definir o tempo de expiração
const guardarCodigo = async function(email, codigo, tipo){
    try {

        // Calcula o tempo de expiração: Agora + 15 minutos (900 segundos)
        const tempo = new Date(Date.now() + 1000 * 60 * 15) // Expira em 15 minutos

        let tipoUsuario = ""
        
        if (String(tipo).toLocaleLowerCase() === 'pessoa'){
            tipoUsuario = 'tbl_usuarios'
        
        }else if (String(tipo).toLocaleLowerCase() === 'empresa') {
            tipoUsuario = 'tbl_empresas'
        }else if (String(tipo).toLocaleLowerCase() === 'ong') {
            tipoUsuario = 'tbl_ongs'
         }else {
            return false // Tipo inválido
        }
        console.log(tipo)

        const sql = `UPDATE ${tipoUsuario} SET codigo_recuperacao = '${codigo}',
                     codigo_expiracao = '${tempo.toISOString().slice(0, 19).replace('T', ' ')}'
                     WHERE email = '${email}'`
        
        const result = await prisma.$executeRawUnsafe(sql)

        return result
    } catch (error) {
        console.log("Erro ao salvar código!!!!!:", error);
        return false
    }
}

// Função para procurar o código e o tempo de expiração pelo email
const CodigoByEmail = async function(email, tipo){
    try {
        let tipoUsuario = ""

       if (String(tipo).toLocaleLowerCase() === 'pessoa'){
            tipoUsuario = 'tbl_usuarios'
        
        }else if (String(tipo).toLocaleLowerCase() === 'empresa') {
            tipoUsuario = 'tbl_empresas'
        }else if (String(tipo).toLocaleLowerCase() === 'ong') {
            tipoUsuario = 'tbl_ongs'
         }else {
            return false // Tipo inválido
        }

        const sql = `
            SELECT codigo_recuperacao, codigo_expiracao
            FROM ${tipoUsuario}
            WHERE email = '${email}'
        `;

        const result = await prisma.$queryRawUnsafe(sql);
        
        // Retorna o primeiro (e único) resultado se houver
        if (result && result.length > 0) {
            return result[0]
        } else {
            return false // Email não encontrado
        }

    } catch (error) {
        console.error("Erro ao buscar token:", error)
        return false
    }
}

// Função para limpar o token após o uso 
const deleteCodigo = async function (email, tipo) {
    try {

        let tipoUsuario = ""

       if (String(tipo).toLocaleLowerCase() === 'pessoa'){
            tipoUsuario = 'tbl_usuarios'
        
        }else if (String(tipo).toLocaleLowerCase() === 'empresa') {
            tipoUsuario = 'tbl_empresas'
        }else if (String(tipo).toLocaleLowerCase() === 'ong') {
            tipoUsuario = 'tbl_ongs'
         }else {
            return false // Tipo inválido
        }

        const sql = `
            UPDATE ${tipoUsuario}
            SET codigo_recuperacao = NULL,
                codigo_expiracao = NULL
            WHERE email = '${email}'
        `

        const result = await prisma.$executeRawUnsafe(sql)
        return result 

    } catch (error) {
        console.error("Erro ao deletar token:", error)
        return false
    }
}


module.exports = {
    guardarCodigo,
    CodigoByEmail,
    deleteCodigo 
}