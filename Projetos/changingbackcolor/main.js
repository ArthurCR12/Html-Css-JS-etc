document.addEventListener("DOMContentLoaded", () => {
    var body = document.getElementById('body')
    var inputColor = document.getElementById('icolor')

    inputColor.addEventListener('input', () => {
        var corSelecionada = inputColor.value
        body.style.background = corSelecionada
    })
})


const colorRed = () => {
    body.style.background = 'red'    
}
const colorYellow = () => {
    body.style.background = 'yellow'    
}
const colorBlue = () => {
    body.style.background = 'blue'    
}
document.getElementById('red').addEventListener('click', colorRed)
document.getElementById('yellow').addEventListener('click', colorYellow)
document.getElementById('blue').addEventListener('click', colorBlue)





