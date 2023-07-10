const dummy = (blogs) => 1;
const totalLikes = (blogs) =>
    blogs.reduce((accumulator, { likes }) => accumulator + likes, 0);
module.exports = {
    dummy,
    totalLikes,
};
