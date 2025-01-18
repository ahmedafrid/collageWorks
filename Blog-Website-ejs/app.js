//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { redirect } = require("express/lib/response");
const  _ = require('lodash');
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//database 
mongoose.connect("mongodb://localhost:27017/blog", {useNewUrlParser: true});

const postSchema = {
  title: String,
  body: String,
  name: String,
  date: String,
};

const Post = mongoose.model("Post", postSchema);
const aboutContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo iste cumque omnis voluptatum, ut sunt recusandae alias nihil cum consectetur ullam ad eaque deserunt molestias! Perspiciatis dicta incidunt facilis iste ducimus quis veniam nobis fugiat, doloremque consequatur molestias illum nam at, quae enim! Ducimus, necessitatibus rerum officia eum corporis illo cum saepe? Exercitationem odio doloremque ad dolorum velit beatae saepe aliquam, laboriosam similique sint! Laborum ullam maxime, eligendi repellat odit sapiente facere dolores earum aliquam nihil quibusdam sequi laudantium corporis placeat, omnis ut delectus hic optio eius qui quas mollitia amet repellendus. Sed placeat ipsam molestiae iste ullam error sit quidem quaerat enim? Numquam possimus odit dolores nemo. Earum quia veritatis iure quaerat beatae iusto dolore perspiciatis ratione, sed iste repudiandae dolorum nesciunt similique veniam optio modi eos sunt aperiam voluptas esse! Ipsa doloribus veritatis itaque, quia reiciendis nostrum nihil, labore at sapiente tempore quisquam atque a nisi dicta qui minus reprehenderit mollitia quibusdam pariatur maxime. Aliquam tempore tenetur voluptates esse magni magnam voluptatum dignissimos neque, voluptatem laborum perspiciatis voluptatibus ipsam dolorem reiciendis ipsa mollitia unde et minima, natus error consequuntur. Aliquam tenetur nobis est corrupti assumenda laudantium, velit sint corporis maxime harum asperiores beatae doloremque sed magni esse nostrum!";
const contactContent = "This is contact description, Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe, optio esse. Quibusdam perspiciatis cupiditate vero qui sunt, fuga distinctio doloremque totam, ipsa, quidem beatae ut dolore possimus repellat. Minus, quibusdam fugiat quam quia optio nostrum esse voluptas omnis exercitationem incidunt maiores suscipit iure voluptates ipsa nobis quidem perferendis distinctio consequatur.";


let posts = [];

app.get("/", function(req, res) {
  Post.find({}, function(err, posts) {
    res.render("home", {
      posts: posts});
      
  })
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose" , function (req, res) {
  const post = new Post(
    {
      title: req.body.postTitle,
      body: req.body.postBody,
      name: req.body.userName,
      date: req.body.date,
    });

    console.log("new posted added by " + req.body.userName + " on "+ req.body.date);

  post.save();

});

// To get input from url
app.get("/post/:postName", function(req, res) {
  const requestedTitle = _.lowerCase(req.params.postName);
  
    Post.find({}, function(err, posts) {

      posts.forEach( function (post) {
        const storedTitle = _.lowerCase(post.title);
    
        if(requestedTitle === storedTitle)
        
      res.render("post", {
        title :post.title, 
        body: post.body});
    });
    
  })
});



app.get("/about", function(req, res) {
  res.render("about", {aboutPost: aboutContent });
});

app.get("/contact", function(req, res) {
  res.render("contact", {contactPost: contactContent})
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
