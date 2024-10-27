enum Shape {
    Rectangle(f64,f64),
    Circle(f64),
    Square(f64),
}


fn main() {
    let rect = Shape::Rectangle(3.0,4.0);
    let ar = cal_area(rect);
    println!("Area of Reactangle is {}",ar);

    let cir = Shape::Circle(5.0);
    let ac = cal_area(cir);
    println!("Area of Circle is {}",ac);
}

fn cal_area(shape: Shape) -> f64 {
    match shape {
        Shape::Rectangle(w,h) => w * h,
        Shape::Circle(r) => std::f64::consts::PI * r * r,
        Shape::Square(r) => r * r,

    }
    // println!("Hello, world!");
}