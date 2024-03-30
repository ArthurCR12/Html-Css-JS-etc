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

const createRow = (client, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
    <td>${client.nome}</td>
    <td>${client.email}</td>
    <td>${client.celular}</td>
    <td>${client.cidade}</td>
    <td>
    <button type="button" class="btn green" id="edit-${index}">Editar</>
    <button type="button" class="btn red" id="delete-${index}">Excluir</>
    </td>
    `
    document.querySelector('#tb-clientes>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tb-clientes>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const fillFields = (client) => {
    document.getElementById('nome').value = client.nome
    document.getElementById('email').value = client.email
    document.getElementById('celular').value = client.celular
    document.getElementById('cidade').value = client.cidade
    document.getElementById('nome').dataset.index = client.index
}

const editClient = (index) => {
    const client = readCliente()[index]
    client.index = index
    fillFields(client)
    openModal()
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
        const index = document.getElementById('nome').dataset.index
        if (index == 'new') {
            createCliente(client)
            clearFields()
            closeModal()
            readData()
        }
        else {
            updateClient(index, client)
            readData()
            closeModal()
        }
        console.log(index, client)

    }
}

const readData = () => {
    const dbClient = readCliente()
    clearTable()
    dbClient.forEach(createRow)
}
readData()

const editDelete = (event) => {
    if (event.target.type === 'button') {
        const [action, index] = event.target.id.split('-')
        if (action == 'edit') {
            editClient(index)
        }
        else if (action == 'delete') {
            const client = readCliente()[index]
            const response = confirm(`Deseja realmente excluir o cliente ${client.nome}`)
            if (response) {
                deleteClient(index)
                readData()
            }

        }

    }
}

// Eventos
document.getElementById('cadastrar-cliente').addEventListener('click', openModal)
document.getElementById('modal-close').addEventListener('click', closeModal)
document.getElementById('salvar').addEventListener('click', saveClient)
document.querySelector('#tb-clientes>tbody').addEventListener('click', editDelete)