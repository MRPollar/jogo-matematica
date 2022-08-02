//botoes
const btnComecar = document.querySelector('input[name=comecar]');
let resultado = 0;

{//Troca de formulários
    const btnNewuser = document.querySelector('.login_container-form a')
    const btnLoginuser = document.querySelector('.register_container-form a')
    const outTimer = document.querySelector('#outTimer');

    var interval;

    btnNewuser.addEventListener('click', (e) => {
        e.preventDefault();

        formLogin.style.transition = '.4s';
        formLogin.style.opacity = '0';

        setTimeout(() => {

            formLogin.style.display = 'none';

        }, 200)

        setTimeout(() => {

            formNew.style.display = 'block';

            setTimeout(() => {

                formNew.style.transition = '.4s';
                formNew.style.opacity = '1';

            }, 200)

        }, 300)

    })

    btnLoginuser.addEventListener('click', (e) => {
        e.preventDefault();

        formNew.style.transition = '.4s';
        formNew.style.opacity = '0';

        setTimeout(() => {

            formNew.style.display = 'none';

        }, 200);
        setTimeout(() => {

            formLogin.style.display = 'block';

            setTimeout(() => {

                formLogin.style.transition = '.4s';
                formLogin.style.opacity = '1';

            }, 200)
        }, 300)
    })
}



{//Slide de informações da página de login
    const bullets = document.querySelectorAll('.information_container span');
    let indice;

    for (let i = 0; i < bullets.length; i++) {
        if (bullets[i] == bullets[0]) {

            bullets[i].style.backgroundColor = '#7b0ee7';

        } else {

            bullets[i].style.backgroundColor = '#ea10ed';

        }

        bullets[i].addEventListener('click', () => {

            const s1 = document.querySelector('.information_container-slide_limiter');
            s1.style.transition = '.4s';
            indice = i;

            if (indice == 0) {

                s1.style.marginLeft = '0';

            } else if (indice == 1) {

                s1.style.marginLeft = '-100%';

            } else {

                s1.style.marginLeft = '-200%';
            }

            for (let i = 0; i < bullets.length; i++) {

                if (bullets[indice] == bullets[i]) {

                    bullets[i].style.backgroundColor = '#7b0ee7';

                } else {

                    bullets[i].style.backgroundColor = '#ea10ed';

                }
            }
        })
    }
}


const inputDif = document.querySelectorAll('input[name=dif]')
const outDif = document.querySelector("#outDif");


const btnDif = document.querySelector('[name=dificuldade]');
const setDif = document.querySelector('.game-container-button_dif');
const setDiff = () => {

    setDif.style.transition = '.5s';
    setDif.classList.toggle('active');
}

// function shuffle(array) {
//     let currentIndex = array.length, randomIndex;

//     // Enquanto restam elementos para embaralhar.
//     while (currentIndex != 0) {

//         // Escolha um elemento restante.
//         randomIndex = Math.floor(Math.random() * currentIndex);
//         currentIndex--;

//         // E troque-o com o elemento atual.
//         [array[currentIndex], array[randomIndex]] = [
//             array[randomIndex], array[currentIndex]];
//     }

//     return array;
// }

btnDif.addEventListener('click', setDiff)

//Setando dificuldade

for (let i = 0; i < inputDif.length; i++) {
    inputDif[i].addEventListener('change', timerDif = () => {
        let value = inputDif[i].value;

        if (value === 'medio') {
            outDif.innerHTML = 'Médio';
            outTimer.innerHTML = 15
        } else if (value === 'dificil') {
            outDif.innerHTML = 'Difícil';
            outTimer.innerHTML = 10
        } else {
            outDif.innerHTML = 'Fácil';
            outTimer.innerHTML = 20
        }

        btnComecar.disabled = false;
        btnComecar.style.opacity = '1'

        btnDif.disabled = true;
        btnDif.style.opacity = '0.5'

    })
}

{
    btnComecar.disabled = true;
    btnComecar.style.opacity = '0.5'
}

//Iniciar jogo

btnComecar.addEventListener('click', () => {

    btnComecar.disabled = true;

    setDif.classList.remove('active');
    interval = setInterval(() => {
        temporizador();
        setTimeout(() => {
            timerAnimation();
        }, 100)
    }, 1000);

})

var count = 0;

function temporizador() {
    count = Number(outTimer.innerHTML)

    let timer = printTimer(count)

    outTimer.innerHTML = timer;
}

function printTimer(num) {
    num--
    if (num === 0) {
        clearInterval(interval)
        btnDif.disabled = false;
        btnDif.style.opacity = '1';
        btnComecar.disabled = true;
        btnComecar.style.opacity = '0.5';
        verificaDif();
        return `0${num}`;

    }

    return num < 10 ? `0${num}` : num;
}

function verificaDif() {
    for (let i = 0; i < inputDif.length; i++) {
        if (inputDif[i].checked == true)
            inputDif[i].checked = false;
        outDif.innerHTML = '--';
    }

}

function timerAnimation() {
    const border = document.querySelector('.timer');
    color = Number(outTimer.innerHTML)

    if (color <= 7) {
        outTimer.classList.add('danger');
        border.classList.add('danger')
        setTimeout(() => {
            outTimer.classList.remove('danger');
            border.classList.remove('danger')
        }, 600)
    } else {
        outTimer.classList.add('light');
        border.classList.add('light')
        setTimeout(() => {
            outTimer.classList.remove('light');
            border.classList.remove('light')
        }, 600)
    }
}


const containerConta = document.querySelector('.game-container_resp-game_conta h1')

function gerarConta() {
    let num1 = Math.floor(Math.random() * 100);
    let num2 = Math.floor(Math.random() * 100);

    let num3 = Math.floor(Math.random() * 4)

    const OPERADORES = ['+', '-', '*', '/']
    let operador = OPERADORES[num3];

    containerConta.innerHTML = tipoConta(num1, operador, num2)
}

// function teste() {
//     let result = Math.floor(Math.random() * 100)

//     if (result == 0 || isNaN(result) || result == undefined || containerConta.textContent.split(" ")[2] == "undefined" || containerConta.textContent.split(" ")[0] == "undefined" || isNaN(resultado)) {
//         gerarConta();
//         teste();
//         alert();
//     } else {
//         return result;
//     }
// }

function tipoConta(n1, op, n2) {

    let conta = '';

    if (op === '+') {
        conta = `${n1} + ${n2}`;
        resultado = n1 + n2;
    } else if (op === '-') {
        if (n2 > n1) {
            conta = `${n2} - ${n1}`;
            resultado = n2 - n1;
        } else {
            conta = `${n1} - ${n2}`;
            resultado = n1 - n2;
        }
    } else if (op === '*') {
        conta = `${n1} x ${n2}`;
        resultado = n1 * n2;
    } else if (op === '/') {
        if (n2 > n1) {
            conta = `${n2} &divide ${n1}`
            resultado = n2 / n1
        } else {
            conta = `${n1} &divide ${n2}`
            resultado = n1 / n2
        }
    }

    // if (resultado < 10) {
    //gerarConta();
    gerandoResposta(Math.round(resultado));
    // }
    return conta;

    // else {
    //     gerandoResposta(resultado)
    //     return conta;
    // }

}

gerarConta()


const outAcertos = document.querySelector('#outAcertos');
const outErr = document.querySelector('#outErr');
const outResp = document.querySelector('#outResp');

function randominzandoRespostas(RESP) {

    //winter
    // let randonNumber_1 = getRandomInt(RESP.length);
    // let randonNumber_2 = getRandomInt(RESP.length);
    // let tempNumber = RESP[randonNumber_1];
    // RESP[randonNumber_1] = RESP[randonNumber_2];
    // RESP[randonNumber_2] = tempNumber;

    //shuffle
    // for (var i = RESP.length - 1; i > 0; i--) {
    //     var j = Math.floor(Math.random() * (i + 1));
    //     var temp = RESP[i];
    //     RESP[i] = RESP[j];
    //     RESP[j] = temp;
    // }

}

function gerandoResposta(resultado) {

    const containerResp = document.querySelectorAll('.game-container_resp-game_resp p');
    for (let i = 0; i < containerResp.length; i++) {
        containerResp.innerHTML = '';
    }

    //let re1, re2, re3, re4;
    let re1, re2, re3, re4;

    if (resultado === Math.floor(resultado)) {
        re1 = Math.floor(Math.random() * resultado);
        re2 = Math.floor(Math.random() * resultado);
        re3 = Math.floor(Math.random() * resultado);
        re4 = Math.floor(Math.random() * resultado);
    }

    let label, radio, texto, resp, espaco;
    // label.setAttribute('for', 'option')
    const INDICERESP = ['A°)', 'B°)', 'C°)', 'D°)'];

    let RESP = [re1, re2, re3, re4]

    let randonNumber = getRandomInt(RESP.length - 1);

    RESP[randonNumber] = resultado;

    //randominzandoRespostas(RESP);

    let correctIndex = Math.floor(Math.random() * INDICERESP.length);
    // console.log(correctIndex)

    for (let i = 0; i < containerResp.length; i++) {
        if (INDICERESP[i] === INDICERESP[correctIndex]) {
            texto = document.createTextNode(INDICERESP[i]);
            espaco = document.createTextNode(' ')
            resp = document.createTextNode(`${RESP[i]}`)
            label = document.createElement('label');
            label.setAttribute('for', `option${i + 1}`);
            containerResp[i].appendChild(label);
            radio = document.createElement('input');
            radio.setAttribute('type', 'radio');
            radio.setAttribute('id', `option${i + 1}`);
            radio.setAttribute('name', 'resp')
            radio.setAttribute('value', `${RESP[i]}`);
            label.appendChild(radio)
            label.appendChild(texto)
            label.appendChild(espaco)
            label.appendChild(resp)
        }

        if (INDICERESP[i] !== INDICERESP[correctIndex]) {
            texto = document.createTextNode(INDICERESP[i]);
            espaco = document.createTextNode(' ')
            resp = document.createTextNode(`${RESP[i]}`)
            label = document.createElement('label');
            label.setAttribute('for', `option${i + 1}`);
            containerResp[i].appendChild(label);
            radio = document.createElement('input');
            radio.setAttribute('type', 'radio');
            radio.setAttribute('id', `option${i + 1}`);
            radio.setAttribute('name', 'resp')
            radio.setAttribute('value', `${RESP[i]}`);
            label.appendChild(radio)
            label.appendChild(texto)
            label.appendChild(espaco)
            label.appendChild(resp)
        }
    }
}



// let newVector = [0, 0, 0, 0];
// let count = 0;

// while (count < RESP.length) {

//     randonNumber = getRandomInt(RESP.length);

//     for (let i = 0; i < RESP.length; i++) {

//         if (RESP[i] != newVector[randonNumber]) {
//             newVector[count] = RESP[randonNumber];
//             count++;
//         }
//     }
// }

// console.log(RESP);
function iqualsNumber(number) {

    for (let i = 0; i < RESP.length; i++) {
        if (RESP[i] == number) {
            return true;
        } else {
            return false;
        }
    }

}
function getRandomInt(max) {
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - 0)) + 0;
}


