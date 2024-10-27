setTimeout(function timer() {
    console.log('You clicked the button!');    
}, 8000);


console.log("Hi!");

setTimeout(function timeout() {
    console.log("Click the button!");
}, 5000);

console.log("Welcome to loupe.");

var a=10;
for (i=0;i<1000;i++)
{
a++;
}
console.log("Value of a is " + a);

setTimeout(() => {
    console.log("Hello, world!");
  }, 2000);

  function setTimeoutPromise(delay) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }

  setTimeoutPromise(1000).then(() => {
    console.log("Hello, world Promise!");
  });