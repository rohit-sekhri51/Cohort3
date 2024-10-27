use std::collections::HashMap;

fn main() {
    

    let mut users = HashMap::new();

    users.insert(String::from("rohit"), 61);
    users.insert(String::from("mona"),32);

    let first_user_age = users.get("rohit");
    let non_user_age = users.get("abcdf");

    match first_user_age {
        Some(age) => println!("Age1 is: {}", age),
        None => println!("User not found")
    }
    
     match non_user_age {
        Some(age) => println!("Age2 is: {}", age),
        None => println!("User not found")
    } 
}
