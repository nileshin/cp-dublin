const deepMap = require('deep-map');

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
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/layout.js`)
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-svgr`,
      options: {
        include: /_global/
      }
    },
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
          `**/*/work`,
          `**/*/people`,
          `**/cp/v1/menus`,
          `**/cp/v1/instagram_widget`,
        ],
        baseUrl: `dev-cp-com-3.pantheonsite.io`,
        protocol: `https`,
        useACF: true,
        searchAndReplaceContentUrls: {
          sourceUrl: 'https://dev-cp-com-3.pantheonsite.io',
          replacementUrl: '/', // todo: swap this from loco to prod based on brach/netlify env var
        },
        normalizer: ({ entities }) => {
          // Update CTA urls to be root relative
          const updated = deepMap(entities, (value, key) => {
            if (key === 'url') {
              value = value.replace(/https?:\/\/dev-cp-com-3.pantheonsite.io/, '');
              value = value.replace(/https?:\/\/cpcom3.lndo.site/, '');
            }
            return value;
          });

          return updated;
        }
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
};
