// Lifetimes are required when we pass a reference
// Input paramters lifetimes in a relation to return type of the function lifetimes

// Describe a relationship b/w the lifetimes of input args and output args
// It says that the return type will be valid as long as both the args are valid


fn main() {
    
    let long_str;
    let str1 = String::from("rohit");
    {
    let str2 = String::from("priyanka");
    long_str = longest(&str1,&str2); // when u pass reference &str, 
    // it causes long_str to point to a slice which has been removed from the heap resulting in dangling pointer.
    // println!(" {}",str2);   -- throws an error as longest() own not borrow str2
    println!("Hello, world! {}",long_str);
    }
}

fn longest<'a>(a: &'a str,b: &'a str) -> &'a str {       // when u pass reference &str, 

    if a.len() > b.len() {
        return a
    }
    else {
        return b
    }
}
