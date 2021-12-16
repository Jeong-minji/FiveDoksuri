const number = 150;

let promise = new Promise((resolve, reject) => {
  // number가 100보다 크면 number를 return하고, 100보다 작으면 number-100을 return
  number > 100 ? resolve(number) : reject(number - 100);
});

// resolve or reject가 반환한 result 확인하는 방법
promise
  .then((res) => {
    // 성공 시
    console.log(res);
    console.log(promise);
  })
  .catch((err) => {
    // 실패 시
    console.log(err);
    console.log(promise);
  })
  .finally(() => {
    // 마무리
    console.log("finish");
  });
