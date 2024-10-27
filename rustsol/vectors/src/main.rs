fn main() {
    println!("Hello, world!");

    let mut vec = Vec::new();
    vec.push(1);
    vec.push(2);
    vec.push(3);
    let ans = even(&vec);
    println!("{:?}",ans);
    println!("{:?}",vec);

    let tuple = vec![("Rohit",22), ("Govind",32), ("Vikas",42)];
    println!("{:?}",tuple);

    let mut vect = Vec::new();
    vect.push(22);
    vect.push(33);
    vect.push(44);
    vect.push(55);

     odd(&mut vect);
     println!(" Odd vector is {:?}", vect);

}


fn odd(vect: &mut Vec<i32>)  {
    let mut i=0;

    while i < vect.len() {
        if vect[i] % 2 == 0  {
            vect.remove(i);
        }
        else {
            i = i + 1;
        }     
    }
}

fn even(vec: &Vec<i32>) -> Vec<i32> {

    let mut new_vec = Vec::new();
    for val in vec {
        if val % 2 == 0 {
            new_vec.push(*val);
        }
    }
    return new_vec
}