//Variables
const clearButton = $(".clear"); 
const display = $(".visor input");
const currencyButton = $(".currency");
const buttons = Array.from(document.querySelectorAll("button"));
const numberButtons = buttons.filter(onlyNumbers);

let displayDigits = "";
let displayvalue = 0;

//Events
clearButton.addEventListener("click", onclickclearButton);
currencyButton.addEventListener("click", onclickCurrencyButton);

numberButtons.forEach(function(btn){
    btn.addEventListener("click", onclickNumberButton);
})

//Functions

function $(elemento){
    return document.querySelector(elemento);
}

function onclickclearButton(){
    display.value = "";
    displayDigits = "";
    changeState(currencyButton, "select");
    display.classList.remove("displayConverted");
}

function onclickCurrencyButton(event){
    const btn = event.target; 
    if (btn.classList.contains("select")){
        toggleCurrency(btn);
    }
    else if (btn.classList.contains("convert")){
        convert(displayvalue, selectedCurrency(), function(convertedvalue){
        display.value = format(convertedvalue, selectedCurrency()[1]);
        display.classList.add("displayConverted");
        changeState(currencyButton, "converted");
        });
    }
}

function toggleCurrency(btn){
    if (btn.classList.contains("brl-usd")){
        btn.classList.remove("brl-usd");
        btn.classList.add("usd-brl");
    }
    else if (btn.classList.contains("usd-brl")){
        btn.classList.remove("usd-brl");
        btn.classList.add("brl-usd");
    }
}

function onlyNumbers(btn){
    return btn.classList.length == 0;
    
}

function onclickNumberButton(event){
    displayDigits += event.target.innerHTML;
    
    displayvalue = digitsToNumber(displayDigits);
    
    display.value = format(displayvalue, selectedCurrency()[0]);
    changeState(currencyButton, "convert"); 
}

function digitsToNumber(digits){
    const sizeFirstDigits = digits.length - 2;
   
    const firstDigits = digits.substr(0, sizeFirstDigits);
   
    const lastDigits = digits.substr(-2);
    
    return parseFloat(firstDigits + "." + lastDigits);
}

function format(value, symbol){
    const config = {style: 'currency', currency: symbol};
    
    if (symbol == "BRL"){
    return value.toLocaleString("pt-BR", config);    
    }
    else if (symbol == "USD"){
        return value.toLocaleString("en", config);
    }
}

function convert(value, conversion, callback){
    const base = conversion[0];
    const symbol = conversion [1];
    const api = `https://api.fixer.io/latest?base=${base}&symbols=${symbol}`;
    const request = new XMLHttpRequest();
    request.open("GET", api);
    request.onload = function(){
        const result = JSON.parse(request.responseText).rates;
        const rate = Object.values(result)[0];
        callback(value * rate);
    }
    request.send();
}

function changeState(btn, state){
    btn.classList.remove("select", "convert", "converted");
    btn.classList.add(state);
}

function selectedCurrency(){
    const arrayCurrencyButton = Array.from(currencyButton.classList);
    const currentConversion = arrayCurrencyButton.filter(c => c.includes("usd"));
    return currentConversion[0].toUpperCase().split("-");
}