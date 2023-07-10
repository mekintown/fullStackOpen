const dummy = (blogs) => 1;

const totalLikes = (blogs) =>
    blogs.reduce((accumulator, { likes }) => accumulator + likes, 0);

const favoriteBlog = (blogs) =>
    blogs.reduce((max, blog) => (max.likes > blog.likes ? max : blog));
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
};
