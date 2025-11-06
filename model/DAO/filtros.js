/*******************************************************************************************
 * objetivo: criar a comunicação com o banco de dados, para filtrar os alimentos 
 * data: 06/11/25
 * autor: Eduarda Silva
 * versão: 1.0
 *******************************************************************************************/


// import da biblioteca do prisma client para executar os scripts SQL
const{PrismaClient } = require('@prisma/client')

// instancia (criar um objeto a ser utilizado) a bliblioteca do prisma/client
const prisma = new PrismaClient()

const selectAlimentoCat = async function(id_categoria){
    try{
        let sqlBase = `
                   SELECT * from vw_filtrar_categoria
                   `

        let params = []
        let where = []
           
         // Adiciona a condição de categoria se ela for verdadeira
        if (id_categoria) {
            // adiciona a continuação da sintase mySQL para categoria
            // ? é o valor que do id mandado que foi inserido na lista de params
            where.push(`tbl_categorias.id = ?`)
            params.push(Number(id_categoria))
        }
        
               
        if (where.length > 0) {
            sqlBase += ` WHERE ` + where
        }

        sqlBase += ` ORDER BY tbl_alimentos.id DESC`
      
        // ...params é o prisma o valor da lista para ? 
        let result = await prisma.$queryRaw(sqlBase, ...params)

    

        if(result){
            return result
        } else{
            return false
        }
        
    }catch(error){
        console.log(error)
        return false
    }
}


module.exports = {
    selectAlimentoCat
}