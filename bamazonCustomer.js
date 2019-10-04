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

function purchaseMore(){
    inquirer.prompt([
        {
            name: "purchase",
            type: "list",
            message: "Would You Like To Make Another Purchase?",
            choices: ['Yes Please', 'No Thank You']
        }
    ])
    .then(function(action){
        
        var purchase = action.purchase;
        if(purchase === 'Yes Please'){
            
            viewTable();
            
        }
        else{
            console.log("===================================================================================================================")
            console.log("\nI Completely Understand.\n")
            console.log("Farewell And Have A Safe Travel, Fellow Mapler!\n")
            console.log("===================================================================================================================")
            process.exit();
        }
    })
}

function questions(){

    inquirer.prompt([
      
        {
            name: "confirm",
            type: "confirm",
            message:"(Press 'q' and 'Enter' Key To Exit) \n Would You Like To Make A Purchase?"
        }
        
    ]).then(function(answer){

        
        if(answer.confirm === true){
            questionTwo();
        }
        else{
            console.log("===================================================================================================================")
            console.log("\nOkay, Please Come Again! Happy Mapling!\n");
            console.log("===================================================================================================================")
            process.exit();
        }

        
        var confirm = answer.confirm;
        if(confirm === "q"){
            process.exit();
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
        // var id = answer.id;
        // var howMany = answer.howMany;
        //     if(id === "q"){
        //         process.exit();
        //     }
        //     else if(howMany === "q"){
        //         process.exit();
        //     }
        var item_id = answer.id;
        connection.query("SELECT * FROM products WHERE ?", [{id: item_id}], function(err, res){
            
            if(err) throw err;

            if(res[0].stock_quantity - answer.howMany >= 0){

                console.log("===================================================================================================================")
                console.log("\nYou Are In Luck! We still have more of the " + res[0].item_name + " In Stock!\n");
                console.log('There are ' + res[0].stock_quantity + " of the " + res[0].item_name + " available.\n");
                console.log("You have purchased " + answer.howMany + " " +  res[0].item_name + "\n");
                console.log("===================================================================================================================")
                connection.query('UPDATE products SET stock_quantity=? WHERE id=?',
                [res[0].stock_quantity - answer.howMany, item_id], function(err){
                    if(err) throw err;
                    purchaseMore();
                })
            }
            else{
                console.log("===================================================================================================================")
                console.log('\nInsufficient Quantity.\n')
                console.log("There are  " + res[0].stock_quantity + " of the " + res[0].item_name + " available.\n")
                console.log("===================================================================================================================")
                purchaseMore();
            }
           
        })
       
    })
}



