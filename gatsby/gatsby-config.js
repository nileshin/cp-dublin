module.exports = {
  siteMetadata: {
    title: `Connelly Partners`,
    description: `An Integrated Agency`,
    author: `@connellyagency`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `ConnellyPartners.com`,
        short_name: `CP.com`,
        description: `An Integrated Agency`,
        start_url: `/`,
        background_color: `#fafafa`,
        theme_color: `#b18925`,
        display: `browser`,
        icon: `src/images/cp-logo.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        includedRoutes: [
          `**/*/pages`,
          `**/*/media`,
          `**/cp/v1/menus`
        ],
        baseUrl: `dev-cp-com-3.pantheonsite.io`,
        protocol: `https`,
        useACF: true
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
}
