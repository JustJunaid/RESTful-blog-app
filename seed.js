function seedDB() {
    
    let Blog   = require("./blogs");
    
    Blog.create({
        title: "Blog 1",
        image: "https://images.pexels.com/photos/53603/bedroom-architectural-interior-lifestyle-53603.jpeg?auto=compress&cs=tinysrgb&h=350",
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }, function(err, blog) {
        if (err) {
            console.log(err);
        } else {
            console.log(blog);
            console.log("blog created");
        }
    });
}

module.exports = seedDB;