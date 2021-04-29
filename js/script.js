"use strict";

// 8:29 all variables


let start1 = document.getElementById('start'); //
let incomePlus = document.getElementsByTagName('button')[0]; //
let expensesPlus = document.getElementsByTagName('button')[1]; //
let checdepositCheck = document.querySelector('#deposit-check'); //
let additionalIncomeItem = document.querySelectorAll('.additional_income-item'); //
let budgetMonthValue = document.getElementsByClassName('result-total')[0]; //
let budgetDayValue = document.getElementsByClassName('result-total')[1]; //
let expensesMonthValue = document.getElementsByClassName('result-total')[2]; //
let accumulatedMonthValue = 0; //result-total income_period-value
let additionalIncomeValue = document.getElementsByClassName('result-total')[3]; //
let additionalExpensesValue = document.getElementsByClassName('result-total')[4]; //
let incomePeriodValue = document.getElementsByClassName('result-total')[5]; //
let targetMonthValue = document.getElementsByClassName('result-total')[6]; //

let salaryAmount = document.querySelector('.salary-amount'); //
let expensesTitle = document.querySelectorAll('.expenses-title')[1]; //
let expensesItems = document.querySelectorAll('.expenses-items');
let incomeTitle = document.querySelectorAll('.income-title')[1]; //
let incomeAmount = document.querySelector('.income-amount'); //
let additionalExpensesItems = document.querySelector('.additional_expenses-item'); //
let targetAmount = document.querySelector('.target-amount');
let periodSelect = document.querySelector('.period-select'); //
let periodAmount = document.querySelector('.period-amount');//class="title period-amount"
let incomeItem = document.querySelectorAll('.income-items');



let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let capitalize = function (string) {
    return (string = string.replace(/(?:^\s*|\s+)(\S?)/g, (a, string) =>
        string.toUpperCase()
    ));
}; // Copy from web, not my code. I don't know how it work, but it work ))

let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    validator: function () {
        if (isNumber(salaryAmount.value) ) appData.start();
    },
    start: function () {
        appData.budget = +salaryAmount.value;
        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddExpensess();
        // appData.asking();
        appData.getAddIncome();
        appData.getBudget();

        appData.showResult();
    },
    showResult() {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = Math.round(appData.budgetDay);
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value =appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());
        incomePeriodValue.value = appData.calcPeriod();
        periodSelect.addEventListener('input', appData.showResult)

        

    },
    addExpensesBlock: function () {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        };
    },
    getExpenses: function() {
        expensesItems.forEach(function(item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !==''){
                appData.expenses[itemExpenses] = cashExpenses
            }
        });
    },

    addIncomeBlock: function () {
        let cloneIncomItem = incomeItem[0].cloneNode(true);
        incomeItem[0].parentNode.insertBefore(cloneIncomItem, incomePlus)
        incomeItem = document.querySelectorAll('.income-items');
        if (incomeItem.length === 3) {
            incomePlus.style.display = 'none'
        }
    },


    getIncome: function () {
        incomeItem.forEach(function(item) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            
            if (itemIncome !== '' && cashIncome !== ''){
                appData.income[itemIncome] = cashIncome;
             }
        });
        
        for (let key in appData.income){
            appData.incomeMonth += +appData.income[key]
            console.log(key);
        };
    },
        
    getAddExpensess: function(){
        let addExpenses = additionalExpensesItems.value.split(',');
        addExpenses.forEach(function(item) {
            item = item.trim();
            if (item !== ''){
                appData.addExpenses.push(item);
            };
        });
    },
    getAddIncome: function () {
        additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if (itemValue !== ''){
                appData.addIncome.push(itemValue);
            }
        })
    },

    getExpensesMonth: function () {
        let sum = 0;
        for (let key in appData.expenses) {
            sum += +appData.expenses[key];
        }
        appData.expensesMonth = sum;
    },
    getBudget: function () {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = appData.budgetMonth / 30;
    },
    getTargetMonth: function () {
        return targetAmount.value / appData.budgetMonth;
        // if (appData.mission < 0) return "Цель не будет достигнута ";
        // if (appData.mission >= 0)
        //     return "Цель будет достигнута через " + appData.mission.toFixed();
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
                !isNumber(appData.percentDeposit) ||
                appData.percentDeposit === "" ||
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

    getRange: function(){
        periodAmount.textContent = periodSelect.value
    },

    calcPeriod: function () {
        return appData.budgetMonth * periodSelect.value;
    },
};

//console.log(appData.getTargetMonth());


// console.log(capitalize(appData.addExpenses.join(", ")));

start.addEventListener('click', appData.validator);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.getRange)



    // asking: function () {
        
    //     appData.deposit = confirm("Есть ли у вас депозит в банке?");
    //     appData.getInfoDeposit();
    // },
    
   
    
    
