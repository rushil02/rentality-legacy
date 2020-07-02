import axios, { handleError } from "core/utils/serviceHelper"
import { reverse } from "named-urls"
import { APIRoutes } from "components/routes"

export function getPopularArticles() {
    return new Promise(function (resolve, reject) {
        axios
            .get(reverse(APIRoutes.blog.popularArticles))
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export function getLatestArticles() {
    return new Promise(function (resolve, reject) {
        axios
            .get(reverse(APIRoutes.blog.latestArticles))
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export function getPopularTags() {
    return new Promise(function (resolve, reject) {
        axios
            .get(reverse(APIRoutes.blog.popularTags))
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export function getArticle(slug) {
    return new Promise(function (resolve, reject) {
        axios
            .get(reverse(APIRoutes.blog.articleBySlug, { slug: slug }))
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export function getRelatedArticles(relatedTag) {
    return new Promise(function (resolve, reject) {
        axios
            .get(reverse(APIRoutes.blog.tagRelatedArticles), { params: { tag: relatedTag } })
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}
