// Example code

//클래스 생성하는 방법
function makeName() {
  this.lastName = "Kim";
  this.firstName = "Dongwhee";
}

// this 는 makeName으로 새로 생성되는 object 지칭 (instance 라고도 불림)
// 객체 내 lastName, firstName 이라는 키가 있는 것임

let myName = new makeName();
// 이렇게 새로운 객체를 만들 수 있음

// 인자를 활용하여 각각 상황에 맞는 객체를 생성할 수 있음
function makeName(last, first) {
  this.lastName = last;
  this.firstName = first;
}

let myName = new makeName("Kim", "Dongwhee");
let yourName = new makeName("Hong", "Gildong");

// ES6 문법으로 클래스 생성 방법 (클래스 명은 항상 영문대문자로 해야함)
class Name {
  constructor(last, first) {
    this.lastName = last;
    this.firstName = first;
  }
}

let myName = new Name("Kim", "Dongwhee");

// 프로토타입을 활용한 상속
function makeName(last, first) {
  this.lastName = last;
  this.firstName = first;
}

let myName = new makeName("Kim", "Dongwhee");

makeName.prototype.age = 10;

let myAge = myName.age; // 결과값은 10이 나온다.
