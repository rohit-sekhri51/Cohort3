function random (resolve) {   // resolve is a function
setTimeout(resolve,3000);
}

let p = new Promise(random);
// console.log(p);


function callBack () {
    console.log("Promise completed");
}

p.then(callBack);