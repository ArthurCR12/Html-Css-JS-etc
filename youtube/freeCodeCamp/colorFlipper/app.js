const colors = ['green', 'red', 'rgba(133,122,200)', '#f15025', 'yellow']
const btn = document.getElementById('btn')
const color = document.querySelector('.color')


btn.addEventListener('click', function(){
    // Pegar um número entre 0 e 3 por causa do array colors    
    const randomNumber = getRandomNumber()
    console.log(randomNumber)
    const body = document.body
    body.style.background = colors[randomNumber]
    color.textContent = colors[randomNumber]
})

function getRandomNumber(){
    return Math.floor(Math.random()*colors.length);
}