/*********************************************************************************************************************************************************************************
 *Objetivo: Criar o CRUD de dados da tabela de clientes no Banco de Dados, para testar software
 *Data: 21/08/2025
 *Autor: Thayla Amorim
 *Versão: 1.0
***********************************************************************************************************************************************************************************/

// Import da biblioteca do prisma client para realizar as ações no BD 
const {PrismaClient} = require('@prisma/client')

//Instancia da classe do Prisma Client (cria um objeto)
const prisma = new PrismaClient()

const insertCliente = async function(cliente){
    try{
        let sql = `insert into tbl_clientes(
                    nome, 
                    email, 
                    data_nascimento, 
                    telefone
                    )
                    values(
                        '${cliente.nome}',
                        '${cliente.email}',
                        '${cliente.data_nascimento}',
                        '${cliente.telefone}'
                    )`

         // await só funciona com o "async", serve para fazer uma pausa no terminal para aguardar a conexão com o banco de dados
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return result
        else
            return false
 
    }catch (error){
       console.log(error)
        return false
    }
}

// Função para retornar todos os clientes
const listClient = async function() {
    try {
        let sql = 'select * from tbl_clientes'

        let result= await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else 
            return false

    } catch (error) {
        console.log(error)
        return false
    }
}

// Função para retornar clientes buscando pelo ID
const selectByIdClient = async function(number) {
    try {
        let id = number

        let sql = `select * from tbl_clientes where id=${id}`

        let result= await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else 
            return false

    } catch (error) {
        return false
    }
}

// Função para deletar clientes
const deleteClient = async function(id){
    try {

        let sql = `delete from tbl_clientes where id=${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
        
    } catch (error) {
        return false
    }
}

module.exports = {
    insertCliente,
    listClient,
    selectByIdClient,
    deleteClient
}

