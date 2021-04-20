"use strict";
let money;

let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n)
};

let start = function(){ 
    do {
        money = prompt('Ваш месячный доход');
    } 
    while (!isNumber(money))
};

start();

let appData = {
    icome: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 50000,
    period: 3,
    asking: function(){
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
            appData.addExpenses.toLowerCase().split(', ');
            appData.deposit = confirm('Есть ли у вас депозит в банке?');
    },
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    getExpensesMonth: function(){  
        let expenses = [];
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
    },
    getAccumulatedMonth: function(money,expensesAmount){
        return +money - expensesAmount
    },
    getTargetMonth: function(mission, accumulatedMonth){
        appData.mission /= accumulatedMonth;
        if(mission < 0) return  ('Цель не будет достигнута ');
        if(mission >= 0) return  ('Цель будет достигнута через ' + mission);
    },
    getStatusIncome: function(){
        if (budgetDay >= 1200) return('У вас высокий уровень дохода');
        if (budgetDay >= 600 && budgetDay < 1200) return('У вас средний уровень дохода');
        if (budgetDay < 600 && budgetDay > 0) return(' сожалению у вас уровень дохода ниже среднего');
        if (budgetDay <= 0) return('Что то пошло не так');
    }
};


let expensesAmount = appData.getExpensesMonth();
console.log('Cумма расходов:' + expensesAmount);

let accumulatedMonth = appData.getAccumulatedMonth(money, expensesAmount);
let budgetDay = accumulatedMonth / 30;

console.log(appData.getStatusIncome());
console.log(appData.getTargetMonth(appData.mission, accumulatedMonth));
console.log('Бюджет на день: ' + budgetDay);

