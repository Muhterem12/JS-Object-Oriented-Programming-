'use strict';

// static properties belong to class itself not objects made out of that

////////////////////////////////////
// CONSTRUCTOR FUNCTION

// starts with capital letter (convention)
// not allowed to use arrow function
// called by using the new keyword

const Person = function (firstName, birthYear) {
  this.firstName = firstName; // convention to create with the first name
  this.birthYear = birthYear;

  // dont create method inside of a constructor function
  // this.calcAge = function () {
  //   console.log(2024 - this.birthYear);
  // };
};

const muhterem = new Person('Muhterem', 2008);
console.log('muhterem -> ', muhterem);

////////////////////////////////////
// What happens when we call constructor function

// 1. New {} is created
// 2. function is called 'this' is set to empty object (this = {})
// 3. {} linked to prototype
// 4. function automatically return {}
const tuco = new Person('Matilda', 1970);
const nobody = new Person('Lalo Salamanca', 1975);
console.log(tuco, nobody);

// muhterem, tuco and nobody are instance of Person
const tyler = 'tyler';
console.log(muhterem instanceof Person);
console.log(tuco instanceof Person);
console.log(tyler instanceof Person);

// Prototypes
// any object always has access to the methods and properties from its prototype
// calcAge is in certain instances because of prototypal inheritance not in all
console.log(Person.prototype); // its what is used as the prototype of all the objects that are created with the Person constructor function

Person.prototype.calcAge = function () {
  console.log(2024 - this.birthYear);
};

console.log(Person.prototype);

muhterem.calcAge();
tuco.calcAge();

// __proto__ -> prototype of object
console.log(muhterem.__proto__); // prototype of muhterem
console.log(muhterem.__proto__ === Person.prototype);
console.log(tuco.__proto__ === Person.prototype);

// isPrototypeOf() -> confirming prototype
console.log(Person.prototype.isPrototypeOf(muhterem));
console.log(Person.prototype.isPrototypeOf(tuco));
console.log(Person.prototype.isPrototypeOf(Person));

Person.prototype.planet = 'Earth';
Person.prototype.species = 'Homo Sapiens';
console.log(Person.prototype);
console.log(tuco.__proto__);

// hasOwnProperty()
console.log(muhterem.hasOwnProperty('firstName'));
//  species is not really inside of the muhterem object, it just has accsess to it because of its prototype
console.log(muhterem.hasOwnProperty('species'));
console.log(
  muhterem.hasOwnProperty('planet'),
  muhterem.hasOwnProperty('birthYear')
);

console.log(muhterem.__proto__);
console.log(muhterem.__proto__.__proto__); // inspecting methods
console.log(muhterem.__proto__.__proto__.__proto__);

console.dir(Person.prototype.constructor); // 'dir' for inspecting that function
console.dir(muhterem.__proto__);

const arr = [2, 5, 132, 8, 2, 5, 3, 93, 132]; // new Array === []
console.log(arr.__proto__); // inspecting all the methods
console.log(arr.__proto__ === Array.prototype);
console.log(Date.prototype);
console.log(tyler.__proto__ === String.prototype);
console.log(arr.__proto__); // this is not the end of prototype chain
console.log(arr.__proto__.__proto__); // showing this is object prototype
console.log(Object.prototype); // any object has access to this things
console.log(arr.__proto__.__proto__ === Object.prototype);

// Convert to Array -> Array.from()
const mySet = new Set();
mySet.add(21);
mySet.add(2);
mySet.add(21);
mySet.add(71);
mySet.add({
  name: 'muho',
  age: 0,
});
const myArray = Array.from(mySet);
console.log(myArray);

Array.prototype.unique = function () {
  // return [...new Set(this)]; // this = array input
  return Array.from(new Set(this));
};

console.log(arr.unique());

const h1 = document.querySelector('h1');
console.dir(h1.__proto__.__proto__.__proto__.__proto__.constructor);

////////////////////
// Challenge #1
/*
const Car = function (brand, speed) {
  this.brand = brand;
  this.speed = speed;
};

const data1 = new Car('BMW', 120);
const data2 = new Car('Mercedes', 95);

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(this.speed);
};

data1.accelerate();

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(this.speed);
};

data1.brake();
*/

////////////////////////////////////
// ES6 CLASSES
// classes are special kind of functions
// class hidees the true nature of prototypal inheritance

// class expression
// const PerrsonCl = class {};

// class decleration

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // everything outside of constructor will be on the prototype of objects not on the objects themelfs (prototypal inheritance)
  // methods will be added to Personcl.prototype property
  calcAge1() {
    console.log(2024 - this.birthYear);
  }

  get age() {
    return 2077 - this.birthYear;
  }

  set fullName(name) {
    console.log(name);
    if (name.includes(' ')) this._fullName = name;
    // else alert(`${this.fullName} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  // STATIC
  // static methods are not available on the instances
  static hey() {
    console.log('Hey there');
    console.log(this);
  }
}
const jessica = new PersonCl('Jessica  Davis', 1991);
console.log(jessica); // looks just like before
jessica.calcAge1();
console.log(jessica.__proto__);
console.log(jessica.__proto__ === PersonCl.prototype);

console.dir(PersonCl.prototype);

PersonCl.prototype.greet = function () {
  console.log(`Hey ${this.fullName}`);
};
jessica.greet();

console.log(jessica.age);

// 1. Classes are not hoisted
// 2. Classes are always executed in strict mode // not hoisted means cannot be used before declared

const hank = new PersonCl('Walter Black', 1965);

////////////////////////////////////
// SETTERS AND GETTERS
// functions that get and set a value

const account = {
  owner: 'muhterem',
  movements: [100, 200, 20, 800],

  // getter
  get latest() {
    return this.movements.slice(-1).pop();
  },

  // setter
  set latest1(mov) {
    this.movements.push(mov);
  },
};

// getter
// we dont call the method we use it as property
console.log(account.latest);

// setter
// account.latest1(50);
account.latest1 = 50;
console.log(account.movements);

PersonCl.hey(); // this keyword points to the entire class
// jessica.hey(); static methods are not available on the instances

////////////////////
// Object.create
// no constructor function and no prototype

// PersonProto will be the prototype of all objects
const PersonProto = {
  hello: 'welcome',
  calcAge() {
    console.log(2024 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const sarah = Object.create(PersonProto);
console.log(sarah);
sarah.name = 'Sarah Conner';
sarah.birthYear = 1964;
sarah.calcAge();
console.log(sarah.hello);
console.log(sarah.__proto__ === PersonProto);

const john = Object.create(PersonProto);
john.init('John Connor', 1986);
console.log(john);

////////////////////
// Challenge #2
/*
const Car = function (brand, speed) {
  this.brand = brand;
  this.speed = speed;
};

const data1 = new Car('BMW', 120);
const data2 = new Car('Mercedes', 95);

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(this.speed);
};

data1.accelerate();

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(this.speed);
};

data1.brake();
*/

console.clear();

class CarCl {
  constructor(brand, speed) {
    this.brand = brand;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
  }

  brake() {
    this.speed -= 5;
  }

  get speedUs() {
    return this.speed / 1.6;
  }

  set speedUs(speed) {
    this.speed = speed * 1.6;
  }
}

const car1 = new CarCl('Ford', 120);

car1.accelerate();
car1.accelerate();
car1.brake();
console.log(car1);
car1.speedUs = 30;
console.log(car1);

////////////////////////////////////////
// INHERITANCE BETWEEN CLASSES

const Human = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Human.prototype.calcAge = function () {
  console.log(2024 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  // this.firstName = firstName;
  // this.birthYear = birthYear;
  // Person(firstName, birthYear);
  Person.call(this, firstName, birthYear);
  this.course = course;
};

// Setting Human.prototype in Student.prototype
// we inherit from Human but its not identical
// Student.prototype = Human.prototype; // doesent work we dont want it to be exact same object, we want Humans prototype object to be the prototype of Student.prototype
Student.prototype = Object.create(Human.prototype); // Object.create() return empty object therefore Student.prototype is empty at this point

// we write introduce method after because Object.create(Human) would overwrite it
Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mathilda = new Student('Mathilda', 1986, 'Hitman');
console.log(mathilda);
console.dir(Student);

mathilda.introduce();
mathilda.calcAge(); // we make a method lookup

console.log(mathilda.__proto__);
console.log(mathilda.__proto__.__proto__);
console.log(mathilda.__proto__.__proto__.__proto__);

console.dir(Student.prototype.constructor); // we anticipate it to point back to Student but it points back to Human
// fixing that -->
Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor); // fixed

// mathilda is both instance fo Human and Student because we lined them together
console.log(mathilda instanceof Student);
console.log(mathilda instanceof Human);
console.log(mathilda instanceof Human);
console.log(mathilda instanceof Student);

////////////////////
// Challenge #3

const Car = function (brand, speed) {
  this.brand = brand;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(this.speed);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(this.speed);
};

const EV = function (brand, speed, charge) {
  Car.call(this, brand, speed);
  this.charge = charge;
};

// Link the prototypes
EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
  console.log(chargeTo);
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.brand} is going at ${this.speed}km/h, with a charge of ${this.charge}`
  );
};

const cyberTruck = new EV('Cyber Truck', 143, 32);
console.log(cyberTruck.__proto__.__proto__);
cyberTruck.brake();
cyberTruck.chargeBattery(12);

cyberTruck.accelerate(); // cyberTrucks accelrate method is used not Cars because it comes first in prototype chain

console.log(cyberTruck);

////////////////////////////////////////
// INHERITANCE BETWEEN CLASSES (ES6 CLASSES)

PersonCl.prototype.calcAge = function () {
  console.log(2024 - this.birthYear);
};

class TeacherCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    // PersonCl.call // dont do this
    // super always needs to come first
    super(fullName, birthYear); // super function takes parameters from extends constructor
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  // overwriting calcAge method
  calcAge() {
    console.log(2077 - this.birthYear);
  }
}

const leon = new TeacherCl('Léon the Professional', 1963, 'Hitman');
console.log(leon);
leon.introduce();
leon.calcAge();

// INHERITECE BETWEEN CLASSES (Object.create())

const PersonProto1 = {
  calcAge() {
    console.log(2024 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const JobProto = Object.create(PersonProto1);
JobProto.init = function (firstName, birthYear, course) {
  PersonProto1.init.call(this, firstName, birthYear);
  this.course = course;
};

JobProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I'm a ${this.course}`);
};

const arthur = Object.create(JobProto); // JobProto is now the prototype of arthur
arthur.init('Arthur Fleck', 2019, 'Clown 🤡');

console.log(JobProto);
console.log(arthur);
arthur.introduce();
arthur.calcAge();

console.clear();

class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this._pin = pin;
    this._movements = []; // convention for encapsulation // protected property
    this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}`);
  }

  getMovements() {
    return this._movements;
  }

  deposit(val) {
    this._movements.push(val);
    return this;
  }

  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  _approveLoan(val) {
    if (val > 0) return true;
    else return false;
  }

  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved: +${val}`);
      return this;
    } else {
      console.log('Loan not approved');
      return this;
    }
  }
}

const acc1 = new Account('Muhterem', 'EUR', 6969); // this is enough to log to console 'Thanks for opening.....'
new Account(); // this is enough to log to console 'Thanks for opening.....'

console.log(acc1);

// acc1._movements.push(250);
// acc1._movements.push(-167);
acc1.deposit(250);
acc1.withdraw(167);

acc1.requestLoan(500);

////////////////////
// ENCAPSULATION
// we shouldn't be able to reach this
acc1._approveLoan(500);
console.log(acc1.pin);

// Protected Propertys
// we put _ to the beginning of the name, letting everyone know that this proprty shouldent change
console.log(acc1.getMovements());

// Private Class Fields and Methods
//
// TODO: do it later
//

////////////////////
// Chaining
// setting methods to return this makes them chainable
acc1.deposit(300).deposit(600).withdraw(421).requestLoan(1000).withdraw(2200);
console.log(acc1.getMovements());

console.clear();

////////////////////
// Challenge #4

class EVCL extends CarCl {
  constructor(brand, speed, charge) {
    super(brand, speed);
    this._charge = charge;
  }

  chargeBattery(chargeTo) {
    this.charge = chargeTo;
    return this;
  }

  accelerate() {
    this.speed += 10;
    console.log(this.speed);
    return this;
  }

  brake() {
    this.speed -= 5;
    console.log(this.speed);
    return this;
  }
}

const rivian = new EVCL('Rivian', 120, 59);

rivian.accelerate().accelerate().accelerate().brake().chargeBattery(70).brake();
