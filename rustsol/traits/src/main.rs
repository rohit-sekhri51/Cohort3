// Similar to Abtract Classes in JAVA
pub trait Summary {
    fn summarize(&self) -> String {
        return String::from("Summarize!");  // Default if not function over-ride
    }
}

pub trait Fix {
    fn fix(&self) -> String {
        return String::from("Fix!");
    }
}

struct User {
    name: String,
    age: u32,
}

impl Summary for User {
    fn summarize(&self)-> String {
        return format!("User {} is {} years old ", self.name, self.age);    // Function Over-ride
    }
}
impl Fix for User {}

fn main() {
    
    let user = User {
        name: String::from("Rohit"),
        age: 35,
    };
    println!("Hello, world! {}", user.summarize());
    notify(user);
    let _s = todo!();
    // FIXME: incorrect syntax
}

// Traits as parameter
// Trait bound => (n: impl Summary)  // sungar coating, does something under hood
/*
fn notify(n: impl Summary) {
    println!("{}", n.summarize());
} */

// Trait bound syntax, multiple traits with +
fn notify<T: Summary + Fix>(n: T) {
    println!(" Summary=> {} \n Fix=> {}", n.summarize(), n.fix());
}