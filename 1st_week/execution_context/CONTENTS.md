### 실행 컨텍스트

---

**자바스크립트의 모든 것은 ''실행컨텍스트'' 내에서 이루어 진다.**

그러므로 실행 컨텍스트는 자바스크립트에서 가장 중요한 핵심 개념 중에 하나라고 볼 수 있다.

(매우 많이 생략한) 실행 컨텍스트의 차례는 이렇다.

1. `생성` or `평가`
2. `실행`

​

---

실행 컨텍스트를 공부하기 전 알아야 하는 간단 개념

**1.콜스택** : 자바스크립트 코드가 **실행**되며 **생성**되는 실행 컨텍스트를 저장하는 자료구조

![image-20211211201236585](C:\Users\thangno\AppData\Roaming\Typora\typora-user-images\image-20211211201236585.png)

콜스택에 담는다. 라는 말을 사용하곤 하는데, 생성 또는 평가 후

실행(콜) 될때, 콜스택에 담긴다고 생각하면 된다.

**2.스코프 체인**: 내부에서부터 꼬리를 물고 계속 범위를 넓히면서 찾는 관계

```javascript
let name = "doksuri";
function outer() {
  console.log("외부", name);
  function inner() {
    let theory = "javaScript";
    console.log("내부", name);
  }
  inner();
}
outer(); //결과			내부 doksuri
//		 외부 doksuri
console.log(theory); //theory is not defined

/*inner 함수 안에서 name을 찾으려 했지만 찾지 못했고, 
 	그 후 outer 함수 안에서 name을 찾으려 했다. 또한, 찾지못했다.
   결국 함수를 벗어나 전역 scope에서 name을 드디어 찾았다. */
```

---

이제 준비는 끝났다. 실행컨텍스트를 알아보도록 하자.

### 실행 컨텍스트의 개념

**실행할 코드에 제공할 환경 정보들을 모아놓은 객체**

좀 더 풀어서 설명하자면,

​ **코드를 실행하는데 필요한 조건이나 상태를 모아둔 객체가 바로 실행 컨텍스트이다.**

자바스크립트는 실행 컨텍스트가 활성화되는 시점에 다음과 같은 현상이 발생한다.

(위에서 언급한 1.평가 단계에서 하는 행위이다..)

`생성`

- `호이스팅`이 발생한다. (선언된 변수를 위로 끌어올린다)
- 함수를 선언한다. (마찬가지로 함수도 호이스팅이 발생한다.)
- 변수의 유효범위(scope) 를 설정한다.
- this 값을 설정한다

`실행`

실행 컨텍스트는 다음과 같은 것들을 이용하면 `콜스택(call stack)`에 쌓이게 된다.

- `전역공간`은 자동으로 컨텍스트로 구성된다.
- `함수`를 실행한다.
- `eval()`함수를 실행한다.

그러나 일반적으로는 함수를 이용한 실행 컨텍스트를 사용한다.

```javascript
var a = 1; // 전역 컨텍스트
function outer() {
  // outer 컨텍스트
  function inner() {
    // inner 컨텍스트
    console.log(a); // undefined
    var a = 3;
    console.log(a); // 3
  }
  inner();
  console.log(a); // 1
}
outer();
console.log(a); // 1
```

위와 같이 코드를 구성했을 때 실행 컨텍스트의 스택은 다음과 같은 순서로 실행된다.

1. 프로그램 실행: `[전역컨텍스트]`
2. outer 실행: `[전역컨텍스트, outer]`
3. inner 실행: `[전역컨텍스트, outer, inner]`
4. inner 종료: `[전역컨텍스트, outer]`
5. outer 종료: `[전역컨텍스트]`

그리고 이러한 실행컨텍스트를 구성할 때 생기는 것들이 있다.

![image-20211211211728364](C:\Users\thangno\AppData\Roaming\Typora\typora-user-images\image-20211211211728364.png)

##### **Lexical Environment**

- 처음에는 Variable Environment와 같다. (편집가능한 본사본 이라고 생각하면 된다.)
- 만약 변경된 사항이 있다면 바로 반영이 된다.

##### **Variable Environment**

- 선언 시점부터 변경사항 반영이 되지 않는다.

- 현재 컨텍스트 내의 식별자(변수)들에 대한 정보

#####

#### Lexcial Environment

Lexical Environment의 내부는

**EnvironmentRecord**와 **Outer Environment Reference**로 구성되어 있고,

- *Environment Record *로 인하여 `호이스팅`이 발생한다.
- _Outer Environment Reference_ 로 인하여 스코프와 `스코프체인`이 형성된다.

![image-20211211205602249](C:\Users\thangno\AppData\Roaming\Typora\typora-user-images\image-20211211205602249.png)

##### Environment Record 로 인한 `호이스팅`

자바스크립트는 코드를 실행하기전(맨 위에서 언급했듯) 평가한다.

평가 시, 식별자를 수집하는데

```
Environment Record

현재 컨텍스트와 관련된 코드의 식별자 정보들이 저장된다.

- 매개변수 식별자
- 함수 자체
- 함수 내부의 식별자


즉, 코드가 실행 되기 전에 자바스크립트의 엔진은 이미 실행 컨텍스트에 속한 변수명들을 모두 알고 있게 되는 셈이다.

이 때 호이스팅이란 개념이 이용된다.
```

```javascript
function a() {
  var x = 1;
  console.log(x);
  var x;
  console.log(x);
  var x = 2;
  console.log(x);
}
a();

// 호이스팅 발생
// =>
function a() {
  var x;
  var x;
  var x;

  x = 1;
  console.log(x); // 1
  console.log(x); // 1
  x = 2;
  console.log(x); // 2
}
a();
```

##### Outer Environment Reference와 Scope

이것은 설명하는것보다, 링크된 시간부터 보는것이 더 깔끔할거라 생각합니다.

(위 글을 읽고, 영상을 처음부터 끝까지 보면 이해되는 것이 많을겁니다.)

**Outer Environment 와 Scope Chain 참고 링크**

https://youtu.be/EWfujNzSUmw?t=512

#### 정리

- 실행할 코드에 제공할 환경 정보들을 모아놓은 객체\*\*

  좀 더 풀어서 설명하자면,

  ​ **코드를 실행하는데 필요한 조건이나 상태를 모아둔 객체가 바로 실행 컨텍스트이다.**

- 실행 컨텍스트는 평가(생성) 와 실행으로 이어진다.

- 실행 컨텍스트 객체는 활성화 되는 시점에 Variable Enviroment, Lexcial Envrionment 의 정보를 수집한다.

- 실행 컨텍스트를 생성할 때 Variable Environment와 Lexical Environment은 동일한 내용으로 구성된다.

- Lexical Environment는 함수 실행 도중에 변경되는 사항이 즉시 반영된다.

- Lexical Environment는 Environment Record와 Outer Environment Reference로 구성돼 있다.

  - environment Record는 매개변수 식별자, 변수 식별자, 선언한 함수의 식별자 등을 수집한다.

    - 이것 때문에 호이스팅이라는 개념이 사용된다.
    - 변수 선언부와 함수 선언문에 호이스팅이 발생한다.

  - outer Environment Reference는 상위(직전) 컨텍스트의 Lexcical Enviroment 정보를 참조한다.
    - 이것 때문에 스코프가 형성되고, 스코프 체인을 통해 상위 컨텍스트에 접근할 수 있다.
    - 스코프는 변수의 유효범위를 말한다.
