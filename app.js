/***********************************************************************************************
 * Objetivo: criar uma API para realizar o CROUD do sistema de doação de alimentos - TCC
 * Data: 16/09/25
 * Autor: Eduarda Silva
 * Versão: 1.0
 * Observação: 
 * 1) para criar a API precisamos instalar -> expres, cors e body-parser
 *      express: npm install express --save
 *      cors: npm install cors --save
 *      body-parser: npm install body-parser --save
 * 2) para criar interação com o banco de dados precisamos instalar -> prisma e prisma/client
 *       prisma -> npm install prisma --save (gerencia conexão com o banco)
 *       prisma/client -> npm install @prisma/client --save (para rodar scripts SQL)
 * 
 * Após a instalação do prisma e do prisma client, devemos:
 * 1) npx prisma init
 * 
 * Você deverá configurar o arquivo .env e schema.prisma com as credenciais do BD
 * 
 * Após essa configuração deverá rodar o seguinte comando:
 *  1) npx prisma migrate dev (tomar cuidado: acontece um reset no banco)
 *  2) npx prisma generate
 * 
 * Para criptografar as senhas e palavras chaves deve-se instalar o bcrypt:
 *      npm install bcrypt (o import dessa biblioteca deve ser feito na controler de usuários)
 * 
 * Para gerar os códigos e enviar email:
 *      npm install nodemailer
 ***********************************************************************************************/


// require('dotenv').config();

// import das bibliotecas para criar api
const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')

//manipular o body da requisição para chegar apenas JSON
const bodyParserJSON = bodyParser.json()

// cria o objeto app com referências do express para criar api
const app = express()

// configurações de acesso do CORS para API
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())

    next()
})

// ligação com as pastas da controller
const controllerUsuarios = require('./controller/usuarios/controllerUsuario')
const controllerOngs = require('./controller/ongs/controllerOngs')
const controllerEmpresa = require('./controller/empresas/controllerEmpresa')
const controllerLogin = require('./controller/login/login')
const controllerCodigo = require('./controller/codigo/controllerCodigo')
const controllerSenha = require('./controller/senha/atualizarSenha')
const controllerCategoria = require('./controller/categoria/controllerCategoria')
const controllerAlimentos = require('./controller/alimentos/controllerAlimentos')
const controllerTipoPeso = require('./controller/tipo de peso/controllerTipoPeso')
const controllerFiltros = require('./controller/filtros/controllerFiltros')

////////////////////////////////////////////////////USUÁRIOS/////////////////////////////////////////////////////////////////////

app.post('/v1/mesa-plus/usuario', cors(), bodyParserJSON, async function (request, response){
     //recebe o content type da requisição
     let contentType = request.headers['content-type']

     //recebe do body da requisição os dados encaminhados
     let dadosBody = request.body
     let resultUsuario = await controllerUsuarios.inserirUsuario(dadosBody, contentType)
 
     response.status(resultUsuario.status_code)
     response.json(resultUsuario)
})

app.get('/v1/mesa-plus/usuario/:id', cors(), bodyParserJSON, async function (request, response) {
    
    //recebe o content type da requisição
    let contentType = request.headers['content-type']

     let id = request.params.id

    //recebe do body da requisição os dados encaminhados
    let dadosBody = request.body

    let resultUsuario =  await controllerUsuarios.buscarUsuario(id, dadosBody, contentType)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})

////////////////////////////////////////////////////EMPRESAS//////////////////////////////////////////////////////////////////

app.post('/v1/mesa-plus/empresa', cors(), bodyParserJSON, async function (request, response){
    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    //recebe do body da requisição os dados encaminhados
    let dadosBody = request.body
    let resultEmpresa = await controllerEmpresa.inserirEmpresa(dadosBody, contentType)

    response.status(resultEmpresa.status_code)
    response.json(resultEmpresa)
})

app.get('/v1/mesa-plus/empresa', cors(), bodyParserJSON, async function (request, response) {
    
    let resultEmpresa =  await controllerEmpresa.listarEmpresas()

    response.status(resultEmpresa.status_code)
    response.json(resultEmpresa)
})

app.get('/v1/mesa-plus/empresa/:id', cors(), bodyParserJSON, async function (request, response) {
    
    //recebe o content type da requisição
    let contentType = request.headers['content-type']

     let id = request.params.id

    //recebe do body da requisição os dados encaminhados
    let dadosBody = request.body

    let resultEmpresa =  await controllerEmpresa.buscarEmpresa(id, dadosBody, contentType)

    response.status(resultEmpresa.status_code)
    response.json(resultEmpresa)
})

///////////////////////////////////////////////////////ONGS///////////////////////////////////////////////////////////////////

app.post('/v1/mesa-plus/ong', cors(), bodyParserJSON, async function (request, response){
    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    //recebe do body da requisição os dados encaminhados
    let dadosBody = request.body
    let resultOng = await controllerOngs.inserirOng(dadosBody, contentType)

    response.status(resultOng.status_code)
    response.json(resultOng)
})

app.get('/v1/mesa-plus/ong/:id', cors(), bodyParserJSON, async function (request, response) {
    
    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    let id = request.params.id

    //recebe do body da requisição os dados encaminhados
    let dadosBody = request.body

    let resultOng =  await controllerOngs.buscarOng(id, dadosBody, contentType)

    response.status(resultOng.status_code)
    response.json(resultOng)
})


app.put('/v1/mesa-plus/ong/:id', cors(), bodyParserJSON, async function (request, response){
    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    let id = request.params.id

    //recebe do body da requisição os dados encaminhados
    let dadosBody = request.body
    let result = await controllerOngs.atualizarOng(id, dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)
})

///////////////////////////////////////////////////////LOGIN///////////////////////////////////////////////////////////////////

app.post('/v1/mesa-plus/login', cors(), bodyParserJSON, async function (request, response){
    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    //recebe do body da requisição os dados encaminhados
    let dadosBody = request.body
    let result = await controllerLogin.loginUsuario(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)
})

//////////////////////////////////////////////// ENVIAR CÓDIGO//////////////////////////////////////////
app.post('/v1/mesa-plus/enviar-codigo', cors(), bodyParserJSON, async function (request, response){
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    
    
    let result = await controllerCodigo.enviarCodigo(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)
})

///////////////////////////////////////////VERIFICAR CÓDIGO/////////////////////////////////////////////

app.post('/v1/mesa-plus/codigo-recuperacao', cors(), bodyParserJSON, async function (request, response){
    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    //recebe do body da requisição os dados encaminhados
    let dadosBody = request.body
    let result = await controllerCodigo.consultarCodigo(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)
})


///////////////////////////////////////////////////////APAGAR CÓDIGO///////////////////////////////////////////////////////////////////

app.put('/v1/mesa-plus/apagar-codigo', cors(), bodyParserJSON, async function (request, response){
    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    //recebe do body da requisição os dados encaminhados
    let dadosBody = request.body
    let result = await controllerCodigo.apagarCodigo(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)
})

///////////////////////////////////////////////////////NOVA SENHA///////////////////////////////////////////////////////////////////

app.put('/v1/mesa-plus/nova-senha', cors(), bodyParserJSON, async function (request, response){
    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    //recebe do body da requisição os dados encaminhados
    let dadosBody = request.body
    let result = await controllerSenha.atualizarSenha(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)
    console.log(dadosBody);
    
})

//////////////////////////////////////////////////CATEGORIA//////////////////////////////////////////////////////////////

app.post('/v1/mesa-plus/categoria', cors(), bodyParserJSON, async function (request, response){
    
    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    //recebe do body da requisição os dados encaminhados
    let dadosBody = request.body
    let result = await controllerCategoria.inserirCategoria(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)

})


app.put('/v1/mesa-plus/categoria/:id', cors(), bodyParserJSON, async function (request, response){
    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    //recebe o id da categoria pela url - params
    let id = request.params.id
    //recebe do body da requisição os dados encaminhados
    let dadosBody = request.body
    let result = await controllerCategoria.atualizarCategoria(id, dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)

})

app.get('/v1/mesa-plus/categoria', cors(), bodyParserJSON, async function (request, response){
    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    //recebe do body da requisição os dados encaminhados
    let dadosBody = request.body
    let result = await controllerCategoria.listarCategoria(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)

})

app.get('/v1/mesa-plus/categoria/:id', cors(), bodyParserJSON, async function (request, response){
    //recebe o content type da requisição
    let contentType = request.headers['content-type']

     //recebe o id da categoria pela url - params
     let id = request.params.id

    //recebe do body da requisição os dados encaminhados
    let dadosBody = request.body
    let result = await controllerCategoria.buscarCategoria(id,dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)

})

app.delete('/v1/mesa-plus/categoria/:id', cors(), bodyParserJSON, async function (request, response){
    //recebe o content type da requisição
    let contentType = request.headers['content-type']

     //recebe o id da categoria pela url - params
     let id = request.params.id

    //recebe do body da requisição os dados encaminhados
    let dadosBody = request.body
    let result = await controllerCategoria.excluirCategoria(id,dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)

})

////////////////////////////////////////////////////ALIMENTOS/////////////////////////////////////////////////////////////////////

app.post('/v1/mesa-plus/alimentos', cors(), bodyParserJSON, async function (request, response){
     //recebe o content type da requisição
     let contentType = request.headers['content-type']

     //recebe do body da requisição os dados encaminhados
     let dadosBody = request.body
     let resultAlimentos = await controllerAlimentos.inserirAlimento(dadosBody, contentType)
 
     response.status(resultAlimentos.status_code)
     response.json(resultAlimentos)
})


app.get('/v1/mesa-plus/alimentos', cors(), bodyParserJSON, async function (request, response){

    let resultAlimentos = await controllerAlimentos.listarAlimento()

    response.status(resultAlimentos.status_code)
    response.json(resultAlimentos)
})

//////////////////////////////////////////////////TIPO PESO//////////////////////////////////////////////////////////////

app.post('/v1/mesa-plus/tipoPeso', cors(), bodyParserJSON, async function (request, response){
    
    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    //recebe do body da requisição os dados encaminhados
    let dadosBody = request.body
    let result = await controllerTipoPeso.inserirTipoPeso(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)

})


app.put('/v1/mesa-plus/tipoPeso/:id', cors(), bodyParserJSON, async function (request, response){
    
    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    
    let id = request.params.id
  
    let dadosBody = request.body
    let result = await controllerTipoPeso.atualizarTipoPeso(id, dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)

})

app.get('/v1/mesa-plus/tipoPeso', cors(), bodyParserJSON, async function (request, response){
   
    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    let result = await controllerTipoPeso.listarTipoPeso()

    response.status(result.status_code)
    response.json(result)

})

app.get('/v1/mesa-plus/tipoPeso/:id', cors(), bodyParserJSON, async function (request, response){
    //recebe o content type da requisição
    let contentType = request.headers['content-type']

     let id = request.params.id

    //recebe do body da requisição os dados encaminhados
    let dadosBody = request.body
    let result = await controllerTipoPeso.buscarTipoPeso(id,dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)

})

app.delete('/v1/mesa-plus/tipoPeso/:id', cors(), bodyParserJSON, async function (request, response){
    //recebe o content type da requisição
    let contentType = request.headers['content-type']

     let id = request.params.id

    //recebe do body da requisição os dados encaminhados
    let dadosBody = request.body
    let result = await controllerTipoPeso.excluirTipoPeso(id,dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)

})

//////////////////////////////////////////////////FILTROS//////////////////////////////////////////////////////////////

app.get('/v1/mesa-plus/filtroCat/:id', cors(), bodyParserJSON, async function (request, response){
   
    //recebe o content type da requisição
    let contentType = request.headers['content-type']

     let id = request.params.id

    //recebe do body da requisição os dados encaminhados
    let dadosBody = request.body
    let result = await controllerFiltros.buscarAlimentoCat(id,dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)

})

app.get('/v1/mesa-plus/empresaAlimento/:id', cors(), bodyParserJSON, async function (request, response){
   
    //recebe o content type da requisição
    let contentType = request.headers['content-type']

     let id = request.params.id

    //recebe do body da requisição os dados encaminhados
    let dadosBody = request.body
    let result = await controllerFiltros.buscarEmpresaAlimentos(id,dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)

})
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.listen('8080', function(){
    console.log('API funcionando e aguardadndo requisições... Porta: 8080')
})