// Example code

// 외부함수 (outter), 내부함수 (inner)
function outter() {
  function inner() {
    const title = "coding everybody";
    alert(title);
  }
  inner();
}

// 위와 동일하게 아래와 같이 변경 가능하다.
function outter() {
  const inner = function () {
    const title = "coding everybody";
    alert(title);
  };
  inner();
}

// 클로저 예시 (내수함수에서 외부함수에 있는 지역변수에 접근)
function outter() {
  const title = "coding everybody";
  function inner() {
    alert(title);
  }
  inner();
}

// 소멸된 외부함수 클로저 예시
function outter() {
  const title = "coding everybody";
  return function () {
    alert(title);
  };
}

const inner = outter();
inner();
