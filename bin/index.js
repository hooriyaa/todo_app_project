#! /usr/bin/env node
import inquirer from "inquirer";
let todos = [];
let condition = true;
let todosquestions;
do {
    todosquestions = await inquirer.prompt([
        {
            name: "firstQuestion",
            type: "input",
            message: "what would you like to add in your todoslist?"
        }
    ]);
    if (todosquestions.firstQuestion) {
        let additem = await inquirer.prompt({
            name: "secondQuestion",
            type: "confirm",
            message: "would you like to add more in your todoslist?",
        });
        todos.push(todosquestions.firstQuestion);
        condition = additem.secondQuestion;
    }
    else {
        let todosQ;
        do {
            todosQ = await inquirer.prompt({
                name: "delete",
                type: "confirm",
                message: "Do you want to delete anything from your todoslist?"
            });
            if (todosQ.delete) {
                let deleteques = await inquirer.prompt({
                    name: "deleteitem",
                    type: "list",
                    choices: todos,
                    message: "Select any item to delete:"
                });
                if (todos.includes(deleteques.deleteitem)) {
                    let i = todos.indexOf(deleteques.deleteitem);
                    todos.splice(i, 1);
                    console.log("your item has been deleted!!");
                }
            }
        } while (todosQ.delete);
    }
    console.log("Here is your todos list:");
    for (let todo of todos) {
        console.log(todo);
    }
} while (todosquestions.firstQuestion);
