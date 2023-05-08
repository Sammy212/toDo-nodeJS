const express = require("express");
const bodyParser = require("body-parser"); 

// importing the local function as a module
const date = require(__dirname + "/date.js");

const app = express();

const items = [];
const workItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const today = new Date();
const currentDay = today.getDay();
const thisDay = daysOfWeek[currentDay];

app.get("/", function( req, res) {

    const day = date.getDate();

    res.render("list", {listTitle: day, newListItems: items});

});

app.post("/", function(req, res){
    
    let item = req.body.newItem;

    if (req.body.list === "Work List For " + date.getDate()) {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
});

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List For " + date.getDate(), newListItems: workItems});
});

app.get("/about", function(req, res){
    res.render("about");
});

app.listen(3000, function(){
    console.log("Server started on port 3000");
});