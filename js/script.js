"use strict";
let money;

let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let start = function () {
    do {
        money = prompt("Ваш месячный доход");
    } while (!isNumber(money));
};

start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 50000,
    period: 3,
    asking: function () {
        let addExpenses = prompt(
            "Перечислите возможные расходы за рассчитываемый период через запятую"
        );
        appData.addExpenses = addExpenses.toLowerCase().split(", ");
        appData.deposit = confirm("Есть ли у вас депозит в банке?");
        let howMuch = 0;
        for (let i = 0; i < 2; i++) {
            const question = prompt("Введите обязательную статью расходов?");
            do {
                howMuch = +prompt("Во сколько это обойдется");
            } while (!isNumber(howMuch));
            appData.expenses[question] = howMuch;
        }
    },
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    getExpensesMonth: function () {
        let sum = 0;
        for (let key in appData.expenses) {
            sum += +appData.expenses[key];
        }
        appData.expensesMonth = sum;
    },
    getBudget: function () {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = appData.budgetMonth / 30;
    },
    getTargetMonth: function (mission, accumulatedMonth) {
        appData.mission /= appData.budgetDay;
        if (appData.mission < 0) return "Цель не будет достигнута ";
        if (appData.mission >= 0)
            return "Цель будет достигнута через " + appData.mission.toFixed();
    },
    getStatusIncome: function () {
        if (appData.budgetDay >= 1200) return "У вас высокий уровень дохода";
        if (appData.budgetDay >= 600 && appData.budgetDay < 1200)
            return "У вас средний уровень дохода";
        if (appData.budgetDay < 600 && appData.budgetDay > 0)
            return "К сожалению у вас уровень дохода ниже среднего";
        if (appData.budgetDay <= 0) return "Что то пошло не так";
    },
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

console.log("Cумма расходов:" + appData.expensesMonth);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());

console.log("Наша программа включает в себя даные:");
for (let key in appData) {
    console.log(key + ": " + appData[key]);
}
