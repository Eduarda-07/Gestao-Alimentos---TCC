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

        let result = await prisma.$queryRaw` CALL filtrar_alimentos_categoria(${id_categoria});`


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