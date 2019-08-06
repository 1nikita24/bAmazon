const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "May04month",
    database: "bAmazonDB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    manmenue();
});

function manmenue() {
    inquirer
        .prompt([

            {
                type: "list",
                message: "What would you like to do:",
                name: "toDO",
                choices: [
                    "View Products for Sale",
                    "View Low Inventory",
                    "Add to Inventory",
                    "Add New Product"
                ]
            }

        ])

    .then(
        function(answers) {

            switch (answers.toDO) {
                case "View Products for Sale":
                    displayProduct();
                    break;

                case "View Low Inventory":
                    displayLowInventory();
                    break;

                case "Add to Inventory":
                    addToInventoryPrompt();
                    break;

                case "Add New Product":
                    addNewProductPrompt();
                    break;
            }

        });
};

function displayProduct() {

    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        const resTab = res.reduce((acc, { id, ...x }) => { acc[id] = x; return acc }, {})
        console.table(resTab);
        manmenue();
    });
}

function displayLowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity <= 5", function(err, res) {
        if (err) throw err;
        const resTab = res.reduce((acc, { id, ...x }) => { acc[id] = x; return acc }, {})
        console.table(resTab);
        manmenue();
    });

}

function inputNewPrompt() {
    inquirer
        .prompt([

            {
                type: "input",
                message: "What department do you want to add a product?",
                name: "inputProductDepartment"
            },

            {
                type: "input",
                message: "What product do you want to add?",
                name: "inputProduct"
            },

            {
                type: "input",
                message: "What would be the price?",
                name: "inputProductPrice"
            },

            {
                type: "input",
                message: "How many do you want to add?",
                name: "inputProductInvenotry"
            }

        ])
}