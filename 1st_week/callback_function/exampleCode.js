// Example code
//예전에 내가 생각한 콜백함수
setTimeout(function () {
  console.log("3초 경과");
}, 3000);

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

console.log("1");
console.log("2");
setTimeout(() => {
  console.log("1.5");
  console.log("2.5");
}, 1000);
console.log("3");

repeatA(5, logAll);
// repeatA(5, function (i) {
//   if (i % 2) {
//     console.log(`홀수만 ${i}`);
//   }
// });

document.getElementById("mybutton").addEventListener("click", function () {
  console.log("button Clicked!");
});

// let a = 1;
// console.log("a++   ", a++);
// console.log("a++   ", a++);
// console.log("++a  ", ++a);

const arr = ["아", "이", "고"];

const printArray = () => {
  console.log(arr.shift());
  if (!arr.length) {
    clearInterval(timer);
  }
};
const timer = setInterval(printArray, 1000);
console.log(!arr.length);

document
  .getElementById("productDeleteButton")
  .addEventListener("click", removeProduct);

const removeProduct = ({ target }) => {
  //ajax()는 ajax 요청을 보내는 가상의 함수로, 응답받는데 1초가 걸린다고 가정
  const isAdmin = ajax(); //관리자권한이 있는지 확인
  if (!isAdmin) {
    //없으면 그냥 바로 리턴
    return;
  }
  target.remove(); //있으면 삭제
};

//실행불가. ajax 응답이 오기 전
// 즉 isAdmin이 언디파이드인 상태로 타겟 리무브가 실행되기전 함수가 종료되었기 때문

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

//ajax 응답후 나머지 로직을 실행하도록 관리
//함수의 제어권을 넘겨 원하는 시점에 실행하게 한다.
