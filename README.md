# Bamazon 

### Links: 

Github: <br>
https://github.com/bryanjacinto1994/Bamazon

<hr>

![Site](./screenshots/one.png) <br>

![Site](./screenshots/two.png) <br>

![Site](./screenshots/three.png) <br>

![Site](./screenshots/Four.png) <br>

<hr>

## Tools Used:

* Visual Studio Code - Open source code editor for building and debugging web and cloud applications.
* JavaScript - A scripting language that uses curly-bracket syntax, first class functions and object-oriented.
* jQuery - A JavaScript library that simplifys to manipulate HTML DOM.
* Git - Version control system to track changes to source code.
* Github - Hosts respository that can be deployed to GitHub pages.
* NodeJS - A JavaScript runtime built on Chrome's V8 JavaScript engine
<br>

### NPM Packages Used:

* Inquirer
* MySQL
* Cli-Table


<hr>

## Summary

Using JavaScript and all the NPM packages listed above via Visual Studio Code, a mocked up version of "Amazon" was created through Node.js.

For the NPM Packages (listed above), this was used to have access to use the "inquirer prompt" command to ask questions to the users. "MySQL" npm package is used to have access to the '.sql' files and also connected from the MySQL WorkBench. Lastly, the "Cli-Table" is used to have a nice format of the table in the Terminal/Git Bash <br><br>

```javascript
var inquirer = require('inquirer');
var mysql = require('mysql');
var cliTable = require("cli-table");
```
How to install the npm packages:
* #### Inquirer : <br><br>$ npm install inquirer
* #### MySQL :<br><br> $ npm install mysql
* #### Cli - Table : <br><br>$ npm install cli-table



<hr>





## Code Snippet

bamazonCustomer.js : 
<br> 
```javascript
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
    
```
<br><hr><br>
bamazonCustomer.js :
<br>
```javascript
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
```
<br><hr><br>
bamazonCustomer.js:

```javascript
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
```
<br><hr><br>
bamazonCustomer.js:


```javascript
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
```



## Author Links
Linkedin:<br>
https://www.linkedin.com/in/bryan-jacinto-100438aa/

Github:<br>
https://github.com/bryanjacinto1994
