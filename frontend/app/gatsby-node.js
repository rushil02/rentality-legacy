const axios = require("axios")

require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
})

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

exports.createPages = async ({actions: {createPage}}) => {
    try {
        const allArticles = await axios.get(`http://web:8000/blog/all-articles/${process.env.INTERNAL_ACCESSOR}`)
        const allTagsAndArticles = await axios.get(`http://web:8000/blog/all-tags-and-articles/${process.env.INTERNAL_ACCESSOR}`)
        const allSEOHouses = await axios.get(`http://web:8000/property/all-seo-houses/${process.env.INTERNAL_ACCESSOR}`)

        allArticles.data.forEach(article => {
            createPage({
                path: `/blog/${article.slug}`,
                component: require.resolve("./src/templates/blog/SingleBlogTemplate.js"),
                context: {article},
            })
        })

        allTagsAndArticles.data.forEach(tagAndArticles => {
            createPage({
                path: `/blog/tag/${slugify(tagAndArticles.verbose)}`,
                component: require.resolve("./src/templates/blog/TagRelatedBlogsTemplate.js"),
                context: {tagAndArticles},
            })
        })

        allSEOHouses.data.forEach(house => {
            createPage({
                path: `/apply/info1/${slugify(house.uuid)}`,
                component: require.resolve("./src/templates/apply/HouseInfo.js"),
                context: {house},
            })
        })

    } catch (e) {
        console.info(e)
        throw e
    }
}
