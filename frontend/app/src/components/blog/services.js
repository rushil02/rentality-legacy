import axios from "core/utils/serviceHelper"
import { reverse } from "named-urls"
import { APIRoutes } from "components/routes"

export function getPopularArticles(paginationStart, paginationEnd) {
    return new Promise(function (resolve, reject) {
        axios
            .get(reverse(APIRoutes.blog.popularArticles), {
                params: { "pagination-start": paginationStart, "pagination-end": paginationEnd },
            })
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

export function getSearchArticles(value) {
    return new Promise(function (resolve, reject) {
        axios
            .get(reverse(APIRoutes.search.blog), { params: { q: value } })
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}
