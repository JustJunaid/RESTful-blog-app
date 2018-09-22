// BASIC APP SETUP
let express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    methodOverride = require("method-override"),
    Blog    = require("./blogs"),
    seedDB         = require("./seed");

seedDB();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(methodOverride("_method"));

mongoose.connect("mongodb://localhost/blogApp");


// ROUTES GOES HERE
app.get("/", function(req, res) {
   res.redirect("/blogs"); 
});

// Index Route
app.get("/blogs", function(req, res) {
   Blog.find({}, function(err, blogs) {
      if (err) {
          console.log(err);
      } else {
          res.render("index", {blogs: blogs})
      }
   });
});

// New Route
app.get("/blogs/new", function(req, res) {
   res.render("new"); 
});

// Create Route
app.post("/blogs", function(req, res) {
    
    Blog.create(req.body.blog, function(err, blog) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/blogs");
        }
    });
});
 
// Show Route
app.get("/blogs/:id", function(req, res) {
    let id = req.params.id;
    Blog.findById(id, function(err, blog) {
       if (err) {
           res.redirect("/blogs");
       } else {
           res.render("show", {blog: blog});
       }
    });
});

// EDIT ROUTE 
app.get("/blogs/:id/edit", function(req, res) {
    Blog.findById(req.params.id, function(err, blog) {
       if (err) {
           res.redirect("/blogs");
       } else {
           res.render("edit", {blog: blog});
       }
    });
});

// UPDATE ROUTE 
app.put("/blogs/:id", function(req, res) {
    
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
       if (err) {
           res.redirect("/blogs");
       } else {
           res.redirect("/blogs/" + req.params.id);
       }
    });
});

// DESTROY ROUTE    
app.delete("/blogs/:id", function(req, res) {
   Blog.findByIdAndRemove(req.params.id, function(err) {
       if (err) {
           res.redirect("/blogs");
       } else {
           res.redirect("/blogs");
       }
   });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Blog app is started");
});