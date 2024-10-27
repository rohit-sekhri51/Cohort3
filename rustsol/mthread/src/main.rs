// Fearless Concurrency
//  1. Using threads to run code simultaneosly
//  2. Using message passing to transfer data b/w threads
//  3. Shared-state concurrency
//  4. Extensible concurrency with the Sync and Send traits

// 2. Do not communicate by sharing memory, instead share memory by communicating
// 2. Channels - data is sent across threads. 
// Transmitter - upstream location,data
// Receiver - downstream location, data

use std::thread;
use std::time::Duration;
use std::sync::mpsc;    // Multi Producer Single Channel

fn main() {
    println!("Hello, world!");

    let v = vec![1,3,5,6,7,8];
    let v1 = vec![11,22,33,44,55,66];

    let (tx,rx) = mpsc::channel();
    let tx1 = tx.clone();

    let handle = thread::spawn(move || {
        println!("Vector is {:?}",v);
        for i in 1..3 {
            println!("Hi number {i} from the spawned thread!");
            thread::sleep(Duration::from_secs(1));
        }
        let _t = tx.send(v);
    });
    // println!("Vector is {:?}",v);    // Vector gets consumed by the thread

    handle.join().unwrap();  // serial, let the spawned thread first finish its job then after completing the main thread is called
                                // parallel, w/o its they will be inter-mingle

    
    thread::spawn(move || {
        tx1.send(v1).unwrap();
    });
    //drop(tx);

    for i in 1..3 {
        println!("Hi number {i} from the MAIN thread");
        thread::sleep(Duration::from_secs(1));
    }
    // handle.join().unwrap();     // Putting Handle after the MAIN thread, both 1 sec wait, inter-mingle
                                // no way to put alag alag, no serial

    for val in rx {
        println!("Received {:?}",val);
    }

    /* let received = rx.recv();   // unwrap() return w/o Result, if err thread will panic
    match received {
        Ok(received) => println!("Received {:?}",received),
        Err(err) => println!("Error while reading the mspc {}",err),
    }   */
}
