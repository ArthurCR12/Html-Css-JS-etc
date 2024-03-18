const nome = document.getElementById('txt-nome')
const altura = document.getElementById('txt-altura')
const peso = document.getElementById('txt-peso')
const calcular = document.getElementById('btn-calcular')
const limpar = document.getElementById('btn-limpar')
const resultado = document.getElementById('resultado')

function limparCampos(){    
    nome.value = ''
    altura.value = ''
    peso.value = ''
    nome.focus()
}

function calcImc(){

}

limpar.addEventListener('click', limparCampos)
calcular.addEventListener('click', calcImc)