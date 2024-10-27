const express = require("express");
const { UserModel, TodoModel} = require("./db");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const { auth, JWT_SECRET } = require("./auth");
import { z } from "zod";

const mySchema = z.toString();
const app = express();
app.use(express.json());
// const JWT_SECRET = "RHT51";

mongoose.connect("mongodb+srv://rohitsekhri51:dw7XFXrvwXbqHf7J@cluster0.fb4al.mongodb.net/todo-app-db");

app.post("/signup", async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    const hasedPassword = await bcrypt.hash(password, 10);

    await UserModel.create({
        email: email,
        password: hasedPassword,
        name: name
    });
    
    res.json({
        message: "You are signed up"
    })
});


app.post("/signin", async function(req, res) {

    const email = req.body.email;
    const password = req.body.password;

    const response = await UserModel.findOne({
        email: email
        //password: password,
    });

    const passwordMatch = bcrypt.compare(password, user.password);
    //if (response) {

    if (user && passwordMatch) {
        const token = jwt.sign({
            id: response._id.toString()
        },JWT_SECRET);

        res.header("jwt", token);

        res.header("random", "Rohit51");

        res.json({
            token
        })
    } else {
        res.status(403).json({
            message: "Incorrect creds"
        })
    }
});


app.get("/todos", auth, async function(req, res) {
    const userId = req.userId;

    try {
        const todos = await TodoModel.find({ userId: userId });

        if (todos.length > 0) {
            res.json(todos.map(todo => ({
                id: todo._id,
                title: todo.title,
                done: todo.done
            })));
        } else {
            res.json({
                message: "You have 0 To-Dos, have a nice day!"
            });
        }
    } catch (error) {
        console.error("Error fetching todos:", error);
        res.status(500).json({
            message: "An error occurred while fetching your todos."
        });
    }
});


app.post("/todos", auth, async function(req, res) {

    const userId = req.userId;
    const title = req.body.title;
    const done = req.body.done;

    console.log("Inside /todos. req.userId " + userId);

    const response = await TodoModel.create({
        userId: userId,
        title: title,
        done: done
    });

    if(response) {
        res.json({
            message: "To-do created"
        })
    }
    else {
        res.status(403).send({
            message: "Invalid username or password"
        });
    }

});

app.listen(3000);