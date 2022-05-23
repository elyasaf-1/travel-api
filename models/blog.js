const mongoose = require("mongoose");
const image = require("../scraping/image/image");
const {translate} = require("../helper");

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

    getBlogs: async function (cityName) {
        const engName = await translate(cityName);
        return Blog.find({ city: cityName }).then(async (blogs) => {
            const img = await image.get(engName);

            blogs = blogs.slice(0, 6);

            const blogsToSend = blogs.map((blog) => {
                return {city: blog.city, description: blog.description, img: img};
            })
            return blogsToSend;
        });
    }
};

