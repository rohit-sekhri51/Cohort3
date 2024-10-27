fn main() {
    println!("Hello, world!");


    // 1. Basic Pattern Matching with Tuples
    fn main1() {
        let pair = (1, "hello");
        let (x, y) = pair;
        println!("x: {}, y: {}", x, y);  // 1, "hello"
        println!("x:ref {:p}, y:ref {:p}", &x, &y);  // 1, "hello"
    
        // Using & to destructure
        let &(a, ref b) = &pair;
        // let &(a, b) = &pair;  -- also works
        println!("a: {}, b: {}", a, b); // 1, "hello"
    }


    // 2. Pattern Matching in Function Parameters
    fn print_coordinates(&(x, y): &(f64, f64)) {
        println!("Current location: ({}, {})", x, y);       // 3,4
    }
    
    fn main2() {
        let point = (3.0, 4.0);
        print_coordinates(&point);
    }


    // 3. Pattern Matching with Structs
    struct Point {
        x: i32,
        y: i32,
    }
    
    fn main3() {
        let p = Point { x: 0, y: 7 };
    
        let Point { x: a, y: b } = p;
        println!("a: {}, b: {}", a, b);     // 0,7
    
        // Shorthand when variable names match struct fields
        let Point { x, y } = p;
        println!("x: {}, y: {}", x, y);     // 0,7
    
        // Destructuring a reference to a struct
        let &Point { x: c, y: d } = &p;
        println!("c: {}, d: {}", c, d);     // 0,7  -- reference/address point to actual value
    }


    // 4. Pattern Matching in Closures with Complex Types
    fn main4() {
        let numbers = vec![
            Some(1),
            None,
            Some(3),
            Some(4),
            None,
            Some(6),
        ];
    
        let sum: i32 = numbers
            .iter()
            .filter_map(|&opt| opt)
            .sum();
    
        println!("Sum of Some values: {}", sum);

        let strings = vec!["1", "two", "3", "four", "5"];
        let numbers: Vec<i32> = strings.iter()
                               .filter_map(|s| s.parse().ok())
                               .collect();
        // numbers is [1, 3, 5]

        // let s1: i32 = numbers.iter().filter_map(|&opt| opt).sum();

       // println!("Numbers is: {:#?}", numbers);
    }

    // 5. Destructuring in match Expressions
    enum Message {
        Quit,
        Move { x: i32, y: i32 },
        Write(String),
        ChangeColor(i32, i32, i32),
    }
    
    fn process_message(msg: &Message) {
        match msg {
            &Message::Quit => println!("Quitting"),
            &Message::Move { x, y } => println!("Moving to ({}, {})", x, y),
            &Message::Write(ref s) => println!("Writing: {}", s),
            &Message::ChangeColor(r, g, b) => println!("Changing color to ({}, {}, {})", r, g, b),
        }
    }
    
    fn main5() {
        // let m = Message::Write(String::from("Hello, Rust!"));
        let m = Message::ChangeColor(3,5,7);
        process_message(&m);
    }

    main1();
    main2();
    main3();
    main4();
    main5();

}
