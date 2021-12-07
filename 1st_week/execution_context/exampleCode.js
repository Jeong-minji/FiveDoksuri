// Example code

const x = 1;
const y = 2;
//전역 변수 선언

function foo(a) {
  //지역 변수 선언
  const x = 10;
  const y = 20;

  //매서드 호출
  console.log(a + x + y);
}

//함수 호출

foo(100);

console.log(x + y);
