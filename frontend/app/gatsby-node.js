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

exports.createPages = async ({ actions: { createPage } }) => {
    try {
        const allArticles = await axios.get(`http://web:8000/blog/all-articles/${process.env.INTERNAL_ACCESSOR}`)
        const allTagsAndArticles = await axios.get(
            `http://web:8000/blog/all-tags-and-articles/${process.env.INTERNAL_ACCESSOR}`
        )
        const allSEOHouses = await axios.get(`http://web:8000/property/all-seo-houses/${process.env.INTERNAL_ACCESSOR}`)
        const allPolicies = await axios.get(`http://web:8000/ess/all-policies/${process.env.INTERNAL_ACCESSOR}`)

        allArticles.data.forEach(article => {
            createPage({
                path: `/blog/${article.slug}`,
                component: require.resolve("./src/templates/blog/SingleBlogTemplate.js"),
                context: { article },
            })
        })

        allTagsAndArticles.data.forEach(tagAndArticles => {
            createPage({
                path: `/blog/tag/${slugify(tagAndArticles.verbose)}`,
                component: require.resolve("./src/templates/blog/TagRelatedBlogsTemplate.js"),
                context: { tagAndArticles },
            })
        })

        allSEOHouses.data.forEach(house => {
            createPage({
                path: `/apply/info/${slugify(house.uuid)}`,
                component: require.resolve("./src/templates/apply/HouseInfo.js"),
                context: { house },
            })
        })

        allPolicies.data.forEach(policy => {
            let name
            if (policy.code_name === "PP") {
                name = "privacy-policy"
            } else if (policy.code_name === "CP") {
                name = "cookie-policy"
            } else if (policy.code_name === "ToS") {
                name = "terms-of-service"
            }
            createPage({
                path: `/pages/policy/${name}`,
                component: require.resolve("./src/templates/policy/PolicyTemplate.js"),
                context: { policy },
            })
        })
    } catch (e) {
        console.info(e)
        throw e
    }
}

exports.onCreatePage = async ({ page, actions }) => {
    const { createPage } = actions
    // Only update the `/app` page.
    if (page.path.match(/^\/apply-d/)) {
        // page.matchPath is a special key that's used for matching pages
        // with corresponding routes only on the client.
        page.matchPath = "/apply/info/*"
        // Update the page.
        createPage(page)
    }
}
