/*******************************************************************************************
 * objetivo: criar a comunicação com o banco de dados, para fazer o CROUD de alimentos
 * data: 17/10/25
 * autor: Eduarda Silva
 * versão: 1.0
 *******************************************************************************************/


// import da biblioteca do prisma client para executar os scripts SQL
const{PrismaClient} = require('@prisma/client')

// instancia (criar um objeto a ser utilizado) a bliblioteca do prisma/client
const prisma = new PrismaClient()

// função para inserir um novo filme
const insertAlimento = async function(alimento){
    try{
        let sql = `
                insert into tbl_alimentos(
                    nome,
                    quantidade,
                    peso,
                    id_tipo_peso,
                    data_de_validade,
                    descricao,
                    imagem,
                    id_empresa
                )
                values(
                    '${alimento.nome}',
                    '${alimento.quantidade}',
                    '${alimento.peso}',
                    '${alimento.id_tipo_peso}',
                    '${alimento.data_de_validade}',
                    '${alimento.descricao}',
                    '${alimento.imagem}',
                    ${alimento.id_empresa}
                )`

        let result = await prisma.$executeRawUnsafe(sql)

       if (result === 1) { 
            let lastIdResult = await prisma.$queryRawUnsafe(`SELECT LAST_INSERT_ID() AS id`)

            let idGerado = lastIdResult[0].id

            return {
                id: Number(idGerado), 
                nome: alimento.nome,
                peso: alimento.peso,
                tipoPeso: alimento.id_tipo_peso,
                quantidade: alimento.quantidade,
                data_validade: alimento.data_de_validade,
                descricao: alimento.descricao,
                imagem: alimento.imagem,
                id_empresa:alimento.id_empresa
            }
        } else
          return false
 
    }catch (error){
       console.log(error);
        return false
    }
}

// // função para atualizar um filme existente
// const updateFilme = async function(filme){

//     try {
        
//         let sql = `update tbl_filme set nome                = '${filme.nome}', 
//                                         duracao             = '${filme.duracao}', 
//                                         sinopse             = '${filme.sinopse}', 
//                                         data_lancamento     = '${filme.data_lancamento}', 
//                                         foto_capa           = '${filme.foto_capa}', 
//                                         link_trailer        = '${filme.link_trailer}',
//                                         id_classificacao    = ${filme.id_classificacao},
//                                         id_idioma           = ${filme.id_idioma},
//                                         id_nacionalidade    = ${filme.id_nacionalidade}
//                                     where id = ${filme.id}
//                                     `
                            
//         let resultFilme = await prisma.$executeRawUnsafe(sql)

//         if(resultFilme){
//             return true
//         }else{
//             return false
//         }

//     } catch (error) {
//         console.log(error);
        
//         return false
//     }

// }

// // função para deletar um filme existente
// const deleteFilme = async function(id){
//     try {
//         let sql = `delete from tbl_filme where id = ${id}`

//         let result =  await prisma.$executeRawUnsafe(sql)

//         if (result) {
//             return true
//         } else {
//             return false
//         }
//     } catch (error) {
//         return false
//     }
// }


const selectAllAlimentos = async function(){
    try{

        //scriptSQL para retornar todos os dados
        let sql = 'select * from tbl_alimentos'

        //executa o scriptSQL no banco de dados e aguarda o retorno dos dados 
        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false

    }catch(error){
        // console.log(error);
        return false
    }
}

// função para buscar um filme pelo id
const selecByIdAlimento = async function(id){
    
    try {
        let sql = `select * from tbl_alimento where id = ${id}`

        let result =  await prisma.$queryRawUnsafe(sql)

        if (result) {
            return result
        } else {
            return false
        }
    } catch (error) {
        return false
    }

}

module.exports = {
    insertAlimento,
    // updateFilme,
    // deleteFilme,
    selectAllAlimentos,
    selecByIdAlimento
}



