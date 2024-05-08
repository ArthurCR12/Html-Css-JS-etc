const colors = ['green', 'red', 'rgba(133,122,200)', '#f15025', 'yellow']
const btn = document.getElementById('btn')
const color = document.querySelector('.color')

btn.addEventListener('click', function () {
    // Pegar um número entre 0 e 3 por causa do array colors    
    const randomNumber = getRandomNumber()
    console.log(randomNumber)
    const body = document.body
    body.style.background = colors[randomNumber]
    color.textContent = colors[randomNumber]
    color.style.color = colors[randomNumber]
})

function getRandomNumber() {
    return Math.floor(Math.random() * colors.length);
}

function changeFocus(element) {
    const simple = document.getElementById('simple')
    const hexType = document.getElementById('hex')

    if (element === 'simple') {
        simple.classList.add('active')
        hexType.classList.remove('active')
        simple.classList.remove('normal')
        hexType.classList.add('normal')
        hexType.classList.remove('active')
    } else if (element === 'hex') {
        hexType.classList.add('active')
        simple.classList.remove('active')
        hexType.classList.remove('normal')
        simple.classList.add('normal')
        simple.classList.remove('active')
    }
}