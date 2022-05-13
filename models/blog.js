const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
    city: String,
    description: String
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = {
    insert: function (blog) {
        const blogDoc = new Blog(blog);
        return blogDoc.save();
    },

    getBlogs: function (cityName) {
        return Blog.find({ city: cityName });
    }
};

