fn main() {
    

    let mut word = String::from("Hello World");
    // let ans = &word[0..5];
    let word3 = &word[6..11];
    // you can have multiple immutable references 
    // if u have a mutable reference, you cant have other mutable/immutable references
    // println!("{}", ans);
    println!("{}", word3);
     word.push_str(" Rohit");    
    // word.clear();
    // error[E0596]: cannot borrow `word` as mutable, as it is not declared as mutable
    //    word.clear();
    // ^^^^ cannot borrow as mutable
    println!("{}", word);

    let ans = first_word(&word);
    println!("Ans is {}", ans);

}

// 2nd Approach with slices
fn first_word(name: &String) -> &str {

    let mut index = 0;

    // for i in name.chars {                -- also works
    for (_,i) in name.chars().enumerate() {
        if i == 'r' {
            break;
        }
        index = index + 1;
    }
    return &name[0..index];
}

// 1st Approach with String
/*
fn first_word(name: &String) -> String {

    let mut ans = String::from("");
    for i in name.chars() {
        if i == ' ' {
            break;
        }
        ans.push_str(&i.to_string());
    }
    return ans;
}
*/

