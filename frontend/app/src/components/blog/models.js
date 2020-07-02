import APIModelAdapter from "core/utils/ModelHelper"

export class LatestArticleInfo extends APIModelAdapter {
    fieldMap() {
        return {
            title: { key: "title" },
            abstract: { key: "abstract" },
            priority: { key: "priority" },
            thumbnail: { key: "thumbnail" },
            thumbnailAltTags: { key: "thumbnail_alt_tags" },
            createDate: { key: "create_time", parser: this.parseDate },
            updateDate: { key: "update_time", parser: this.parseDate },
            tags: { key: "tags" },
            slug: { key: "slug" },
        }
    }
    parseDate(dateStr) {
        return new Date(dateStr)
    }
}

export class PopularArticleInfo extends APIModelAdapter {
    fieldMap() {
        return {
            title: { key: "title" },
            abstract: { key: "abstract" },
            priority: { key: "priority" },
            thumbnailSmall: { key: "thumbnail_small" },
            thumbnailLarge: { key: "thumbnail_large" },
            thumbnailAltTags: { key: "thumbnail_alt_tags" },
            createDate: { key: "create_time", parser: this.parseDate },
            updateDate: { key: "update_time", parser: this.parseDate },
            tags: { key: "tags" },
            slug: { key: "slug" },
        }
    }
    parseDate(dateStr) {
        return new Date(dateStr)
    }
}

export class Article extends APIModelAdapter {
    fieldMap() {
        return {
            title: { key: "title" },
            keywords: { key: "keywords" },
            description: { key: "description" },
            abstract: { key: "abstract" },
            content: { key: "content" },
            slug: { key: "slug" },
            thumbnail: { key: "thumbnail" },
            thumbnailAlt: { key: "thumbnail_alt" },
            createDate: { key: "create_time", parser: this.getDate },
            updateDate: { key: "update_date", parser: this.getDate },
            tags: { key: "tags" },
        }
    }

    getDate(dateTimeString) {
        let date = new Date(dateTimeString)
        return date.getDate() + "." + date.getMonth() + 1 + "." + date.getFullYear()
    }
}

export class Tag extends APIModelAdapter {
    //Declare all defaults here

    fieldMap() {
        return { title: { key: "verbose" } }
    }
}
