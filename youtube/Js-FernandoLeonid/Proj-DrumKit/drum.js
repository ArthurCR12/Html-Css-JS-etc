'use strict';

// JSON
const sons = {
    'A': 'boom.wav',
    'S': 'clap.wav',
    'D': 'hihat.wav',
    'F': 'kick.wav',
    'G': 'openhat.wav',
    'H': 'ride.wav',
    'J': 'snare.wav',
    'k': 'tink.wav',
    'L': 'tom.wav',
}

const criarDiv = (texto) => {
    const div = document.createElement('div')
    div.classList.add('key')
    div.textContent = texto
    div.id = texto
    document.getElementById('container').appendChild(div)
}

const exibir = (sons) => Object.keys(sons).forEach(criarDiv)

const tocarSom = (letra) =>{
    const som = new Audio(`./assets/sounds/${sons[letra]}`)
    som.play()
}

const adicionarEfeito = (letra) => document.getElementById(letra).classList.add('active')
const removerEfeito = (letra) => document.getElementById(letra).classList.remove('active')

const ativarSom = (evento) => {
    const letra = evento.target.id
    const letraPermitida = sons.hasOwnProperty(letra)
    if (letraPermitida)
        adicionarEfeito(letra)
        tocarSom(letra)
        removerEfeito(letra)
}

exibir(sons)

document.getElementById('container').addEventListener('click', ativarSom)
