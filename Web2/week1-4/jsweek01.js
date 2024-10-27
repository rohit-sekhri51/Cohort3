let favColor = "green";
const myHeight = 173;
var like = true;

console.log (favColor);
console.log (myHeight);
console.log(like);

function TotalSum () {
    let a = "five";
    let b = "seven";
    return (a+b);
}

console.log(TotalSum());
const myAge = 3;

function canVote(myAge){
    let isTrue  = (myAge > 18);
return(isTrue);
}

console.log (canVote(myAge));

function oddEven (myAge) {
if (myAge % 2 == 0) {
    console.log("The age is Even");
}
else
{
    console.log("The age is Odd");
}
}
oddEven(myAge);

function Sum1 (numb) {
    let a = 1;
    for (i=0; i<numb; i++){
        a = a + i;
    
    }
    return (a);
}
console.log("Total Sum loop = " +Sum1(5));

let user = {
    name: "Rohit",
    age: 12,
    gender: "male"
}
console.log(user);
function greet (user)
{
  let legal =  canVote(user.age);
console.log("hi " + user.gender + user.name + " you age is " + user.age + " Vote is legal-" + legal );
}
greet(user);

const num = [1,2,3,4,5,6,7];
const result = num.filter(arre);

function arre(nu) {
if   (nu % 2 == 0) { return nu
} 
else {}
}

console.log ("Even Array is " + result);

let users1 = [{
    name: "Govind",
    age: 8,
    address: {
        city: "gurgaon",
        country: "india",
        gender: "male"
    }
},{
    name: "Vikas",
    age: 28,
    address: {
        city: "Seattle",
        country: "USA",
        gender: "male"
    }
},{
    name: "Neha",
    age: 16,
    address: {
        city: "gurgaon",
        country: "india",
        gender: "female"
    }
},{
    name: "Varuna",
    age: 40,
    address: {
        city: "Medanta",
        country: "World",
        gender: "female"
    }
}]

let result1 = users1.filter(arre1);

console.log ( result1);
console.log ("Arre2 below ");
let result2 = users1.filter(arre2);

console.log ( result2);

function arre1 (us) {
    return us.age > 18;
}

function arre2 (uss) {
    return (uss.age > 18 && uss.address.gender == "female" );
}