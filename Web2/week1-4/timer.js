
function step3Done() {
    console.log("hello there");
  }
  
  function step2Done() {
    console.log("hello");
    setTimeout(step3Done, 5000);
  }
  
  function step1Done() {
    console.log("hi");
    setTimeout(step2Done, 3000);
  }
  
  setTimeout(step1Done, 1000);

  // My code below

setTimeout(callBack, 1000);

function callBack() {
    const count = 10;
    console.log("count= %d" , count);
}

setTimeout(callBack3,3000);

function callBack3() {
    console.log("Count:    30 ");
}

setTimeout(callBack5,5000);
function callBack5() {
    console.log("Count:               50");
}


  