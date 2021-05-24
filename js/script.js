"use strict";

let start1 = document.getElementById("start"); // here was start1
let cancel = document.querySelector('#cancel');
let incomePlus = document.getElementsByTagName("button")[0]; //
let expensesPlus = document.getElementsByTagName("button")[1]; //
let checdepositCheck = document.querySelector("#deposit-check"); //
let additionalIncomeItem = document.querySelectorAll(".additional_income-item"); //
let budgetMonthValue = document.getElementsByClassName("result-total")[0]; //
let budgetDayValue = document.getElementsByClassName("result-total")[1]; //
let expensesMonthValue = document.getElementsByClassName("result-total")[2]; //
let accumulatedMonthValue = 0; //result-total income_period-value
let additionalIncomeValue = document.getElementsByClassName("result-total")[3]; //
let additionalExpensesValue = document.getElementsByClassName("result-total")[4]; //
let incomePeriodValue = document.getElementsByClassName("result-total")[5]; //
let targetMonthValue = document.getElementsByClassName("result-total")[6]; //
let salaryAmount = document.querySelector(".salary-amount"); //
let expensesTitle = document.querySelectorAll(".expenses-title")[1]; //
let expensesAmount = document.querySelector('.expenses-amount')
let expensesItems = document.querySelectorAll(".expenses-items");
let incomeTitle = document.querySelectorAll(".income-title")[1]; //
let incomeAmount = document.querySelector(".income-amount"); //
let additionalExpensesItems = document.querySelector(".additional_expenses-item"); //
let targetAmount = document.querySelector(".target-amount");
let periodSelect = document.querySelector(".period-select"); //
let periodAmount = document.querySelector(".period-amount"); //class="title period-amount"
let incomeItem = document.querySelectorAll(".income-items");
let paternName = /^[^А-Яа-я]$/g
let paternNum = /[^0-9]/g


let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let capitalize = function (string) {
    return (string = string.replace(/(?:^\s*|\s+)(\S?)/g, (a, string) =>
        string.toUpperCase()
    ));
}; // Copy from web, not my code. I don't know how it works, but it works ))


const AppData = function(){
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0; 
    this.expensesMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
};

AppData.prototype.start  = function () {
    this.budget = +salaryAmount.value;
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpensess();
    // appData.asking();
    this.getAddIncome();
    this.getBudget();
    this.showResult();
    // block inputs
    incomeTitle.setAttribute("readonly", "readonly");
    additionalIncomeItem[0].setAttribute("readonly", "readonly");
    additionalIncomeItem[1].setAttribute("readonly", "readonly");
    expensesTitle.setAttribute("readonly", "readonly");
    salaryAmount.setAttribute("readonly", "readonly");
    incomeAmount.setAttribute("readonly", "readonly");
    expensesAmount.setAttribute("readonly", "readonly");
    targetAmount.setAttribute("readonly", "readonly");
    additionalExpensesItems.setAttribute("readonly", "readonly");
    start1.setAttribute('style', 'display: none'); // disable button "Расчитать"
    cancel.setAttribute('style', 'display: block'); 
};

AppData.prototype.reset = function() {
    incomeTitle.removeAttribute('readonly');
    additionalIncomeItem[0].removeAttribute('readonly');
    additionalIncomeItem[1].removeAttribute('readonly');
    expensesTitle.removeAttribute('readonly');
    salaryAmount.removeAttribute('readonly');
    incomeAmount.removeAttribute('readonly');
    expensesAmount.removeAttribute('readonly');
    targetAmount.removeAttribute('readonly');
    additionalExpensesItems.removeAttribute('readonly');
    
    let allIncomeItems = document.querySelectorAll('.income-items') // get all elements of income area
    allIncomeItems.forEach( function(item){ // clear all inputs in income area
        let title = item.querySelector('.income-title')
        let amount = item.querySelector('.income-amount')
        title.value = '';
        amount.value = '';
    });

    let allExpensesItems = document.querySelectorAll('.expenses-items'); //get all elements of expenses area
    allExpensesItems.forEach( function(item,i, array){ // clear all inputs in expenses area
        let title = item.querySelector('.expenses-title')
        let amount = item.querySelector('.expenses-amount')
        title.value = '';
        amount.value = '';
        
    }); 
    additionalIncomeItem[0].value = ''
    additionalIncomeItem[1].value = ''
    expensesTitle.value = ''
    salaryAmount.value = ''
    expensesAmount.value = ''
    targetAmount.value = ''
    additionalExpensesItems.value = ''
    budgetMonthValue.value = '';
    budgetDayValue.value = '';
    expensesMonthValue.value = '';
    additionalExpensesValue.value = '';
    additionalIncomeValue.value = '';
    targetMonthValue.value = '';
    incomePeriodValue.value = '';
    periodSelect.value = 1;
    periodAmount.textContent = 1; 

    start1.removeAttribute('style'); 
    cancel.removeAttribute('style'); // disable button "Сбросить"
};

AppData.prototype.showResult = function() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = Math.round(this.budgetDay);
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(", ");
    additionalIncomeValue.value = this.addIncome.join(", ");
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener("input", this.showResult);
};
AppData.prototype.addExpensesBlock = function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    let expensesInputTtitle = cloneExpensesItem.querySelectorAll(
        "input"
    )[0];
    let expensesInputAmount = cloneExpensesItem.querySelectorAll(
        "input"
    )[1];
    expensesInputTtitle.value = "";
    expensesInputAmount.value = "";
    expensesItems[0].parentNode.insertBefore(
        cloneExpensesItem,
        expensesPlus
    );
    expensesItems = document.querySelectorAll(".expenses-items");
    if (expensesItems.length === 3) {
        expensesPlus.style.display = "none";
    }
};
AppData.prototype.getExpenses = function () {
    const _this = this;
    expensesItems.forEach(function (item) {
        let itemExpenses = item.querySelector(".expenses-title").value;
        let cashExpenses = item.querySelector(".expenses-amount").value;
        if (itemExpenses !== "" && cashExpenses !== "") {
            (_this).expenses[itemExpenses] = cashExpenses;
        }
    });
};

AppData.prototype.addIncomeBlock = function () {
    let cloneIncomItem = incomeItem[0].cloneNode(true);
    let incomeInputTitle = cloneIncomItem.querySelectorAll("input")[0];
    let incomeInputAmount = cloneIncomItem.querySelectorAll("input")[1];
    incomeInputTitle.value = "";
    incomeInputAmount.value = "";
    incomeItem[0].parentNode.insertBefore(cloneIncomItem, incomePlus);
    incomeItem = document.querySelectorAll(".income-items");
    if (incomeItem.length === 3) {
        incomePlus.style.display = "none";
    }
};

AppData.prototype.getIncome = function () {
    const _this = this;
    incomeItem.forEach(function (item) {
        let itemIncome = item.querySelector(".income-title").value;
        let cashIncome = item.querySelector(".income-amount").value;

        if (itemIncome !== "" && cashIncome !== "") {
            _this.income[itemIncome] = cashIncome;
        }
    });

    for (let key in _this.income) {
        this.incomeMonth += +this.income[key];
    }
};

AppData.prototype.getAddExpensess = function () {
    const _this = this;
    let addExpenses = additionalExpensesItems.value.split(",");
    addExpenses.forEach(function (item) {
        item = item.trim();
        if (item !== "") {
            _this.addExpenses.push(item);
        }
    });
},
AppData.prototype.getAddIncome = function () {
    const _this = this;
    additionalIncomeItem.forEach(function (item) {
        let itemValue = item.value.trim();
        if (itemValue !== "") {
            _this.addIncome.push(itemValue);
        }
    });
};

AppData.prototype.getExpensesMonth = function () {
    let sum = 0;
    for (let key in this.expenses) {
        sum += +this.expenses[key];
    }
    this.expensesMonth = sum;
};
AppData.prototype.getBudget = function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = this.budgetMonth / 30;
};
AppData.prototype.getTargetMonth = function () {
    return targetAmount.value / this.budgetMonth;
    // if (appData.mission < 0) return "Цель не будет достигнута ";
    // if (appData.mission >= 0)
    //     return "Цель будет достигнута через " + appData.mission.toFixed();
};
AppData.prototype.getStatusIncome = function () {
    if (this.budgetDay >= 1200) return "У вас высокий уровень дохода";
    if (this.budgetDay >= 600 && this.budgetDay < 1200)
        return "У вас средний уровень дохода";
    if (this.budgetDay < 600 && this.budgetDay > 0)
        return "К сожалению у вас уровень дохода ниже среднего";
    if (this.budgetDay <= 0) return "Что то пошло не так";
};
AppData.prototype.getInfoDeposit = function () {
    const _this = this;
    if (_this.deposit) {
        do {
            _this.percentDeposit = +prompt(
                "Какой годовой процент ?",
                "10"
            );
        } while (
            !isNumber(_this.percentDeposit) ||
            _this.percentDeposit === "" ||
            _this.percentDeposit === 0
        );
        do {
            _this.moneyDeposit = +prompt("Какая сума заложена?", 10000);
        } while (
            !isNumber(appData.moneyDeposit) ||
            _this.moneyDeposit === "" ||
            _this.moneyDeposit === 0
        );
    }
};

AppData.prototype.getRange = function () {
    periodAmount.textContent = periodSelect.value;
};

AppData.prototype.calcPeriod = function () {
    return this.budgetMonth * periodSelect.value;
};

const appData = new AppData();


console.log(appData);




const start = appData.start.bind(appData)

start1.addEventListener('click', start);
cancel.addEventListener('click', appData.reset)
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.getRange);

incomeTitle.addEventListener('input', function(){
    this.value = this.value.replace(paternName,'')
});

additionalIncomeItem[0].addEventListener('input', function(){
    this.value = this.value.replace(paternName,'')
});

additionalIncomeItem[1].addEventListener('input', function(){
    this.value = this.value.replace(paternName,'')
});

expensesTitle.addEventListener('input', function(){
    this.value = this.value.replace(paternName,'')
});

salaryAmount.addEventListener('input', function(){
    this.value = this.value.replace(paternNum,'')
});

incomeAmount.addEventListener('input', function(){
    this.value = this.value.replace(paternNum,'')
});

expensesAmount.addEventListener('input', function(){
    this.value = this.value.replace(paternNum,'')
});

targetAmount.addEventListener('input', function(){
    this.value = this.value.replace(paternNum,'')
});


