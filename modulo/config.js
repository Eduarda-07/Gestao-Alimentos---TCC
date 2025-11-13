/*************************************************************************************
 * Objetivo: arquivo de confiuração para padronizar mensagens e status code da API
 * Data: 16/09/25
 * Autor: Eduarda Silva
 * Versão: 1.0
 *************************************************************************************/



/*************************** STATUS CODE DE MENSAGEM DE ERRO **************************/

const ERROR_REQUIRED_FIELD = {status: false, status_code: 400, message: "Não foi possível realizar a requisição, pois existem campos obrigatórios que não foram preenchidos ou não atendem a quantidade de caracteres!!!"}

const ERROR_INTERNAL_SERVER_MODEL = {status: false, status_code: 500, message: "Devido a erros internos no servidor da model, não foi possível processar a requisição!!!"}

const ERROR_INTERNAL_SERVER_CONTROLLER = {status: false, status_code: 500, message: "Devido a erros internos no servidor da controller, não foi possível processar a requisição!!!"}

const ERROR_CONTENT_TYPE =  {status: false, status_code: 415, message:"Não foi possível processar a requisição, pois o tipo de dados encaminhado não é processado pelo servidor. Favor encaminhar dados apenas no formato JSON!!!"}

const ERROR_NOT_FOUND = { status: false, status_code: 404, message: "Não foram encontrados itens de retorno!!!"}

const ERROR_CODE_EXPIRED = { status: false, status_code: 401, message: "Código de verificação expirou. Solicite um novo!!!"}

const ERROR_INVALID_CODE = { status: false, status_code: 401, message: "Código de verificação inválido. Verifique seu e-mail e tente novamente!!!"}

const ERROR_SENDING_CODE = { status: false, status_code: 500, message: "Falha ao enviar o código!!!"}

const ERROR_EMAIL = { status: false, status_code: 500, message: "Falha ao enviar o código. Verifique se o e-mail está correto!!!"}


/*************************** STATUS CODE DE MENSAGEM DE SUCESSO ************************/
const SUCCESS_CREATED_ITEM = {status: true, status_code: 201, message: "Item criado com sucesso!!"}

const SUCCESS_DELETED_ITEM = {status: true, status_code: 200, message: "Item deletado com sucesso!!"}

const SUCCESS_UPDATED_ITEM = {status: true, status_code: 200, message: "Item atualizado com sucesso!!"}

const SUCCESS_CODE_VERIFIED = {status: true, status_code: 200, message: "Código verificado com sucesso!!"}

const SUCCESS_CODE_SENT = {status: true, status_code: 200, message: "Código de recuperação enviado com sucesso!!"}

const SUCCESS_LOGIN = {status: true, status_code: 200, message: "Logado com sucesso!!"}


module.exports = {
    ERROR_REQUIRED_FIELD,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    ERROR_CONTENT_TYPE,
    ERROR_NOT_FOUND,
    ERROR_CODE_EXPIRED,
    ERROR_INVALID_CODE,
    ERROR_SENDING_CODE,
    ERROR_EMAIL,
    SUCCESS_CREATED_ITEM,
    SUCCESS_DELETED_ITEM,
    SUCCESS_UPDATED_ITEM,
    SUCCESS_CODE_VERIFIED,
    SUCCESS_CODE_SENT,
    SUCCESS_LOGIN
}