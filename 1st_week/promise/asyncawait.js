const number = 50;

const isBiggerThanHundred = async () => {
  let promise = new Promise((resolve, reject) => {
    number > 100 ? resolve(number) : reject(number - 100);
  });

  try {
    let result = await promise;
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

isBiggerThanHundred();
