const _ = require("lodash");

const dummy = (blogs) => 1;

const totalLikes = (blogs) =>
    blogs.reduce((accumulator, { likes }) => accumulator + likes, 0);

const favoriteBlog = (blogs) => {
    const favorite = blogs.reduce((max, blog) =>
        max.likes > blog.likes ? max : blog
    );
    return {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes,
    };
};

const mostBlogs = (blogs) => {
    const authorWithMostBlogs = _(blogs)
        .countBy("author")
        .toPairs()
        .maxBy(_.last);

    return {
        author: authorWithMostBlogs[0],
        blogs: authorWithMostBlogs[1],
    };
};

const mostLikes = (blogs) => {
    const authorWithMostLikes = _(blogs)
        .groupBy("author")
        .map((authorBlogs, author) => ({
            author,
            likes: _.sumBy(authorBlogs, "likes"),
        }))
        .maxBy("likes");

    return authorWithMostLikes;
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
};
