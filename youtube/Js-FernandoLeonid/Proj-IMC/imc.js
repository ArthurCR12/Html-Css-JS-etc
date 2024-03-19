const calcular = document.getElementById('btn-calcular')
const limpar = document.getElementById('btn-limpar')
const resultado = document.getElementById('resultado')

function limparCampos() {
    const nome = document.getElementById('txt-nome')
    const altura = document.getElementById('txt-altura')
    const peso = document.getElementById('txt-peso')
    nome.value = ''
    altura.value = ''
    peso.value = ''
    resultado.textContent = ''
    nome.focus()
    resultado.classList.remove('transformar-resultado');
}

function calcImc() {
    const nome = document.getElementById('txt-nome')
    const altura = document.getElementById('txt-altura')
    const peso = document.getElementById('txt-peso')

    if (nome.value == '') {
        resultado.textContent = 'Peencha o nome !'
        nome.focus()
    } else if (altura.value == '') {
        resultado.textContent = 'Peencha a altura !'
        altura.focus()
    } else if (peso.value == '') {
        resultado.textContent = 'Peencha o peso !'
        peso.focus()
    } else {
        const valorIMC = (peso.value / (altura.value * altura.value)).toFixed(2)

        let classificacao = ''

        if (valorIMC < 18.5)
            classificacao = 'Abaixo do peso.'
        else if (valorIMC < 25)
            classificacao = 'com peso ideal. Parabéns !!!'
        else if (valorIMC < 30)
            classificacao = 'levemente acima do peso.'
        else if (valorIMC < 35)
            classificacao = 'com obesidade grau I.'
        else if (valorIMC < 40)
            classificacao = 'com obesidade grau II.'
        else
            classificacao = 'com obesidade grau III.'

        resultado.textContent = (`${nome.value} seu IMC é ${valorIMC} e você está ${classificacao}`)

        if (resultado.textContent.trim() !== '') {
            resultado.classList.add('transformar-resultado');
        }
    }
}

limpar.addEventListener('click', limparCampos)
calcular.addEventListener('click', calcImc)

resultado.addEventListener('mouseenter', function () {
    if (resultado.innerHTML.trim() !== '') {
        resultado.classList.add('transformar');
    }
});

resultado.addEventListener('mouseleave', function () {
    if (resultado.innerHTML.trim() !== '') {
        resultado.classList.remove('transformar');
        resultado.classList.add('voltar-normal');
    }
});