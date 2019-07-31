const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306  
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "May04month",
    database: "bamazonDB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
});

function afterConnection() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.table(res);
        purchaseitem();
    });
}

function purchaseitem() {
    inquirer
        .prompt([{
                type: "input",
                meassge: "What is the ID if the item you would like to purchase: ",
                name: "itemID"
            },
            {
                type: "number",
                message: "How many would you like to purchase?",
                name: "quantityBuy"

            },
        ])

    .then(function(answers) {
        let IDreq = answers.itemID;
        let quantityReq = answers.quantityBuy;
        makepurchase(IDreq, quantityReq);
    });
};

function makepurchase(wantedID, wantedQuan) {
    connection.query(
        "SELECT * FROM products WHERE ?", [{
            id: wantedID
        }],
        function(err, res) {
            if (err) throw err;
            if (wantedQuan <= res[0].stock_quantity) {
                let price = res[0].price;
                price = price.substring(1);
                price = parseInt(price);

                let totalM = price * wantedID;
                let leftStock = res[0].stock_quantity - wantedQuan;

                console.log("\nGood news suffiencent quantity in stock!\n");
                console.log("\nYour total cost is: " + totalM + "\n");
                connection.query(
                    "UPDATE products SET ? WHERE ?", [
                        { stock_quantity: leftStock },
                        { id: wantedID }
                    ],

                    function(err, res) {
                        if (err) throw err;
                    }
                );
            } else {
                console.log("\nInsufficient stock!\n");
            };

            anotherpurchase()

        });

};

function anotherpurchase() {
    inquirer
        .prompt([{
            type: "confirm",
            message: "Do you wish to make another purchase? ",
            name: "confirm"
        }])

    .then(function(answers) {
        if (answers.confirm === true) {
            afterConnection();
        } else {

            console.log("\nCome again!\n");
            connection.end();

        }

    });
}