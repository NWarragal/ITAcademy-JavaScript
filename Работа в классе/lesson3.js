var
let
const

function foo(x, y) {
	console.log(x + y);
}

foo(1,2);


function sum(x, y) {
	return x + y;
}

let s = sum(1, 2);

let x = 3;
let y = 4;
let z = 3;

function foo(x, y) {
	return (x + y) * z; 
}

console.log(foo(1, 2));//9
z = 5;
console.log(foo(1, 2));//15


function boo(x, y) {
	let z = 3;
	return (x + y) * z; 
}



const PI = 3.14;


function circleSquare(r) {
	return PI * r * r;
}

circleSquare(10);//314
circleSquare(20);//628

......
......



PI = 3;



function foo() {}
foo();

let boo = function() {};
boo(1, 2, 3);
(function(x, y, z) {
	console.log(x + y + z);
})(1, 2, 3);




function foo() {
	return function() {
		console.log(123);
	};
}

let newFunction = foo();
newFunction();//123



function oldFunction() {
	let i = 0;
	return function() {
		i++;
		return i;
	};
}

let newFunction = oldFunction();
newFunction();//1
newFunction();//2
newFunction();//3




function oldF() {
	let pi = 3.14;
	return function(r) {
		return pi * r * r;
	};
}

let newF = oldF();
newF(10);




function print(x, y, z) {
	console.log(`X=${x} Y=${y} Z=${z}`)
}

print(1, null,3);


function print(obj) {
	console.log(`X=${obj.x} Y=${obj.y ? obj.y : 0} Z=${obj.z}`)
}

let obj = {
	x: 1,
	y: 2,
	z: 3
};
print(obj);


function foo(s) {
	if (!s) {
		return ;
	}
	...

}


Задача 1:
Запросить ввод чисел у пользователя.
Вводить числа до тех пор, пока пользователь не введет 0.
Вывести в консоль сумму введенных чисел.

let sum = 0, number;
do {
	number = +prompt();
	sum += number;
} while(number != 0)

Задача 2:
Запросить ввод чисел у пользователя.
Вводить числа до тех пор, пока пользователь не введет 0.
Введенные числа хранить в массиве.
Найти максимальное число из введенных.
let max = array[0];
for (let i=0; i<array.length; i++) {
	проверяем, если array[i] > max
}

Задача 3:
Запросить ввод чисел у пользователя.
Вводить числа до тех пор, пока пользователь не введет 0.
Введенные числа хранить в массиве.
Вывести в консоль все четные числа.