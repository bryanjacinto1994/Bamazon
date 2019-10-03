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
})

function viewTable(){
    
    connection.query('SELECT FROM * products', function(err, res){
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
        
    })
}