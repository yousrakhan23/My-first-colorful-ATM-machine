#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const chalk_1 = __importDefault(require("chalk"));
// Initialize user balance and pin code
let myBalance = 10000; // Dollar
let myPin = 232611;
//Print welcome message
console.log(chalk_1.default.green("\n \tWelcome To My ATM Machine\n"));
let pinAnswer = await inquirer_1.default.prompt([
    {
        name: "pin",
        message: chalk_1.default.cyan("enter your pin code:"),
        type: "number",
    }
]);
//     12345   ---   232611 - false
if (pinAnswer.pin === myPin) {
    console.log(chalk_1.default.yellow("\nCorrect pin code !!\n"));
    // console.log(`Current Account Balance is ${myBalance}`)
    let operationAns = await inquirer_1.default.prompt([
        {
            name: "operation",
            message: chalk_1.default.cyan("please select an option"),
            type: "list",
            choices: ["withdraw", "check balance"]
        }
    ]);
    if (operationAns.operation === "withdraw") {
        let withdrawAns = await inquirer_1.default.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: chalk_1.default.gray("Select a withdrawl method"),
                choices: ["Fast Cash", "Enter Amount"]
            }
        ]);
        if (withdrawAns.withdrawMethod === "Fast Cash") {
            let fastCashAns = await inquirer_1.default.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: "Select Amount:",
                    choices: [1000, 2000, 5000, 10000, 15000, 50000]
                }
            ]);
            if (fastCashAns.fastCash > myBalance) {
                console.log(chalk_1.default.red("Insufficient balance"));
            }
            else {
                myBalance -= fastCashAns.fastCash;
                console.log(`${fastCashAns.fastCash} withdraw successfully`);
                console.log(`Your Remaining Balance is ${myBalance}`);
            }
        }
        else if (withdrawAns.withdrawMethod === "Enter Amount") {
            let amountAns = await inquirer_1.default.prompt([
                {
                    name: "amount",
                    message: "enter your amount to withdraw",
                    type: "number",
                }
            ]);
            if (amountAns.amount > myBalance) {
                console.log("Insufficient Balance");
            }
            else {
                myBalance -= amountAns.amount;
                console.log(`${amountAns.amount} Withdraw Successfully`);
                console.log(`Your Remaing Balance is: ${myBalance}`);
            }
        }
    }
    else if (operationAns.operation === "check balance") {
        console.log(`Your Account Balance is:${myBalance}`);
    }
}
else {
    console.log(chalk_1.default.red(" Oops!! Incorrect pin number, Try again"));
}
