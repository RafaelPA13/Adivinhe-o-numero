const btn = document.getElementById('btn')
const form = document.querySelector('form')
const ul = document.querySelector('ul')
let numero = parseInt(Math.random() * 1001)
let chances = 10
let chutesAnteriores = []

btn.addEventListener('click', (e) => {
    e.preventDefault()
    let chute = document.getElementById('chute').value
    chutesAnteriores.push(chute)
    mostrarChutes()
    verificarNumero(chute)
})

function verificarNumero(palpite){
    if(palpite > 1000 || palpite < 0 || palpite == ''){
        avisos("Esse palpite não é válido")
        chute.value = ''
        chutesAnteriores.pop(chute)
    }
    else{
        if(palpite == numero){
            form.classList.add('inativo')
            ul.classList.add('inativo')
            chutesAnteriores = []
            popups({titulo: 'Parabéns você venceu!!!', texto: 'Quer tentar de novo?'})
        }
        else if(palpite > numero){
            chances--
            contadorDeChances(chances)
            avisos("O número é menor")
            chute.value = ''
        }
        else if(palpite < numero){
            chances--
            contadorDeChances(chances)
            avisos("O número é maior")
            chute.value = ''
        }  
        if(chances == 0){
            form.classList.add('inativo')
            ul.classList.add('inativo')
            chutesAnteriores = []
            popups({titulo: 'Que pena você perdeu, o número era ' + numero, texto: 'Quer tentar de novo?'})
        }  
    }
}

function contadorDeChances(n) {
    const contador = document.getElementById('contador')
    contador.innerText = 'Chances: ' + n
}

function avisos(aviso) {
    const mensagem = document.getElementById('mensagem')
    mensagem.innerText = aviso
}

function popups({ titulo, texto }) {
    const div = document.getElementById('popups')
    const h1 = document.createElement('h1')
    const p = document.createElement('p')
    const button = document.createElement('button')

    div.className = 'popup'
    h1.innerHTML = titulo
    p.innerHTML = texto
    button.innerHTML = 'Sim'
    button.id = 'btn-reiniciar'
    
    button.addEventListener('click', () => {
        location.reload()
    })

    div.appendChild(h1)
    div.appendChild(p)
    div.appendChild(button)
}

function mostrarChutes(){
    ul.classList.remove('inativo')
    ul.innerHTML=''

    chutesAnteriores.map((item)=>{
        const li = document.createElement('li')
    
        li.innerHTML = item
    
        ul.appendChild(li)
    })    
}