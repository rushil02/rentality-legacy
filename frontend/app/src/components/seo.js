/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ description, lang, meta, title, microdata, pathname, image: metaImage, metaImageAlt, metaOgType }) {
    const { site } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                        description
                        author
                        siteUrl
                    }
                }
            }
        `
    )
    // FIXME
    // const logo = useStaticQuery(graphql`
    //     query {
    //         fileName: file(relativePath: { eq: "src/images/gatsby-icon.png" }) {
    //             childImageSharp {
    //                 fluid(maxWidth: 400, maxHeight: 250) {
    //                     ...GatsbyImageSharpFluid
    //                 }
    //             }
    //         }
    //     }
    // `)

    const metaDescription = description || site.siteMetadata.description
    const canonical = pathname ? `${site.siteMetadata.siteUrl}${pathname}` : null
    const image = metaImage && metaImage.src ? `${site.siteMetadata.siteUrl}${metaImage.src}` : null
    const imageAlt = metaImageAlt || site.siteMetadata.imageAlt
    const ogType = "website" || metaOgType
    // console.log(logo, image)

    return (
        <Helmet
            htmlAttributes={{
                lang,
            }}
            title={title}
            titleTemplate={`%s`}
            link={
                canonical
                    ? [
                          {
                              rel: "canonical",
                              href: canonical,
                          },
                      ]
                    : []
            }
            meta={[
                {
                    name: `description`,
                    content: metaDescription,
                },
                {
                    property: `og:site_name`,
                    content: `Rentality`,
                },
                {
                    property: `og:locale`,
                    content: `en_US`,
                },
                {
                    property: `og:url`,
                    content: canonical,
                },
                {
                    property: `og:title`,
                    content: title,
                },
                {
                    property: `og:description`,
                    content: metaDescription,
                },
                {
                    property: `og:type`,
                    content: ogType,
                },
                {
                    name: `twitter:card`,
                    content: `summary`,
                },
                {
                    name: `twitter:title`,
                    content: title,
                },
                {
                    name: `twitter:site`,
                    content: `@twitusername`,
                },
                {
                    name: `twitter:url`,
                    content: canonical,
                },
                {
                    name: `twitter:description`,
                    content: metaDescription,
                },
            ]
                .concat(
                    metaImage
                        ? [
                              {
                                  property: "og:image",
                                  content: image,
                              },
                              {
                                  property: "og:image:width",
                                  content: metaImage.width,
                              },
                              {
                                  property: "og:image:height",
                                  content: metaImage.height,
                              },
                              {
                                  property: "og:image:alt",
                                  content: imageAlt,
                              },
                              {
                                  name: "twitter:card",
                                  content: "summary_large_image",
                              },
                              {
                                  name: "twitter:image:alt",
                                  content: imageAlt,
                              },
                          ]
                        : [
                              {
                                  name: "twitter:card",
                                  content: "summary",
                              },
                          ]
                )
                .concat(meta)}
        >
            {microdata ? <script type="application/ld+json">{microdata}</script> : null}
        </Helmet>
    )
}

SEO.defaultProps = {
    lang: `en`,
    meta: [],
    description: ``,
}

SEO.propTypes = {
    description: PropTypes.string,
    lang: PropTypes.string,
    meta: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.string.isRequired,
    image: PropTypes.shape({
        src: PropTypes.string.isRequired,
        height: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
    }),
    pathname: PropTypes.string,
}

export default SEO
