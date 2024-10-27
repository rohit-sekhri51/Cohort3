
struct Rect {
    active: bool,
    username: String,
    email: String,
    w: u32,
    h: u32,
}


impl Rect {
    fn area(&self) -> u32 {
        self.w * self.h
    }
}

fn main() {

    let rect1 = Rect {
        active: true,
        username: String::from("Govind"),
        email: String::from("GNT"),
        w: 37,
        h: 4,
    };

    println!( "Hello, world! {}", rect1.username);
    println!( "Hello, world! {}", rect1.email);
    println!( "Hello, world! {}", rect1.area());
}
