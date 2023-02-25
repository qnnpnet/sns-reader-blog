module.exports = {
  siteMetadata: {
    title: "알림 읽어줘 (Read SNS to Me)",
    author: `Bongjoo Seo`,
    description: `안드로이드 앱 "알림 읽어줘" 에 대한 설명 제공`,
    siteUrl: `https://sns-reader.netlify.com/`,
    social: {
      twitter: `qnnpnet`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `G-10Z4G5YTXD`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `알림 읽어줘`,
        short_name: `알림 읽어줘`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/gatsby-icon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,

        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  // 사이트 주소(post 주소포함)에 한글이 있는경우 encodeURI을 사용합니다.
                  // slug는 사이트의 post주소을 이름으로 씁니다. gatsby-node.js와 연관 있습니다.
                  url: encodeURI(site.siteMetadata.siteUrl + node.fields.slug),
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ "content:encoded": node.html }],
                })
              })
            },
            query: `
            {
              allMarkdownRemark(
                sort: { order: DESC, fields: [frontmatter___date] },
              ) {
                nodes {
                  excerpt
                  html
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    date
                  }
                }
              }
            }
          `,
            // 최종 rss feed파일 입니다. 디렉토리가 다르거나, 이름이 다른경우 설정 가능합니다.
            output: "/rss.xml",
            // 본인의 blog rss feed용 타이틀을 명시합니다.
            title: "Your Site's RSS Feed",
            // optional configuration to insert feed reference in pages:
            // if `string` is used, it will be used to create RegExp and then test if pathname of
            // current page satisfied this regular expression;
            // if not provided or `undefined`, all pages will have feed reference inserted
            // 전체 site주소에서 특정 주소 패턴만 rss feed생성해주는 부분입니다. 옵션널한 설정으로, 전체 사이트 rss시에는 제거해도 무방합니다.
            match: "^/blog/",
            // optional configuration to specify external rss feed, such as feedburner
            // feedburner같은 외부 rss feed서비스 사용시에 씁니다. 미사용시 제거합니다.
            link: "https://feeds.feedburner.com/gatsby/blog",
          },
        ],
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
  trailingSlash: `always`,
}
