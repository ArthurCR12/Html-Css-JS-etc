'use strict'

const formartarDigito = (numero) => `0${numero}`.slice(-2)

const atualizar = (tempo) => {
    const dias = document.getElementById('dias')
    const horas = document.getElementById('horas')
    const minutos = document.getElementById('minutos')
    const segundos = document.getElementById('segundos')

    const qtdSegundos = tempo % 60
    const qtdMinutos = Math.floor((tempo % (60 * 60) / 60))
    const qtdHoras = Math.floor((tempo % (60 * 60 * 24)) / (60 * 60))
    const qtdDias = Math.floor((tempo / (60 * 60 * 24)))

    segundos.textContent = formartarDigito(qtdSegundos)
    minutos.textContent = formartarDigito(qtdMinutos)
    horas.textContent = formartarDigito(qtdHoras)
    dias.textContent = formartarDigito(qtdDias)
}

const contagemRegressiva = (tempo) => {
    const pararContagem = () => clearInterval(id)
    const contar = () => {
        atualizar(tempo)
        if (tempo == 0) pararContagem()
        tempo--
    }
    const id = setInterval(contar, 1000)


}

const tempoRestante = (data) => {
    const dataEvento =  new Date(data);
    const hoje = new Date();
    const segundos = Math.floor((dataEvento - hoje) / 1000)    
    return segundos >= 0 ? segundos : 0
}

const inputData = prompt('Por favor, insira a data no formato YYYY-MM-DD')
if (inputData) {
    const dataEvento = new Date(inputData)
    if (!isNaN(dataEvento)) {        
        contagemRegressiva(tempoRestante(inputData))
    }
    else {
        alert('Formato de data inválido! Por favor, insira a data no formato especificado.')
    }
}
else{
    alert('Por favor, insira uma data!')
}