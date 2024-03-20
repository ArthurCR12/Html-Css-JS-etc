const turnOn = document.getElementById('btn-ligar')
const lamp = document.getElementById('lamp')
const reset = document.getElementById('reset')
const body = document.getElementById('body1')
const sonVidro = new Audio('sons/glass-breaking.mp3')
let onOff = 0

function isLampBroken() {
    return lamp.src.indexOf('quebrada') > -1
}

function lampOn() {
    if (onOff == 0) {
        if (!isLampBroken()) {
            lamp.src = 'img/ligada.PNG'
            turnOn.textContent = 'Desligar'
            onOff = 1
            turnOn.classList.remove('turnOn')
            turnOn.classList.add('turnOff')
            body.classList.remove('bg-escuro')
            body.classList.add('bg-claro')                        
        }
    }
    else if (onOff == 1) {
        if (!isLampBroken()) {
            lamp.src = 'img/desligada.PNG'
            turnOn.textContent = 'Ligar'
            onOff = 0
            turnOn.classList.remove('turnOff')
            turnOn.classList.add('turnOn')
            body.classList.remove('bg-claro')
            body.classList.add('bg-escuro')
        }
    }
}
function lampBroken() {
    if (!isLampBroken())
        lamp.src = 'img/quebrada.PNG'
        sonVidro.play()
        body.classList.add('bg-broken')
}
function reiniciar() {
    lamp.src = 'img/desligada.PNG'
    turnOn.textContent = 'Ligar'
    onOff = 0
    turnOn.classList.remove('turnOff')
    turnOn.classList.add('turnOn')
    body.classList.remove('bg-claro')
    body.classList.remove('bg-broken')
    body.classList.add('bg-escuro')

}

turnOn.addEventListener('click', lampOn)
reset.addEventListener('click', reiniciar)
lamp.addEventListener('mouseover', lampOn)
lamp.addEventListener('mouseleave', lampOn)
lamp.addEventListener('dblclick', lampBroken)