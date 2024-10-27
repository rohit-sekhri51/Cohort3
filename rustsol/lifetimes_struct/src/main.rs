use std::fmt::Display; 
struct User<'a,'b> {    // So we know how long struct can live
    fname: &'a str,
    lname: &'b str,
}


fn main() {
    
    let user: User;
    let fname = String::from("Rohit");
    {
        let lname = String::from("Sekhri");
        user = User { fname: &fname, lname: &lname};
        println!("Hello, world! {} {}", user.fname, user.lname );
    }
    let x = "Solana";
    let y = "Valiadator";
    let ann = "Break Point";
    let ln = longest_ann(x, y, ann);
    println!("Longest is {}", ln);
}

fn longest_ann<'a,T>(x: &'a str, y: &'a str, ann: T) -> &'a str
where T: Display
{

    println!("Announcement {ann} ");
    if x.len() > y.len() {
        x
    }
    else {
        y
    }
}