const timer = document.querySelector('.temporizador h1');
const timermobile = document.querySelector('.temporizador-mobile h2');
const btnStart = document.querySelectorAll('.start');
const apresentation = document.querySelector('#namePlayer');
const bullets = document.querySelectorAll('.slide-container label')
const inNome = document.querySelector('#inNome');
const btncomecar = document.querySelector('.slides a');
const printConta = document.querySelector('.count > h1');
const err = document.querySelectorAll('.err');
const corr = document.querySelectorAll('.corr');
const tResp = document.querySelectorAll('.Tresp');

const final = document.querySelector('#finalGame');
const pontuacao = document.querySelector('.pointer');

// controls
var temp = 20;
var clear;
var contaGlobal;
var totalErr = 0;
var totalCorr = 0;
var totalResps = 0;

function initTimer() {

    clear = setInterval(()=>{
        printTimer();
    },1000);
    gerarConta();
    
    for(let i = 0; i < btnStart.length; i++){
        btnStart[i].disabled = true;
    }
}
btnStart.forEach((el)=>{
    el.addEventListener('click', initTimer);
});



function printTimer() {
    temp--;
    if(temp === 0){
        clearInterval(clear);
        final.style.display = 'flex';
        finalPointer()
        setTimeout(()=>{final.style.opacity = 1},300);
    }

    timer.innerHTML = temp < 10 ? `0${temp}` : temp;
    timermobile.innerHTML = temp < 10 ? `0${temp}` : temp;
}



bullets[0].style.backgroundColor = '#9a1750';
for(let i = 0; i < bullets.length; i++){
    bullets[i].addEventListener('click', ()=>{
        for(let j = 0; j < bullets.length; j++){
            if (j == i){
                bullets[j].style.backgroundColor = '#9a1750';
            } else {
                bullets[j].style.backgroundColor = '#c5c6c7'
            }
        }
    })
}



function setName(e) {
    e.preventDefault();
    let nome = inNome.value;
    const outName = document.querySelectorAll('.outName');

    try {
        if(nome == ''){ throw 'Por favor informe um nome'}
        if(nome.length <= 2 || nome.length >=10){ throw 'O nome deve ter entre 3 e 9 caracteres' }
        printName(nome, outName);
    } catch(err) { 
        alert(err)
    }
}
btncomecar.addEventListener('click', setName)

function printName(name, print){
    print.forEach((set)=>{
        set.innerHTML = name
    });
    opacity()
}

function opacity() {
    setTimeout(()=>{
        apresentation.classList.add('opacityOff');

        setTimeout(()=>{
            apresentation.style.display = 'none';
        }, 500)
    }, 500)
}



function gerarConta() {
    let num1 = randomNumber();
    let num2 = randomNumber();

    let symbol = randomSymbol();

    printConta.innerHTML = `( ${count(num1, num2, symbol)} )`;
}

function randomNumber() {
    return Math.floor(Math.random() * 100)
}

function randomSymbol() {
    let OPERADORES = ['+', '-', '*', '/'];
    let operador = Math.floor(Math.random() * OPERADORES.length)

    return OPERADORES[operador]
}

function count(n1,n2,sy) {
    let conta;
    let resp;
    
    if(sy == '+') {

        conta = `${n1} + ${n2}`;
        resp = n1 + n2
        contaGlobal = n1 + n2;

    } else if(sy == '-') {

        if(n1 < n2) {
            conta = `${n2} - ${n1}`;
            resp = n2 - n1;
            contaGlobal = n2 - n1;
        } else {
            conta = `${n1} - ${n2}`;
            resp = n1 - n2;
            contaGlobal = n1 - n2;
        }

    } else if(sy == '/') {

        if(n1 < n2) {
            conta = `${n2} &div; ${n1}`;
            resp = n2 / n1;
            contaGlobal = n2 / n1;
        } else {
            conta = `${n1} &div; ${n2}`;
            resp = n1 + n2;
            contaGlobal = n1 + n2;
        }

    } else {
        conta = `${n1} x ${n2}`;
        resp = n1 * n2;
        contaGlobal = n1 * n2;
    }


    gerarResp(resp)
    return conta;

}

function gerarResp(resp) {
    let valueResp = resp;
    let respValue = resp;

    if(resp == Math.floor(resp)){
        v1 = randomResp(resp)
        v2 = randomResp(resp)
        v3 = randomResp(resp)
        v4 = randomResp(resp)

        p1 = v1;
        p2 = v2;
        p3 = v3;
        p4 = v4;
    } else {
        v1 = randomResp(resp)
        v2 = randomResp(resp)
        v3 = randomResp(resp)
        v4 = randomResp(resp)

        p1 = v1.toFixed(2);
        p2 = v2.toFixed(2);
        p3 = v3.toFixed(2);
        p4 = v4.toFixed(2);

        valueResp = valueResp.toFixed(2)
    }

    const RESPS = [p1,p2,p3,p4];
    const VALUES = [v1,v2,v3,v4];

    let index = Math.floor(Math.random() * RESPS.length)
    RESPS[index] = valueResp;
    VALUES[index] = respValue;

    resps(RESPS,VALUES);
}

function randomResp(resp) {
    if(resp == Math.floor(resp)){
        return Math.floor(Math.random() * resp);
    } else {
        return Math.random() * resp;
    }
}

function resps(res,val) {
    const resp = document.querySelector('.resp');
    resp.innerHTML = ''

    for(let i = 0; i < res.length; i++){
        resp.innerHTML += `
        <input type="radio" name="bullet" id="radio${i + 1}" value="${val[i]}">

        <label class="radio${i + 1}" for="radio${i + 1}"><span></span> ${res[i]}</label>
        `
    }

    const change = document.querySelectorAll('.resp input');

    change.forEach((radiobtn)=>{
        radiobtn.addEventListener('change', ()=>{

            let check = radiobtn.value;

            if(contaGlobal == check){
                totalCorr++
                corr.forEach((acert)=>{
                    acert.innerHTML = totalCorr < 10 ? `0${totalCorr}` : totalCorr;
                })
                addTimer();
            } else {
                totalErr++
                err.forEach((error)=>{
                    error.innerHTML = totalErr < 10 ? `0${totalErr}` : totalErr;
                })
            }

            totalResps++
            tResp.forEach((resps)=>{
                resps.innerHTML = totalResps < 10 ? `0${totalResps}` : totalResps;
            })

            gerarConta()
        })
    })

}

function addTimer() {
    timer.innerHTML = temp + 5 > 20 ? 20 : temp + 5;
    timermobile.innerHTML = temp + 5 > 20 ? 20 : temp + 5;
}

function finalPointer() {
    let calc = totalCorr * 10

    pontuacao.innerHTML = `${isNaN(calc) ? `00` : calc}`
}