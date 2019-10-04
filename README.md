# Bamazon 

### Links: 

Github: <br>
https://github.com/bryanjacinto1994/Bamazon

<hr>
<br>

## Get Started :
* Run Terminal/Git Bash.
* Do an npm install on these following packages:<br>
##### * Inquirer
##### * MySQL
##### * Cli-Table

#### (The Summary Section Will Explain How To Do A Proper Installation On These NPM Packages)
* Go into the files where the javascript file is located. <br>
Run on the Terminal / Gitbash<br>
### node bamazonCustomer.js
* Your screen should now look like the picture below:
<br> The screen should ask the user if you would like to make a purchase.
 
![Site](./screenshots/one.png) <br> <br> <hr>

* If you typed "yes", it should now look like the picture below:
* It will now ask the user what ID number of the item they would like to purchase and the quantity of that specific item id.<br> 


![Site](./screenshots/two.png) <br> <br> <hr>

* After making a purchase, it will ask the user if they would like to make another purchase. If yes, the table appears again to choose from the following options.

![Site](./screenshots/three.png) <br> <br> <hr>

* If the user does not want to make another purchase, the screenshot below will give you the following message:

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

The process of creating this program is to install the following npm packages in order for the program to completely work. 

By making a connection to my sql using "mysql.createConnection", this will grab the mysql database from the '.sql' file located in your folder. 

I have made a function that will view the information from MySQL database onto the node.js Terminal/ Git Bash and displays as a nice formatted table.

Inquirer Prompt function was used to ask the user questions. Upon asking the questions, there are if/else statements depending on what the user chooses. If the user chooses to purchase, it will go to a new question prompt function. If not, it will give an 'else' statement, and a message will show up.

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

bamazonCustomer.js : <br>
* This will create a nice formatted table display on the Terminal/Git Bash.
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
bamazonCustomer.js :<br>
* This function contains a prompt that asks the user the following questions. If the user chooses to purchase, it will go to a new function that asks the next question. If not, it will show the user a message.
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
bamazonCustomer.js:<br>

* This function executes if the user wants to purchase an item. Then it will ask the following questions. Once the user purchases an item, the quantity of the item gets updated. If there are no more of the specific item on stock, it will give an else statement saying "Insfficient Quantity".<br>
Once the user finish making a purchase, it will ask the user if they would like to make another purchase.

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
bamazonCustomer.js:<br>

This function will be called out after the user makes the first purchase. It will ask if they would like to make another purchase. If yes, the table function will execute again. If not, it will show the else statement with the following messages: <br> 


### console.log("I Completely Understand.")
### console.log("Farewell And Have A Safe Travel, Fellow Mapler!") 


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
