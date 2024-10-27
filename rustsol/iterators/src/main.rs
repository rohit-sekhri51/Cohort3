fn main() {
    println!("Hello, world!");
/*
    // 1a. Iterating using for loops
    let nums = vec![1,2,3,4,5];

    for val in nums {
        println!("{}", val);
    }

    // println!("{:?}",nums);  // cannot compile as into_iter has consume vector


    // 1b.  Iterating after creating an iterator, using iter()
    // Borrow, immutable reference to the inner variables, cant mutate
    let num =  vec!["a","b","c","d"];
    let iter  = num.iter();     // Borrow

    for val in iter {
        println!("{}", val);
    }
    println!("{:?}", num);      // able to print vector coz of borrowing


    // 2. In order to use Mutable Iterator use iter_mut()
    // Borrow, mutable reference to the inner variables
    let mut nu = vec![5,6,7,8,9];
    let miter = nu.iter_mut();

    for val in miter {
        *val = *val + 10
        //concatenate(val,)   -- cant use actual values coz they are referenced
    }
    println!("{:?}", nu); 


    // 3. Iterating using iter.next()
    // mutable
    let n = vec!["a","b","c","d"];
    let mut iter = n.iter();

    while let Some(val) = iter.next() {
        println!("{}", val);
        // concatenate(val,)  -- cant use actual values coz they are referenced
    }

    // 4. Iterating using into_iter()
    // owership, moving the variable into the iterator and DONT use it afterwards
    // Performance better
    let number = vec![1,2,3,4,5];

    let n_iter = number.into_iter();

    for val in n_iter {
        println!("{}", val);
    }

    // println!("{:?}",number);  // cannot compile as into_iter has consume vector
    // same as 1a

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    /// 
    /// 1. Consuming Adapter
    /// Methods that call next are called consuming adaptors,coz calling them uses up the iterator
    
    let vec =vec![11,22,33,44,55];
    let vec_iter = vec.iter();

    let sum: i32 = vec_iter.sum();  // sum() ends up consuming the vec_iter
    println!("Sum is {}", sum);

    // let sum1: i32 = vec_iter.sum();   -- sum function consume/use vec_iter
    // println!("Sum is {}", vec);
    //  ^^^ `Vec<i32>` cannot be formatted with the default formatter
    // = help: the trait `std::fmt::Display` is not implemented for `Vec<i32>`
    // = note: in format strings you may be able to use `{:?}` (or {:#?} for pretty-print) instead
    // = note: this error originates in the macro `$crate::format_args_nl` which comes from the expansion of the macro `println` (in Nightly builds, run with -Z macro-backtrace for more info)

*/
    ////// 2.  Iterator Adaptors are methods defined on the iterator trait that dont consume the iterator.
    /// Instead, they produce different iterator by changing some aspect of the original iterator.

    let vect =vec![11,22,33,44,55];
    let vect_iter = vect.iter();
    let vect_iter1 = vect.iter();       // reference

    let another_iter = vect_iter.map( |x| x + 100); 
    //let another_iter1 = vect_iter1.filter( |x| *x % 2 == 0);  // This explicitly dereferences x to get the i32 value.
    let another_iter1 = vect_iter1.filter( |&x| x % 2 == 0);  // Here, &x destructures the reference, allowing you to use x directly as an i32.
    // The &x approach is often preferred because it's a bit cleaner and avoids explicit dereferencing.

    for i in another_iter {
        println!(" Another Map vector is {}", i);
    }
    
     for i in another_iter1 {
        println!(" Another Filter vector is {}", i);
    }

    
    let an_it = vect.iter().filter( |&x| x%2==0).map(|x| x* 5); // other way thanks to AI
    let even_numbers: Vec<i32> = an_it.collect();  
    // Collect functions is used to convert Iterator back into Vector
    println!(" Another Filter vector Collect is {:#?}", even_numbers);

}
 