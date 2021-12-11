# 클래스란?

ES6에 나온 문법으로 똑같은 Object를 많이 만들 일이 있을 경우에 Class를 만들어서 쓴다.

서로 연관 있는 데이터를 한군데에 묶어 놓은 컨테이너로 생각하면 좋다. 변수와 같은 속성(field)가 있고, 행동(method)가 들어있다. Class에 속성만 있는 경우도 있고 굉장히 많이 사용된다.

```js
class person {
	name;             // field
	age;              // field
	speak();          // method
}
```

Class는 붕어빵을 만들 수 있는 틀(템플릿 - 이러이러한 데이터가 들어갈 수 있어 라고 정해주는 것)이다. 그리고 붕어빵에 팥을 넣어 만들면 팥붕어빵이 되는 것이 Object이다. Class는 메모리를 차지하지 않지만, Object는 데이터를 넣은 객체가 되기 때문에 메모리를 차지하게 된다.

Function 으로 Class를 생성할 수 있다.

## Getter & Setter

Get이라는 키워드로 값을 리턴하고 Set이라는 키워드로 값을 설정할 수가 있다. Get은 값을 리턴해줘야 하고, Set은 값을 설정하기 때문에 value를 받아와야 한다. 여기에서 constructor에 있는 age라는 변수와 동일한 이름으로 하게 되면 무한 반복이 되기 때문에 Get과 Set 안에서는 다른 변수명을 사용해야 한다. 보통 변수명 앞에 언더바를 넣는다.

```js
class User {
  constructor(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }

  get age() {
    return this._age;
  }

  set age(value) {
    this._age = value < 0 ? 0 : value;
  }
}

const user1 = new User("Kim", "Dongwhee", -1);
console.log(user1.age);
// -1 (get & set이 정의되지 않았을 때의 결과 값)
// 0 (get & set이 정의되었을 때의 결과 값)
```

## Static

원래 class로 틀을 만들어서 데이터를 넣어서 각각의 object를 만들게 되는데, class 내에 static을 사용하게 되면 해당 내용은 각각의 object에 딸려 있는 내용이 아니라 class 자체에 딸려 있는 것으로 된다.

무슨 말이냐면, 어떤 object인지 관계 없이 모든 object에 공통적으로 적용되는 내용인 것이다. 그래서 원래는 article1.publisher를 하게 되면 해당되는 내용이 떠야 하는데 undefined로 출력이 된다. 해당 내용에 접근하려면 직접적으로 class명을 적어줘야 한다.

나중에 타입스크립트를 할 때, object와 상관 없이 데이터에 상관 없이 공통적으로 쓸 수 있는 것이라면 메모리를 사용하지 않고 메소드를 사용해야 할 때 유용하게 쓰인다.

```js
class Article {
  static publisher = "dream";
  constructor(articleNumber) {
    this.articleNumber = articleNumber;
  }

  static printPublisher() {
    console.log(Article.publisher);
  }
}

const article1 = new Article(1);
const article2 = new Article(2);

console.log(article1.publisher);
// undefined
console.log(Article.publisher);
// dream

Article.printPublisher();
// dream
```

## 상속과 다양성

Class를 상속하여 같은 틀로 복제할 수가 있다. Extends 키워드를 사용하면 뒤에 있는 Class 내용이 앞에 있는 Class에 포함이 된다. 이렇게 동일한 내용을 계속 재사용할 수 있는 편리함이 있다. 그리고 Class에서 수정할 내용이 생기면 처음 지정한 한 Class 내용만 변경하면 모든 곳에서 관련 내용이 변경되어 유지보수도 편하다.

```js
class Shape {
  constructor(width, height, color) {
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw() {
    console.log(`drawing ${this.color} color of`);
  }

  getArea() {
    return this.width * this.height;
  }
}

class Rectangle extends Shape {}
const rectangle = new Rectangle(20, 20, "blue");

rectangle.draw();
// drawing blue color of
rectangle.getArea();
// 400
```

또한 상속한 Class에서 어떠한 부분을 다르게 표현해야 할 때는 그것에 맞게 변경도 할 수 있다. (Overwriting)

```js
class Triangle extends Shape {
  getArea() {
    return (this.width * this.height) / 2;
  }
}

const triangle = new Triangle(20, 20, "red");
triangle.getArea();
// 200
```

이렇게 하게 되면 기존에 있던 getArea 내용은 안 나오고 오버라이팅한 내용만 나오게 된다. 만약 기존에 있던 내용도 나오게 하고 싶으면 메소드 안에 super를 넣어주면 기존 부모의 메소드도 호출되게 된다.

```js
class Triangle extends Shape {

	draw() {
		super.draw();
		console.log(`second shot`);
	}

	getArea() {
		return (return this.width * this.height) / 2;
	}
}

const triangle = new Triangle(20, 20, 'red');
triangle.getArea();
// 200

triangle.draw();
// drawing red color of
// second shot
```

## 또 다른 의미의 상속

아래 코드에 적힌 것과 같이 클래스를 만들게 되면 객체의 형태를 만드는 것과 같다. 그 형태대로 새로운 객체를 만들게 되면 기존 형태에 있는 것이 그대로 새로 만드는 객체에 형식이 상속되므로 부모 자식과 같이 된다. 여기에서 부모는 클래스인 'makeName' 이고 자식은 'myName'이 되는 것이다.

```js
function makeName(last, first) {
  this.lastName = last;
  this.firstName = first;
}

let myName = new makeName("Kim", "Dongwhee");
```

### 프로토타입 상속

상속을 하는 방법으로 2가지가 있다. 하나는 클래스 자체에 자식 객체에 전달해줄 자료 형식이고, 다른 하나는 프로토타입을 활용하는 것이다. 프로토타입은 부모의 유전자와 같다. 즉, 부모격인 클래스 유전자에는 있는데 자녀격인 객체에는 공식적으로 나타나진 않지만 필요할 경우에 가져다 사용할 수 있다. (예시코드에 있는 것과 같이 원래대로는 성과 이름만 나와야 하지만 필요할 경우 나이도 가져다 사용할 수 있는 것이다.)

자바스크립트 구동방식이 현재 있는 객체에서 'age'를 찾아서 있다면 바로 출력을 하고 없으면 그 부모격인 클래스에 'age'를 찾아서 출력하고 없으면 그 위에 또 부모에서 찾는다. 프로토타입 체인이라고 한다.

원하는 함수를 프로토타입에 저장해서 모든 배열이나 객체에서도 활용할 수도 있다.

## instanceof

Object는 Class를 이용해 만든 새로운 instance이다. instanceof 오퍼레이터는 왼쪽에 있는 Object가 오른쪽에 있는 Class가 맞는지 아닌지에 따라 boolean 값을 리턴한다.

```js
console.log(rectangle instanceof Rectangle);
// true
console.log(triangle instanceof Rectangle);
// false
console.log(triangle instanceof Triangle);
// true
console.log(triangle instanceof Shape);
// true (Triangle이 Shape을 상속했기 때문에 맞음)
console.log(triangle instanceof Object);
// true (JS에서 만든 모든 object와 class는 JS의 object를 상속한다)
```
