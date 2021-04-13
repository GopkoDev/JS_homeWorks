"use strict";

let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n)
};

let money;
let income = "фриланс";
let addExpenses = "Интернет, Такси, Комуналка";
let deposit = true;
let mission = 100100;
let period = 2;
let budgetDay;


/* let start = function(){
    while(!isNumber(money)){
        money = prompt('Ваш месячный доход');
    };
};
start(); */

let start = function(){ 
    do {
        money = prompt('Ваш месячный доход');
    } 
    while (!isNumber(money));
};
start();

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
console.log(addExpenses.split(', '));
deposit = confirm('Есть ли у вас депозит в банке?');


let showTypeOf = function(data){
    console.log(data, typeof(data));
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);


let expenses = [];
function getExpensesMonth(){  
    let sum = 0;
    let howMuch = 0;
    for(let i = 0; i < 2; i++) {
        expenses[i] = prompt('Введите обязательную статью расходов?');
        do {
            howMuch = +prompt('Во сколько это обойдется');
        } 
        while (!isNumber(howMuch));
        sum += howMuch
        
    };
    console.log(expenses);
    return sum;
};


let expensesAmount = getExpensesMonth();
console.log('Cумма расходов:' + expensesAmount);


function getAccumulatedMonth(money,expensesAmount){
    return +money - expensesAmount
};
let accumulatedMonth = getAccumulatedMonth(money, expensesAmount);


function getTargetMonth(mission, accumulatedMonth){
    mission /= accumulatedMonth;
    if(mission < 0) return  ('Цель не будет достигнута ');
    if(mission >= 0) return  ('Цель будет достигнута через ' + mission);
};


budgetDay = accumulatedMonth / 30;
let getStatusIncome = function(){
    if (budgetDay >= 1200) return('У вас высокий уровень дохода');
    if (budgetDay >= 600 && budgetDay < 1200) return('У вас средний уровень дохода');
    if (budgetDay < 600 && budgetDay > 0) return(' сожалению у вас уровень дохода ниже среднего');
    if (budgetDay <= 0) return('Что то пошло не так');
};
console.log(getStatusIncome());


console.log(getTargetMonth(mission, accumulatedMonth));
console.log('Бюджет на день: ' + budgetDay);

