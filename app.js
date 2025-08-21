/*********************************************************************************************************************************************************************************
 *Objetivo: Criar uma API para ser utilizada em testes de software 
 *Data: 21/08/2025
 *Autor: Thayla Amorim
 *Versão: 1.0
 *Observações: 
 *  Para criar a API precisa intalar:
 *      express             npm install express --save
 *      cors                npm install cors --save
 *      body-parser         npm install body-parser --save
 
 *  Para criar a conexão com o banco de dados precisa instalar:
 *      prisma              npm install prisma --save
 *      @prisma/client      npm install @prisma/client --save
 * 
 *  Após a instalação do prisma e @prisma/client devemos:
 *      npx prisma init     Para inicializar o prisma no projeto 
 * 
 *  Após esse comando você deverá configurar o .env e o schema.prisma, e rodar o comando:
 *      npx prisma migrate dev 
 * 
 *  Usar trycatch -> para sempre deixar a API no ar
***********************************************************************************************************************************************************************************/

// Import das bibliotecas para criar a API
const express    = require('express')
const cors       = require('cors')
const bodyParser = require('body-parser')

// Cria um objeto para o Body do tipo JSON 
const bodyParserJSON = bodyParser.json()

// Cria um objeto do app para criar a API 
const app = express()

// Configurações de permissões do CORS para a API 
app.use((request, response, next)=>{

    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())

    next()
})

/*********************************************************************************************************************************************************************************
* Dia 21/08/2025 -> Autor: Thayla
*Endpoints referentes a tabela de cliente: Inserir, Atualizar, Deletar, Listar tudo, Buscar pelo ID.
 **********************************************************************************************************************************************************************************/

// Import das Controller do projeto 
const controllerClientes = require('./controller/controllerClientes')

app.post('/v1/clientes-teste/cliente', cors(), bodyParserJSON, async function (request, response){

    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    //recebe do body da requisição os dados encaminhados
    let dadosBody = request.body
    let resultCliente = await controllerClientes.inserirCliente(dadosBody, contentType)

    response.status(resultCliente.status_code)
    response.json(resultCliente)
})

// Endpoint para listar todos os clientes 
app.get('/v1/clientes-teste/cliente', cors(), async function(request, response){

    let resultCliente = await controllerClientes.listarClientes()

    response.status(resultCliente.status_code)
    response.json(resultCliente)
})

// Endpoint para buscar cliente pelo ID
app.get('/v1/clientes-teste/cliente/:id', cors(), async function(request, response){

    let id = request.params.id 

    let resultCliente = await controllerClientes.buscarCliente(id)

    response.status(resultCliente.status_code)
    response.json(resultCliente)
})

// Endpoint deletar cliente 
app.delete('/v1/clientes-teste/cliente/:id', cors(), async function(request, response){

    let id = request.params.id

    let resultCliente = await controllerClientes.excluirCliente(id)

    response.status(resultCliente.status_code)
    response.json(resultCliente)
})


app.listen(8080, function(){
    console.log('API aguardando requisições ...')
})