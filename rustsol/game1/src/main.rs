// use rand::prelude::*;

// fn main() {
//     println!("Hello, world!");

//     let guess_list: [&str; 6] = ["apples","oranges","berry","banana","grapes","guava"];
//     let mut ran = thread_rng();


// }

// Errored out
use rand_distr::{Distribution, Normal, NormalError};
use rand::thread_rng;

fn main() -> Result<(), NormalError> {
    let mut rng = thread_rng();
    let normal = Normal::new(2.0, 3.0)?;
    let v = normal.sample(&mut rng);
    println!("{} is from a N(2, 9) distribution", v);
    Ok(())
}
