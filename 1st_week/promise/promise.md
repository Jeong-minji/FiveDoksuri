## Javascript 동작 원리

Javscript는 Single Thread 엔진을 사용하기 때문에, 두 가지 작업을 한 번에 할 수 없다.<br/>
따라서 여러 작업이 동시에 요청될 때, 다른 작업이 마무리 될 때까지 기다리지 않고
비동기적으로 처리가 가능하도록 설계되어 있다.

## 비동기(Asynchronous)

- 동기: 작업 요청과 동시에 작업의 결과를 바로 받는 처리 방식
- 비동기: 작업 요청을 하지만, 결과는 바로 받지 않아도 되는 처리 방식
  ex) setTimeOut, setInterval 등

## Promise 사용하는 이유

비동기 요청 사용으로 인해 발생하는 안티패턴

1. callback 중첩
2. 변수에 값이 세팅되었는지 확인하기 위한 작업으로 인한 코드량 증가

## Promise란

비동기적으로 실행되는 작업의 결과(성공/실패)를 나타내는 `객체`
결과를 객체화 시킨다는 점이 Promise의 특징

#### 사용법

- `new Promise(executor)`로 객체 생성
- 인자(executor)로 resolve와 reject 함수를 받음
- executor는 비동기 작업을 마친 후 <br/>
  작업이 성공적으로 이행되었으면 resolve 함수를 호출하고, 실패했으면 reject 함수를 호출

```
let promise = new Promise(function(resolve, reject) {
  if(성공) {
     resolve(1);
  } else {
    reject(-1);
  }
});
```

#### 객체의 3가지 상태

- 대기(pending): 아직 실행되지 않은 초기 상태
- 이행(fulfilled): 작업이 성공적으로 완료됨
- 거부(rejected): 작업이 실패함

![image](https://user-images.githubusercontent.com/20683436/145244930-05b72fd3-13e8-4957-90bb-79a79192e832.png)
![image](https://user-images.githubusercontent.com/20683436/145243313-33c4991c-6408-4d89-8136-e4ce40098ac0.png)

#### Promise 객체의 결과값과 상태값 받아오는 방법

Promise 객체의 state와 result 프로퍼티는 내부 프로퍼티이므로, 직접 접근이 불가능하다.<br/>
따라서, `.then`, `.catch`, `.finally` 메서드를 이용하여 접근한다.

```
promise
.then(res => {
  console.log(res);  // 1
}.catch(err => {
  console.log(err);  // -1
}
```

## Async/Await

Promise를 좀 더 간편하게 쓰기 위해 사용한다.

#### async

- 항상 function 앞에 위치함
- function 앞에 async를 붙이면 해당 함수는 항상 promise 객체를 반환함

#### await

- async가 붙은 함수 안에서만 작동
- promise 객체가 처리(reject/resolve) 될 때 까지 기다림
- await에는 내부에 `.then()`이 구현되어 있어, promise 처럼 `.then()`을 뒤에 붙이지 않아도 결과값을 받을 수 있음
- `try...catch`문을 사용하여 try에서 성공했을 때 결과값을, catch에서는 에러를 핸들링함

```
async function example() {
  let promise = new Promise((resolve, reject) => {
    resolve("success!");
  });

  try {
    let result = await promise;
    console.log(result);
  } catch(err) {
    console.log(err);
  }
}
```
