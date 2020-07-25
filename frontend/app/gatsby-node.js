const axios = require("axios")

function getAllArticles() {
    return new Promise(function (resolve, reject) {
        axios
            .get("http://web:8000/blog/all-articles")
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

function getAllTagsAndArticles() {
    return new Promise(function (resolve, reject) {
        axios
            .get("http://web:8000/blog/all-tags-and-articles")
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

function slugify(verbose) {
    return verbose
        .toString()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "")
        .replace(/--+/g, "-")
}

exports.createPages = async ({ actions: { createPage } }) => {
    const allArticles = await getAllArticles()
    const allTagsAndArticles = await getAllTagsAndArticles()

    // Create a page for each Article.
    allArticles.forEach(article => {
        createPage({
            path: `/blog/${article.slug}`,
            component: require.resolve("./src/templates/blog/SingleBlogTemplate.js"),
            context: { article },
        })
    })

    allTagsAndArticles.forEach(tagAndArticles => {
        createPage({
            path: `/blog/tag/${slugify(tagAndArticles.verbose)}`,
            component: require.resolve("./src/templates/blog/TagRelatedBlogsTemplate.js"),
            context: { tagAndArticles },
        })
    })
}
