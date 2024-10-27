// const { resolve } = require("path");

 const { resolve } = require("path");


/*
  setTimeout(function () {
    console.log("hi");
    setTimeout(function () {
      console.log("hello");
  
      setTimeout(function () {
        console.log("hello there");
      }, 5000);
    }, 3000);
  }, 1000);
  
*/


  function setTimeoutPromisified(ms) {
    
     let p = new Promise(resolve => setTimeout(resolve,ms));
    console.log("Return value Promise class is " + p);
     return p;
  }
  
  

    setTimeoutPromisified(1000).then(function() {
    console.log("Hi.");
        setTimeoutPromisified(3000).then(function() {
            console.log("Hello...");
            setTimeoutPromisified(5000).then(function() {
                console.log("Hi There.....");
         } )
        } )      
    });
  
   /* setTimeoutPromisified(1000).then(callBack(),
        console.log("Hey");
    );
// Doubt: Is there a way callBack function can be called
 
  function callBack3() {
    console.log("CallBack3 called + Hello...");
    setTimeoutPromisified(5000).then(callBack5);
  }

  function callBack5() {
    console.log("CallBack5 called + Hi there.....");
  }
    */


  setTimeoutPromisified(1000)
  .then(function () {
    console.log("hi");
    return setTimeoutPromisified(3000);
  })
  .then(function () {
    console.log("hello");
    return setTimeoutPromisified(5000);
  })
  .then(function () {
    console.log("hello there");
  });
