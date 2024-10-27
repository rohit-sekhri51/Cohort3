fn main() {
    println!("Hello, world!");

    let index = find_a(String::from("hrkirat"));
    match index {
        Some(value) => println!("Index is {}", value),
        None => println!("a not found"),
    }
/*      if index == -1 {
        println!("a not found");
    }
    else {
        println!("Index is {}", index);
    } */
}

/*
enum CustomOption {
    Some(i32),
    None,
}  */

fn find_a(s: String) -> Option<i32> {    // -> i32
    

    for (index, char) in s.chars().enumerate() {
        if char == 'a' {
            return Some(index as i32);
            // retun Shape::Rectangle(2,3);
            // return index as i32;
        }
    }
    return None;
    // return -1;
}
