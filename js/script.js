/* let money;
let income;
let addExpenses;
let deposit;
let mission;
let period;

alert("Владиславе Микалайовичу, радий вітати Вас на моїй сторінці )");

console.log("Thaks you for looking my home work) My white niiga<3 "); */

// lesson 2 (HOMEWORK)

let money = 54000;
let income = "фриланс";
let addExpenses = "Интернет, Такси, Комуналка";
let deposit = true;
let mission = 100100;
let period = 2;


let budgetDay = money/30;

// lesson03 (HOMEWORK)

money = prompt('Ваш месячный доход?', 93000);  // string
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');

let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = prompt('Во сколько это обойдется?', 50000);
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = prompt('Во сколько это обойдется?', 3000);


//mission = mission / budgetMonth; 
//console.log(Math.ceil(mission));


// lesson04(HOMEWORK)

let showTypeOf = function(data){
    console.log(data, typeof(data));
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let getStatusIncome = function(){
    if (budgetDay >= 1200) return('У вас высокий уровень дохода');
    if (budgetDay >= 600 && budgetDay < 1200) return('У вас средний уровень дохода');
    if (budgetDay < 600 && budgetDay > 0) return(' сожалению у вас уровень дохода ниже среднего');
    if (budgetDay <= 0) return('Что то пошло не так');
};
console.log(getStatusIncome());


function getExpensesMonth(amount1, amount2){  
    return +amount1 + +amount2;
}
console.log(getExpensesMonth(amount1, amount2));


function getAccumulatedMonth(money, amount1, amount2){
    return +money - +amount1 - +amount2;
};
let = accumulatedMonth = getAccumulatedMonth(money, amount1, amount2);


function getTargetMonth(mission, accumulatedMonth){
    return mission / accumulatedMonth;
};
console.log(getTargetMonth(mission, accumulatedMonth));

budgetDay = accumulatedMonth / 30;
console.log(budgetDay);
console.log(addExpenses.split());

