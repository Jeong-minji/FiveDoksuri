# study contents

여태 문과 답게 항상 개념이 항상 헷갈렸었는데,

콜백함수가 단순히 함수 안에 함수가 들어가는거라고 생각했습니다.

이 자체가 콜백함수라고 생각했죠.

```javascript
//예전에 내가 생각한 콜백함수

setTimeout(function () {
  console.log("3초 경과");
}, 3000);
```

그런데,

특정 함수의 매개변수를 통해 다른 함수의 내부로 전달되는 함수를 ''콜백 함수''라고 하고,

그리고 콜백 함수를 전달받은 특정 함수를 고차 함수라고 하더군요.

```javascript
//콜백함수와 고차함수
function repeatA(n, f) {
  for (let i = 0; i < n; i++) {
    //고차함수
    f(i);
  }
}

let logAll = function (i) {
  console.log(i); //콜백함수
};

repeatA(5, logAll); //0,1,2,3,4
```

###

(자바스크립트는 기본적으로 차례대로 진행되는 동기적 특징을 지니고 있습니다.

동기(싱크로너스) : 특정 코드를 수행 완료 후 다음코드를 실행

비동기(어싱크로너스) : 특정코드를 수행하는 도중 다음코드를 실행

```javascript
console.log(1);
console.log(2);
console.log(3);
console.log(4);
console.log(5);

console.log(1);
console.log(2);
setTimeout(() => {
  console.log("1.5");
  console.log("2.5");
}, 1000);
console.log(3);
```

콜백이라는걸 다시 한번 해석해보죠.

call = 부르다,호출하다

back = 되돌다.

즉, 부르다, 호출하다 + 되돌다.

= 되돌아 와서 호출해라. 라는 의미입니다.

###

![img](https://lh5.googleusercontent.com/zO7qS-XAPPNJTAjlYR6_A1og0QGvBAVLZw67qcE9EqG1pDZpvd8AgzA_8H0RdvDwgYhid5kMwNkNPBTOGoOR8ET1nj6oum4mnNgb1BOc3OBAG08rpflm1hIXVXPgFsh52FajC9mDw2DH)

실행불가. ajax 응답이 오기 전

즉 isAdmin이 언디파이드인 상태로 타겟 리무브가 실행되기전 함수가 종료되었기 때문.

제대로 바꿔보겠습니다.

```javascript
//성공사례
document
  .getElementById("productDeleteButton")
  .addEventListener("click", removeProduct);

const removeProduct = ({ target }) => {
  //ajax()는 ajax 요청을 보내는 가상의 함수로, 응답받는데 1초가 걸린다고 가정
  const isAdmin = ajax(); //관리자권한이 있는지 확인

  setTimeout(() => {
    if (!isAdmin) {
      //없으면 그냥 바로 리턴
      return;
    }
    target.remove(); //있으면 삭제
  }, 1000);
};
```

setTimeout으로

ajax 응답후 나머지 로직을 실행하도록 관리

함수의 제어권을 넘겨 원하는 시점에 실행하게 한다.

또한

콜백 함수가 고차 함수 내부에만 호출된다면 콜백 함수를 익명 함수 리터럴로 정의하면서 곧바로 고차 함수에 전달하는것이 일반적이다.

```javascript
function repeatA(n, f) {
  for (let i = 0; i < n; i++) {
    //고차함수
    f(i);
  }
}

repeatA(5, function (i) {
  if (i % 2) {
    console.log(`홀수만 ${i}`);
  }
});
```

콜백함수를 다른 곳에서도 호출할 필요가 있거나, 콜백함수를 전달받는 함수가 자주 호출된다면 함수외부에서 콜백 함수를 정의한 후 함수 참조를 고차 함수에 전달하는 편이 효율적이다.

### 정리

콜백함수는 함수형 프로그래밍 패러다임뿐만 아니라, 비동기 처리(이벤트,Ajax통신, 타이머 함수)에 활용되는 중요한 패턴이다.

통신할것이 많아서 콜백을 많이 사용하게되면, 이른바 콜백지옥이라는것에 빠지게되는데,

그럴때를 위해 준비된것이 promise, 와 asyne await이다.
