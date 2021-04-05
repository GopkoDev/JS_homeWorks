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

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposite);

console.log(addExpenses.length);

console.log('Период равен', period, 'месяцев' );
console.log('Цель зароботать', mission, 'гривен');
console.log(addExpenses.toLowerCase().split(', '));

let budgetDay = money/30;
console.log('Дневной бюджет:', budgetDay);

// lesson03 (HOMEWORK)
money = prompt('Ваш месячный доход?');  // string
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');

let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = prompt('Во сколько это обойдется?');

let budgetMonth = +money - +amount1 - +amount2;
mission = mission / budgetMonth;
console.log(Math.ceil(mission));

budgetDay = budgetMonth / 30;
console.log(Math.floor(budgetDay));


if (budgetDay >= 1200) console.log('У вас высокий уровень дохода');
if (budgetDay >= 600 && budgetDay < 1200) console.log('У вас средний уровень дохода');
if (budgetDay < 600 && budgetDay > 0) console.log(' сожалению у вас уровень дохода ниже среднего');
if (budgetDay <= 0) console.log('Что то пошло не так');




