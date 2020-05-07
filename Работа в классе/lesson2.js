let a = 5;
let b = 10;

function some (a) {
	return a + b;
}


a = some(5);
console.log(a);//15


var a = 10;
let b = 15;
if (b > 10) {
	let c = 20;
	var d = 25;
}

var a = 10;

function foo() {
	console.log(a);
	var a = 15;
	console.log(a);
}
foo();
console.log(a);



function sum(x, y) {
	return x + y;
}
sum(1, 2);

function sum3(x, y, z) {
	return x + y + z;
}
sum3(1, 2, 3);


function sumAll() {
	let sum = 0;
	for ( var i=0; i<arguments.length; i++ ) {
    	sum += arguments[i];
	}
	return sum;
}
sumAll(1, 2, 3, 4, 5, 6, 7)

var city = {
	name: '',
	population: 0,
	size: '',
	telCode: '',
	coordinates: {	
		lat: '',
		log: ''
	},
};

city.name = 'Minsk';
city.population = '2M';

for (key in city) {
	console.log(key);
	console.log(city[key]);
}

let i = 0;
for (key in city) {
	i++;
}

let arr = {
	fun: function() {}
}

arr.fun()



var obj2 = {
    a: function() {
        var i = 0;
        return (function inc() {
            return ++i;
        })();
    }
}

function a() {
	var i = 0;
	return function() {
	    return ++i;
	};
}