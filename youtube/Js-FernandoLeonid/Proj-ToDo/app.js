'use strict'

let banco = [
    {'tarefa': 'Estudar Js','status':''},
    {'tarefa': 'Netflix', 'status': 'checked'}
]

const carregarTarefas = (texto, status='') => {    
    const tarefa = document.createElement('label')
    tarefa.classList.add('todo-item')
    tarefa.innerHTML = `
        <input type="checkbox" ${status}>
        <div>${texto}</div>
        <input type="button" value="X">
    `
    document.getElementById('todo-list').appendChild(tarefa)
}

const limparBusca = () => {
    const listaDeTarefas = document.getElementById('todo-list')
    while(listaDeTarefas.firstChild){
        listaDeTarefas.removeChild(listaDeTarefas.lastChild)
    }

}

const atualizarTarefas = () => {
    limparBusca()
    banco.forEach(item => carregarTarefas(item.tarefa, item.status))
}

const criarTarefa = (evento) => {
    const key = evento.key
    const txt = evento.target.value
    if (key === 'Enter'){
        banco.push({'tarefa':txt, 'status': ''})
        atualizarTarefas();
        evento.target.value = ''
    }

}

document.getElementById('new-item').addEventListener('keypress', criarTarefa)
atualizarTarefas()