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

////////////////////////////////////////////////////USUÁRIOS/////////////////////////////////////////////////////////////////////

app.post('/v1/controle-alimentos/usuario', cors(), bodyParserJSON, async function (request, response){
     //recebe o content type da requisição
     let contentType = request.headers['content-type']

     //recebe do body da requisição os dados encaminhados
     let dadosBody = request.body
     let resultUsuario = await controllerUsuarios.inserirUsuario(dadosBody, contentType)
 
     response.status(resultUsuario.status_code)
     response.json(resultUsuario)
})

////////////////////////////////////////////////////ONGS//////////////////////////////////////////////////////////////////

app.post('/v1/controle-alimentos/ong', cors(), bodyParserJSON, async function (request, response){
    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    //recebe do body da requisição os dados encaminhados
    let dadosBody = request.body
    let resultOng = await controllerOngs.inserirOng(dadosBody, contentType)

    response.status(resultOng.status_code)
    response.json(resultOng)
})

app.listen('8080', function(){
    console.log('API funcionando e aguardadndo requisições')
})