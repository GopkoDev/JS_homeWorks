"use strict";
let money;

let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let capitalize = function (string) {
    return (string = string.replace(/(?:^\s*|\s+)(\S?)/g, (a, string) =>
        string.toUpperCase()
    ));
}; // Copy from web, not my code. I don't know how it work, but it work ))

let start = function () {
    do {
        money = prompt("Ваш месячный доход", 30000);
    } while (!isNumber(money));
};

/* start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 50000,
    period: 3,
    asking: function () {
        if (confirm("Есть ли у вас дополнительный источник зароботка?")) {
            let itemIncome = 0;
            do {
                itemIncome = prompt(
                    "Какой у вас дполнительный зароботок?",
                    "Таксую"
                );
            } while (
                isNumber(itemIncome) ||itemIncome === "" ||itemIncome === null
            );

            let cashIncome = 0;
            do {
                cashIncome = +prompt(
                    "Сколько в месяц зарабатываете на етом?",
                    10000
                );
            } while (
                !isNumber(cashIncome) ||cashIncome === "" ||cashIncome === 0
            );

            appData.income[itemIncome] = cashIncome;
        }

        let addExpenses = 0;
        do {
            addExpenses = prompt(
                "Перечислите возможные расходы за рассчитываемый период через запятую"
            );
        } while (
            isNumber(addExpenses) ||addExpenses === "" ||addExpenses === null
        );

        appData.addExpenses = addExpenses.toLowerCase().split(", ");
        appData.deposit = confirm("Есть ли у вас депозит в банке?");
        appData.getInfoDeposit();
        let howMuch = 0;
        let question = 0;
        for (let i = 0; i < 2; i++) {
            do {
                question = prompt("Введите обязательную статью расходов?");
            } while (
                isNumber(question) ||
                question === "" ||
                question === null
            );
            do {
                howMuch = +prompt("Во сколько это обойдется");
            } while (!isNumber(howMuch) || howMuch === "" || howMuch === 0);
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
    getInfoDeposit: function () {
        if (appData.deposit) {
            do {
                appData.percentDeposit = +prompt(
                    "Какой годовой процент ?",
                    "10"
                );
            } while (
                !isNumber(appData.percentDeposit) ||appData.percentDeposit === "" ||
                appData.percentDeposit === 0
            );
            do {
                appData.moneyDeposit = +prompt("Какая сума заложена?", 10000);
            } while (
                !isNumber(appData.moneyDeposit) ||
                appData.moneyDeposit === "" ||
                appData.moneyDeposit === 0
            );
        }
    },
    calcSavedMoney: function () {
        return appData.budgetMonth * appData.period;
    },
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

console.log("Cумма расходов:" + appData.expensesMonth);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());

// console.log("Наша программа включает в себя даные:");
// for (let key in appData) {
//     console.log(key + ": " + appData[key]);
// }

appData.calcSavedMoney();
console.log(capitalize(appData.addExpenses.join(", ")));
 */

let calculateButton = document.getElementById('start'); // a
let btnPlusIncome = document.getElementsByTagName('button')[0] //b 
let btnPlusExpenses = document.getElementsByTagName('button')[1]; //b
let checkbox = document.querySelector('#deposit-check'); // c
let areaAdditionalIncome = document.querySelectorAll('.additional_income-item'); //d

// e
// let rightPart = document.getElementsByClassName('result-total'); 
// console.log(rightPart)
let budgetMonth = document.getElementsByClassName('result-total')[0];
let budgetDay = document.getElementsByClassName('result-total')[1];
let expensesMonth = document.getElementsByClassName('result-total')[2];
let additionalIncome = document.getElementsByClassName('result-total')[3];
let additionalExpenses = document.getElementsByClassName('result-total')[4];
let incomePeriod = document.getElementsByClassName('result-total')[5];
let target_month = document.getElementsByClassName('result-total')[6];

let salaryAmount = document.querySelector('.salary-amount'); // f
let areaExpensesName = document.querySelectorAll('.expenses-title')[1]; //f
let areaExpensesSum = document.querySelector('.expenses-amount'); //f
let areaIncomeTitle = document.querySelectorAll('.income-title')[1];  // f
let areaIncomeAmount = document.querySelector('.income-amount'); //f
let areaAdditionalExpenses = document.querySelector('.additional_expenses-item') //f
let areaTargetAmount = document.querySelector('.target-amount') //f
let range = document.querySelector('.period-select') //f