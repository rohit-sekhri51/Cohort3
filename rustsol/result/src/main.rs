use std::fs::read_to_string;


fn main() {
    println!("Hello, world!");

    let resulting = read_to_string("a.txt");

    match resulting {
        Ok(data) => println!("{}",data),
        Err(err) => println!("Error"),
    }
}
