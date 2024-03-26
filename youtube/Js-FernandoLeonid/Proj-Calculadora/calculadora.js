'use strict'

const display = document.getElementById('display')
const numeros = document.querySelectorAll('[id*=tecla]')
const operadores = document.querySelectorAll('[id*=operador]')

const teclado = {
    '0': 'tecla0',
    '1': 'tecla1',
    '2': 'tecla2',
    '3': 'tecla3',
    '4': 'tecla4',
    '5': 'tecla5',
    '6': 'tecla6',
    '7': 'tecla7',
    '8': 'tecla8',
    '9': 'tecla9',
    '*': 'operadorMultiplicar',
    '/': 'operadorDividir',
    '+': 'operadorAdicionar',
    '-': 'operadorSubtrair',
    '=': 'igual',
    'ENTER': 'igual',
    'BACKSPACE': 'backspace',
    'C': 'limparDisplay',
    'ESCAPE': 'limparCalculo',
    ',': 'decimal'
}

let novoNumero = true
let operador;
let numeroAnterior;

const atualizarDisplay = (texto) => {
    if (novoNumero) {
        display.textContent = texto.toLocaleString('BR')
        novoNumero = false
    } else {
        display.textContent += texto.toLocaleString('BR')
    }
}

const operacaoPendente = () => operador != undefined

const cacular = () => {
    if (operacaoPendente()) {
        const numeroAtual = parseFloat(display.textContent.replace(',', '.'))
        novoNumero = true
        const resultado = eval(`${numeroAnterior}${operador}${numeroAtual}`)
        atualizarDisplay(resultado)
    }
}

const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent)

const selecionarOperador = (evento) => {
    if (!novoNumero) {
        cacular()
        novoNumero = true
        operador = evento.target.textContent
        numeroAnterior = parseFloat(display.textContent.replace(',', '.'))
        console.log(operador)
        console.log(numeroAnterior)
    }
}

numeros.forEach(numero => numero.addEventListener('click', inserirNumero))
operadores.forEach(operador => operador.addEventListener('click', selecionarOperador))

const ativarIgual = () => {
    cacular();
    operador = undefined
}

const limparDisplay = () => display.textContent = ''
const limparCalculo = () => {
    limparDisplay()
    operador = undefined
    novoNumero = true
    numeroAnterior = undefined

}

const removerUltimoChar = () => display.textContent = display.textContent.slice(0, -1)

const inverterSinal = () => {
    novoNumero = true
    atualizarDisplay(display.textContent * -1)
}

const existeDecimal = () => display.textContent.indexOf(',') != -1
const existeValor = () => display.textContent.length > 0

const inserirDecimal = () => {
    if (!existeDecimal()) {
        if (existeValor()) {
            atualizarDisplay(',')
        } else {
            atualizarDisplay('0,')
        }

    }
}

const mapearTeclado = (evento) => {
    const tecla = evento.key.toUpperCase()
    const teclaPermitida = () => Object.keys(teclado).indexOf(tecla) != -1
    if (teclaPermitida()) document.getElementById(teclado[tecla]).click()
    console.log(tecla)
}

document.getElementById('igual').addEventListener('click', ativarIgual)
document.getElementById('limparDisplay').addEventListener('click', limparDisplay)
document.getElementById('limparCalculo').addEventListener('click', limparCalculo)
document.getElementById('backspace').addEventListener('click', removerUltimoChar)
document.getElementById('inverter').addEventListener('click', inverterSinal)
document.getElementById('decimal').addEventListener('click', inserirDecimal)
document.addEventListener('keydown', mapearTeclado)

