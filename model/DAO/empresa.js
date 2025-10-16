/************************************************************************************************
 * Objetivo: criar a comunicação com o banco de dados, para fazer o CRUD de empresas
 * Data: 18/09/25
 * Autor: Eduarda Silva
 * Versão: 1.1
 ************************************************************************************************/

// import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')

// instancia a biblioteca do prisma/client
const prisma = new PrismaClient()

// função para inserir uma nova empresa
const insertEmpresa = async function(empresa) {
    try {
        const result = await prisma.$executeRaw `CALL inserir_empresa(${empresa.nome}, ${empresa.email}, ${empresa.senha}, ${empresa.cnpj_mei}, ${empresa.telefone})`;


         // result === 1 -> para verificar se uma linha foi afetada (adicionada)
         if (result === 1) { 
            let lastIdResult = await prisma.$queryRawUnsafe(`SELECT LAST_INSERT_ID() AS id`)


            let idGerado = lastIdResult[0].id

            return {
                id: Number(idGerado), 
                nome: empresa.nome,
                email: empresa.email,
                senha: empresa.senha,
                cnpj_mei: empresa.cnpj_mei,
                telefone: empresa.telefone
            }
        } else {
            return false
        }


    } catch (error) {
        console.log(error)
        return false
    }
}

// Função para buscar empresa por ID (simplesmente para checar se existe)
const selectEmpresaById = async function(id) {
    try {
        const sql = `SELECT id FROM tbl_empresas WHERE id = ${id}`;
        
        const result = await prisma.$queryRawUnsafe(sql);
        
        if (result && result.length > 0) {
            return result[0]; // Retorna a empresa (ou apenas o ID)
        } else {
            return null; // Não encontrado
        }
    } catch (error) {
        console.error("Erro ao verificar empresa:", error);
        return false; // Erro técnico de servidor/banco
    }
}

// exportando funções
module.exports = {
    insertEmpresa,
    selectEmpresaById
}