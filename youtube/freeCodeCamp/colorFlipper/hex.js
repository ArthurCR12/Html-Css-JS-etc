const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", 'B', 'C', 'D', 'E', 'F']
const btn = document.getElementById('btn')
const color = document.querySelector('.color')

const simple = document.getElementById('simple')
const hexType = document.getElementById('hex')

btn.addEventListener('click', function () {
    let hexColor = '#'
    for (let i = 0; i < 6; i++) {
        //Math.floor(Math.random() * hex)
        hexColor += hex[Math.floor(Math.random() * hex.length)]

    }
    const body = document.body
    body.style.background = hexColor
    color.textContent = hexColor
    color.style.color = hexColor
})


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

