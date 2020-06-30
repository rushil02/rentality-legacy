/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

exports.createPages = async ({ actions: { createPage } }) => {
    const allArticleSlugs = ["tester-house", "hola-test", "test"]
    const allTags = ["hello", "gone", "go", "goa"]
    // Create a page for each Article.
    allArticleSlugs.forEach(articleSlug => {
        createPage({
            path: `/blog/${articleSlug}/`,
            component: require.resolve("./src/templates/blog/SingleBlogTemplate.js"),
            context: { articleSlug },
        })
    })

    allTags.forEach(tagTitle => {
        createPage({
            path: `/tags/${tagTitle}/`,
            component: require.resolve("./src/templates/blog/TagRelatedBlogsTemplate.js"),
            context: { tagTitle },
        })
    })
}
