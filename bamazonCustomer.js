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

connection.connect(function(error){
    if(error) throw error;
})

