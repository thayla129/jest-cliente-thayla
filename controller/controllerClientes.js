/*********************************************************************************************************************************************************************************
 *Objetivo: Controller referente as ações de CRUD de Cliente, responsável pela integração entre app e model
            Validações, tratamento de dados etc...
            Utilizada para testes de software
 *Data: 21/08/2025
 *Autor: Thayla Amorim 
 *Versão: 1.0
***********************************************************************************************************************************************************************************/

//import do arquivo de menssagens e status code 
const message = require ('../modulo/config.js')

//import DAO clientes
const clienteDAO = require('../model/DAO/clientes.js')

const inserirCliente = async function(cliente, contentType){
    try{
        //contentType é quem chega o body, especificando que deve ser json
        if(String(contentType).toLowerCase() == 'application/json'){
            if( 
                cliente.nome   == '' || cliente.nome   == undefined || cliente.nome   == null || cliente.nome.length  > 100  ||
                cliente.email  == '' || cliente.email  == undefined || cliente.email  == null || cliente.email.length > 200  ||
                cliente.data_nascimento  == '' || cliente.data_nascimento   == undefined || cliente.data_nascimento  == null || 
                cliente.telefone  == '' || cliente.telefone   == undefined || cliente.telefone  == null || cliente.telefone.length > 20
            )
       
           {
               return message.ERROR_REQUIRED_FIELDS//400
           }else{
               let resultCliente = await clienteDAO.insertCliente(cliente)
       
               if(resultCliente){
                   return message.SUCESS_CREATED_ITEM //201
               }else{
                   return message.ERROR_INTERNAL_SERVER_MODEL //500
               }  
           }   
        }else{
            return message.ERROR_CONTENT_TYPE //415
        }
    }catch(error){
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }       
}

// Função listar todos os Clientes
const listarClientes = async function() {
    try {
        
        let dadosCliente = {}

        let resultCliente = await clienteDAO.listClient()

        if(resultCliente != false || typeof(resultCliente) == 'object'){
            if(resultCliente.lenght > 0){

                dadosCliente.status = true
                dadosCliente.status_code = 200
                dadosCliente.qnt_clientes = resultCliente.lenght
                dadosCliente.clientes = resultCliente

                return dadosCliente
            }else{
                return message.ERROR_NOT_FOUND//404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL //500 na model
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500 na controller
    }
}

// Função retornar cliente por ID
const buscarCliente = async function(numero) {
    try {
        let id = numero 

        let dadosCliente = {}

        if (id == '' || id == null || id == undefined || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            
            // Chama função para retornar os clientes
            let resultCliente = await clienteDAO.selectByIdClient(id)

            if(resultCliente != false || typeof(resultCliente) == 'object'){
                if(resultCliente.lenght > 0){
                    dadosCliente.status = true
                    dadosCliente.status_code = 200
                    dadosCliente.cliente = resultCliente

                    return dadosCliente
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500 na model
            }


        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para Excluir um cliente
const excluirCliente = async function(id){
    try {
        
        if(id == '' || id == null || id == undefined || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS
        }else{

            //Verificando se existe o id que o usuário quer excluir
            let resultCliente = await clienteDAO.selectByIdClient(id)

            if(resultCliente != false || typeof(resultCliente) == 'object'){
                if(resultCliente.length > 0){
                    let result = await clienteDAO.deleteClientes(id)
                
                    if(result)
                        return message.SUCESS_DELETE_ITEM //200
                    else
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }          
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500  
    }
}

module.exports = {
    inserirCliente,
    listarClientes,
    buscarCliente,
    excluirCliente
}