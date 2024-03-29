'use strict'

let banco2 = [
    { 'tarefa': 'Estudar Js', 'status': '' },
    { 'tarefa': 'Netflix', 'status': 'checked' }
]

const getBanco = () => JSON.parse(localStorage.getItem('todo-list')) ?? []
const banco = getBanco()

const setBanco = (banco) => localStorage.setItem('todo-list', JSON.stringify(banco))

const carregarTarefas = (texto, status = '', indice) => {
    const tarefa = document.createElement('label')
    tarefa.classList.add('todo-item')
    tarefa.innerHTML = `
        <input type="checkbox" ${status} data-indice=${indice}>
        <div>${texto}</div>
        <input type="button" value="X" data-indice=${indice}>
    `
    document.getElementById('todo-list').appendChild(tarefa)
}

const limparBusca = () => {
    const listaDeTarefas = document.getElementById('todo-list')
    while (listaDeTarefas.firstChild) {
        listaDeTarefas.removeChild(listaDeTarefas.lastChild)
    }

}

const buscarTarefas = () => {
    limparBusca()
    banco.forEach((item, indice) => carregarTarefas(item.tarefa, item.status, indice))
}

const criarTarefa = (evento) => {
    const key = evento.key
    const txt = evento.target.value
    if (key === 'Enter') {
        banco.push({ 'tarefa': txt, 'status': '' })
        setBanco(banco)
        buscarTarefas();
        evento.target.value = ''
    }

}

const removerTarefa = (indice) => {
    banco.splice(indice, 1)
    setBanco(banco)
    buscarTarefas()
}

const atualizarTarefa = (indice) => {
    banco[indice].status = banco[indice].status === '' ? 'checked' : ''
    setBanco(banco)
    buscarTarefas()

}

const clickItem = (evento) => {
    const elemento = evento.target
    if (elemento.type === 'button') {
        const indice = elemento.dataset.indice
        removerTarefa(indice)
    } else if (elemento.type === 'checkbox') {
        const indice = elemento.dataset.indice
        atualizarTarefa(indice)
    }

}

document.getElementById('new-item').addEventListener('keypress', criarTarefa)
document.getElementById('todo-list').addEventListener('click', clickItem)
buscarTarefas()