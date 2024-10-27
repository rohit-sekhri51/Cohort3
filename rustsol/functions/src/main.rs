fn main() {

    let a = 11; 
    let b: u32 =6;
    let name = String::from("rohit");
    let len = get_str_len(&name);

    println!("{}", is_even(a));
    println!("{}",fib(b));
    print!("The length of string is {}", len);
}

fn get_str_len(str: &str) -> usize {
    str.chars().count()
}

fn fib(num: u32) -> u32 {

    let mut first: u32 = 0;
    let mut second: u32 = 1;

    if num ==0 {
        return first;
    }
    if num ==1 {
        return second;
    }

    for _i in 0..(num -1){
        let temp: u32 = second;
        second = second + first;
        first = temp;
    }

    return second;
}

fn is_even(num: i32) -> bool {
if num % 2 == 0 {
    return true;
}
return false;
} 