/******************************************************************************************************
 * objetivo: controller responsável pela regra de negócio referente ao CROUD de alimentos
 * data: 16/10/25
 * autor: Eduarda Silva
 * versão: 1.0
 ******************************************************************************************************/

const message = require('../../modulo/config')

const alimentoDAO = require('../../model/DAO/alimento')
const alimentoCatDAO = require('../../model/DAO/alimento_categoria')
const empresaDAO = require ('../../model/DAO/empresa')


const controllerAlimentoCat  = require('./controllerAlimentoCat')

const controllerEmpresa  = require('../empresas/controllerEmpresa')

const inserirAlimento = async function (alimento, contentType){
    try {
        if (String(contentType).toLocaleLowerCase() == 'application/json') {
            if (
                alimento.nome             == "" || alimento.nome             == undefined || alimento.nome             == null || alimento.nome.length       > 150 ||
                alimento.quantidade       == "" || alimento.quantidade       == undefined || alimento.quantidade       == null || isNaN(alimento.quantidade) || Number(alimento.quantidade) <= 0 ||
                alimento.peso             == "" || alimento.peso             == undefined || alimento.peso             == null || alimento.nome.length       > 15 ||
                alimento.data_de_validade == "" || alimento.data_de_validade == undefined || alimento.data_de_validade == null ||
                alimento.descricao        == "" || alimento.descricao        == undefined || alimento.descricao        == null ||
                alimento.imagem           == "" || alimento.imagem           == undefined || alimento.imagem           == null ||
                alimento.id_empresa       == "" || alimento.id_empresa       == undefined || alimento.id_empresa       == null || isNaN(alimento.id_empresa) || Number(alimento.id_empresa) <= 0
            ) {
               
                return message.ERROR_REQUIRED_FIELD

            } else {
                    
                const idEmpresa = alimento.id_empresa;
                
                let empresaExiste = await empresaDAO.selectEmpresaById(idEmpresa);

                if (empresaExiste === false) {
                    return message.ERROR_INTERNAL_SERVER_MODEL
                }

                if (empresaExiste === null) {
                     
                    return message.ERROR_NOT_FOUND
                
                }

                const resultAlimento = await alimentoDAO.insertAlimento(alimento)

                if (resultAlimento) {
                    const resultadosCategorias = []
                    if (alimento.categorias && Array.isArray(alimento.categorias)) {

                        for(let categoria of alimento.categorias){
                            if (categoria.id && !isNaN(categoria.id)) {
                                let alimentoCat = {
                                    id_alimento : resultAlimento.id,
                                    id_categoria : categoria.id
                                }
                               const resultAlimentoCat =  await alimentoCatDAO.insertAlimentoCat(alimentoCat)

                               resultadosCategorias.push(resultAlimentoCat.categoria)
                            } 
                        }
                    } 

                    let dados = {
                        status: true,
                        status_code: message.SUCCESS_CREATED_ITEM.status_code,
                        message: message.SUCCESS_CREATED_ITEM.message,
                        alimento: resultAlimento,
                        categorias: resultadosCategorias
                    }
                    
                    return dados
                } else {
                    return message.ERROR_INTERNAL_SERVER_MODEL
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {

        console.log(error);

        return message.ERROR_INTERNAL_SERVER_CONTROLLER

    }
}

const listarAlimento = async function(){
    try {

        let arrayAlimentos = []
        
        let dadosAlimento = {}

        let resultAlimento = await alimentoDAO.selectAllAlimentos()

        if(resultAlimento != false || typeof(resultAlimento) == 'object'){
            if(resultAlimento.length > 0){

                //criando um JSON de retorno de dados para API
                dadosAlimento.status = true
                dadosAlimento.status_code = 200
                dadosAlimento.items = resultAlimento.length

                //Precisamos utilizar o for of, pois o foreach não consegue trabalhar com requisições async com await
                for(const itemAlimento of resultAlimento){
            
                    const idEmpresa = parseInt(itemAlimento.id_empresa);
    
                    // 1. Loga o ID que está sendo buscado
                    console.log("Buscando empresa para ID:", idEmpresa); 
                    
                    let dadosEmpresa = await controllerEmpresa.buscarEmpresa(idEmpresa);

                    // 2. Loga o retorno para ver por que não atende o IF
                    console.log("Retorno de dadosEmpresa:", dadosEmpresa);


                    if (dadosEmpresa && dadosEmpresa.empresa) {
                        itemAlimento.empresa = dadosEmpresa.empresa
                         //Remover o id do JSON
                        delete itemAlimento.id_empresa  
                    } else {
                        console.log(dadosEmpresa);
                        delete itemAlimento.id_empresa  
                        itemAlimento.empresa = null // Garante que a propriedade exista, mesmo vazia
                    }

                        
                    let dadosCategoria = await controllerAlimentoCat.buscarCatPorAlimento(itemAlimento.id)
                    console.log(dadosCategoria);
                    

                    // verificando se retorna array e se não é false
                   if (dadosCategoria && Array.isArray(dadosCategoria.categorias)) {
                        itemAlimento.categorias = dadosCategoria.categorias // <-- CORREÇÃO: Usar 'categorias'
                    } else {
                        itemAlimento.categorias = []
                    }

                    arrayAlimentos.push(itemAlimento)
 
                }
                dadosAlimento.alimentos = arrayAlimentos

                return dadosAlimento

            }else{
                return message.ERROR_NOT_FOUND //404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        console.log(error);
        
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

// função para tratar o retorno de um filme filtrando pelo ID do DAO
// const buscarFilme = async function(id){

// try {

//     if ( id === ""   ||   id === undefined || id === null  || isNaN(id)  || id <= 0 ) {
        
//         return message.ERROR_REQUIRED_FIELD //400

//     } else {

//         let arrayFilmes= []
//         let dadosFilme = {}

//         let resultFilme= await filmeDAO.selecByIdFilme(parseInt(id))

//         if(resultFilme != false || typeof(resultFilme) == 'object'){

//             if(resultFilme.length > 0){

//                 dadosFilme.status = true
//                 dadosFilme.status_code = 200
//                 for(const itemFilme of resultFilme){
//                     /* Monta o objeto da classificação para retornar no Filme */
//                         //Busca os dados da classificação na controller de classificacao
//                         let dadosClassificacao = await controllerClassificacao.buscarClassificacao(itemFilme.id_classificacao)
//                         //Adiciona um atributo classificação no JSON de filmes e coloca os dados da classificação
//                         itemFilme.classificacao = dadosClassificacao.classificacao
//                         //Remover o id do JSON
//                         delete itemFilme.id_classificacao
                    

//                         let dadosIdioma = await controllerIdioma.buscarIdioma(itemFilme.id_idioma)
//                         itemFilme.idioma = dadosIdioma.idioma
//                         delete itemFilme.id_idioma

//                         let dadosNacionalidade = await controllerNacionalidade.buscarNacionalidade(itemFilme.id_nacionalidade)
//                         itemFilme.nacionalidade = dadosNacionalidade.nacionalidade
//                         delete itemFilme.id_nacionalidade

//                             // fazendo interação com a tbl_filme_genero
//                         let dadosGenero = await controllerFilmeGenero.buscarGeneroPorFilme(itemFilme.id)
//                         // verificando se retorna array e se não é false
//                         if (dadosGenero && Array.isArray(dadosGenero.genero)) {
//                         itemFilme.genero = dadosGenero.genero
//                         } else {
//                         //se for false retorna um array vazio 
//                         itemFilme.genero = []
//                         }


//                     //Adiciona em um novo array o JSON de filmes com a sua nova estrutura de dados
//                     arrayFilmes.push(itemFilme)
 
//                 }
//                 dadosFilme.films = arrayFilmes

//                 return dadosFilme
//             }else{
//                 return message.ERROR_NOT_FOUND //404
//             }
      
//         }else{
//             return message.ERROR_INTERNAL_SERVER_MODEL //500
//         }
//     }
// } catch (error) {
//     console.log(error)
//     return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
// }
// }

module.exports = {
    inserirAlimento,
    listarAlimento
}

