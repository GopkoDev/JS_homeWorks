"use strict";

const start1 = document.getElementById("start"), 
    cancel = document.querySelector('#cancel'),
    incomePlus = document.getElementsByTagName("button")[0],
    expensesPlus = document.getElementsByTagName("button")[1], 
    checdepositCheck = document.querySelector("#deposit-check"),
    additionalIncomeItem = document.querySelectorAll(".additional_income-item"),
    budgetMonthValue = document.getElementsByClassName("result-total")[0],
    budgetDayValue = document.getElementsByClassName("result-total")[1],
    expensesMonthValue = document.getElementsByClassName("result-total")[2],
    accumulatedMonthValue = 0, //result-total income_period-value //not used
    additionalIncomeValue = document.getElementsByClassName("result-total")[3],
    additionalExpensesValue = document.getElementsByClassName("result-total")[4],
    incomePeriodValue = document.getElementsByClassName("result-total")[5],
    targetMonthValue = document.getElementsByClassName("result-total")[6],
    salaryAmount = document.querySelector(".salary-amount"),
    expensesTitle = document.querySelectorAll(".expenses-title")[1],
    expensesAmount = document.querySelector('.expenses-amount'),
    incomeTitle = document.querySelectorAll(".income-title")[1],
    incomeAmount = document.querySelector(".income-amount"),
    additionalExpensesItems = document.querySelector(".additional_expenses-item"),
    targetAmount = document.querySelector(".target-amount"),  
    periodSelect = document.querySelector(".period-select"),
    periodAmount = document.querySelector(".period-amount"), //class="title period-amount"
    paternName = /^[^А-Яа-я]$/g,
    paternNum = /[^0-9]/g;

    const incomeItem = document.querySelectorAll(".income-items"),  
        expensesItems = document.querySelectorAll(".expenses-items");


const isNumber = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
};


class AppData {
    constructor(){
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
    }

    start() {
        const _this = this
        this.budget = +salaryAmount.value;
        this.getExpInc();
        this.getExpensesMonth();
        this.getAddExpInc(additionalExpensesItems, _this.addExpenses)
        this.getAddExpInc(additionalIncomeItem, _this.addIncome)
        
        
        // appData.asking();
        
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
    }
    reset() {
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
    }
    showResult() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = Math.round(this.budgetDay);
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(", ");
        additionalIncomeValue.value = this.addIncome.join(", ");
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();
        periodSelect.addEventListener("input", this.showResult);
    }

    
    addExpIncBlock(expIncItem, expIncPlus, className, cloneItem = null , inputTtitle = null, inputAmount = null){
            cloneItem = expIncItem[0].cloneNode(true);
            inputTtitle = cloneItem.querySelectorAll("input")[0];
            inputAmount = cloneItem.querySelectorAll("input")[1];
            inputTtitle.value = "";
            inputAmount.value = "";
            expIncItem[0].parentNode.insertBefore(cloneItem, expIncPlus);
            console.log(expIncItem);
            expIncItem = document.querySelectorAll(className);
            if (expIncItem.length === 3) {
                expIncPlus.style.display = "none";
            }      
    }//hw15 hard

    getExpInc(){
        const count = item =>{
            const startStr = item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${startStr}-title`).value;
            const itemAmount = item.querySelector(`.${startStr}-amount`).value;
            if (itemTitle !== "" && itemAmount !== "") {
                this[startStr][itemTitle] = itemAmount;
            }
        }

        incomeItem.forEach(count);
        expensesItems.forEach(count)

        for (const key in this.income){
            this.incomeMonth += +this.income[key]
        }
    }
    getAddExpInc(additionalItem, addItem){
        const _this = this;
        if(typeof additionalItem.value === 'string') additionalItem = additionalItem.value.split(',')
        additionalItem.forEach(function (item){
            if (typeof item !== 'string') item = item.value
            item = item.trim()
            if (item !== "") {
                addItem.push(item);
            }
        })
    } //hw15 hard
    getExpensesMonth() {
        let sum = 0;
        for (let key in this.expenses) {
            sum += +this.expenses[key];
        }
        this.expensesMonth = sum;
    }
    getBudget() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = this.budgetMonth / 30;
    }
    getTargetMonth() {
        return targetAmount.value / this.budgetMonth;
        // if (appData.mission < 0) return "Цель не будет достигнута ";
        // if (appData.mission >= 0)
        //     return "Цель будет достигнута через " + appData.mission.toFixed();
    }
    getStatusIncome() {
        if (this.budgetDay >= 1200) return "У вас высокий уровень дохода";
        if (this.budgetDay >= 600 && this.budgetDay < 1200)
            return "У вас средний уровень дохода";
        if (this.budgetDay < 600 && this.budgetDay > 0)
            return "К сожалению у вас уровень дохода ниже среднего";
        if (this.budgetDay <= 0) return "Что то пошло не так";
    }
    getInfoDeposit () {
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
    }
    getRange() {
        periodAmount.textContent = periodSelect.value;
    }
    calcPeriod() {
        return this.budgetMonth * periodSelect.value;
    }
    eventListeners() { 
        start1.addEventListener('click', start);
        cancel.addEventListener('click', appData.reset)

        incomePlus.addEventListener('click', function(){
            appData.addExpIncBlock(incomeItem, incomePlus, `.income-items`)
        });

        expensesPlus.addEventListener('click', function(){
            appData.addExpIncBlock(expensesItems, expensesPlus, `.expenses-items`);
            
        });
        
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
        
    }
};

const appData = new AppData();
const start = appData.start.bind(appData)
appData.eventListeners();
