'use strick'

const openModal = () => document.getElementById('modal').classList.add('active')
const closeModal = () => document.getElementById('modal').classList.remove('active')

const tempClient = {
    nome: 'ai',
    email: 'arthur@arthur.com',
    celular: '1121955440000',
    cidade: 'Sapucaia'
}

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? [] // retorna vazio
const setLocalStorage = (dbClient) => localStorage.setItem('db_client', JSON.stringify(dbClient))

// CRUD

const createCliente = (client) => {
    const dbClient = getLocalStorage()
    dbClient.push(client)
    setLocalStorage(dbClient)
}

const readCliente = () => getLocalStorage()

const updateClient = (index, client) => {
    const dbClient = readCliente()
    dbClient[index] = client
    setLocalStorage(dbClient)
}

const deleteClient = (index) => {
    const dbClient = readCliente()
    dbClient.splice(index, 1)
    setLocalStorage(dbClient)
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = '');
}

const createRow = (client) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
    <td>${client.nome}</td>
    <td>${client.email}</td>
    <td>${client.celular}</td>
    <td>${client.cidade}</td>
    <td>
    <button type="button" class="btn green" data-action="edit">Editar</>
    <button type="button" class="btn red" data-action="delete">Excluir</>
    </td>
    `
    document.querySelector('#tb-clientes>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tb-clientes>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

// Interação com o layout
const saveClient = () => {
    if (isValidFields()) {
        const client = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,
            cidade: document.getElementById('cidade').value,
        }
        createCliente(client)
        clearFields()
        closeModal()
        readData()
    }
}

const readData = () => {
    const dbClient = readCliente()
    clearTable()
    dbClient.forEach(createRow)    
}
readData()

const editDelete = (event) =>{
    if (event.target.type === 'button'){
        console.log(event.target.dataset.action)        
        if (event.target.dataset.action === 'edit'){
            console.log('Editar')
        }else{
            console.log('excluir')
        }
    }
}

// Eventos
document.getElementById('cadastrar-cliente').addEventListener('click', openModal)
document.getElementById('modal-close').addEventListener('click', closeModal)
document.getElementById('salvar').addEventListener('click', saveClient)
document.querySelector('#tb-clientes>tbody').addEventListener('click', editDelete)