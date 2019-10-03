var inquirer = require('inquirer');
var mysql = require('mysql');
var cliTable = require("cli-table");

var connection = mysql.createConnection({

    host: 'localhost',

    port: 3306,

    user: 'root',

    password: 'password',

    database: 'bamazon_db'


});

connection.connect(function(err){
    if(err) throw err;
    
    viewTable();
})

function viewTable(){
    
    connection.query('SELECT * FROM products', function(err, res){
        if(err) throw err;

        var viewItems = new cliTable({
            head: ["ID", "Maple Items", "Description", "Mesos", "Stock"],
            colWidths: [5, 40, 40, 15, 15]
        });

        for(var i = 0; i < res.length; i++){
            viewItems.push([
                res[i].id,
                res[i].item_name,
                res[i].department_name,
                res[i].price,
                res[i].stock_quantity
            ]);
        }
        console.log(viewItems.toString());
        questions()
    })
    
}

function questions(){

    inquirer.prompt([
      
        {
            name: "confirm",
            type: "confirm",
            message:"Would You Like To Make A Purchase?"
        }
        
    ]).then(function(answer){

        if(answer.confirm === true){
            questionTwo();
        }
        else{
            console.log("Okay, Please Come Again! Happy Mapling!");
        }

    });
   
}

function questionTwo(){
    inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: "What is the ID # of the Maple Item Would You Like To Buy?",
            validate: function(val){
                if(isNaN(val) === false){
                    return true;
                }
                else{
                    return false;
                }
            }
        },
        {
            name: "howMany",
            type: "input",
            message: "How many of this Maple Item Would You Like?",
            validate: function(val){
                if(isNaN(val) === false){
                    return true;
                }
                else{
                    return false;
                }
            }
        }
    ])
    .then(function(answer){
        var item_id = answer.id;
        connection.query("SELECT * FROM products WHERE ?", [{id: item_id}], function(err, res){
            
            if(err) throw err;

            if(res[0].stock_quantity - answer.howMany >= 0){

                console.log("\nYou Are In Luck! We still have more of the " + res[0].item_name + " In Stock!\n");
                console.log('There are ' + res[0].stock_quantity + " of the " + res[0].item_name + " available.\n");
                console.log("You have purchased " + answer.howMany + " " +  res[0].item_name + "\n");

                connection.query('UPDATE products SET stock_quantity=? WHERE id=?',
                [res[0].stock_quantity - answer.howMany, item_id], function(err){
                    if(err) throw err;
                    buyItems();
                })
            }
            else{
                console.log('\nInsufficient Quantity.\n')
                console.log("There are only " + res[0].stock_quantity + " of the " + res[0].item_name + " available.\n")
            }
        })
    })
}