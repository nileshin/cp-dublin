const wordpressNormalizer = require('./wordpress-normalizer');
require('dotenv').config();

const branch_name = (() => {
  const branch_name = process.env.BRANCH;
  if (!branch_name) {
    console.log('no branch found, defaulting to dev');
    return 'dev';
  }
  if (branch_name === 'master') {
    console.log('deploying master, setting to live');
    return 'live';
  }
  return branch_name;
})();

const pantheon_environment_url = `${branch_name}-cp-com-3.pantheonsite.io`;

console.log(`Building from Pantheon env: ${pantheon_environment_url}`);

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
        component: require.resolve(`./src/components/layout.js`),
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-svgr`,
      options: {
        include: /_global/,
      },
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
          `**/*/taxonomies`,
          `**/*/pages`,
          `**/*/media`,
          `**/*/work`,
          `**/*/people`,
          `**/*/location`,
          `**/*/posts`,
          `**/*/categories`,
          `**/*/jobs`,
          `**/*/job-location`,
          `**/cp/v1/menus`,
          `**/cp/v1/instagram_widget`,
        ],
        baseUrl: pantheon_environment_url,
        protocol: `https`,
        useACF: true,
        searchAndReplaceContentUrls: {
          sourceUrl: `https://${pantheon_environment_url}`,
          replacementUrl: '', // todo: swap this from loco to prod based on brach/netlify env var
        },
        normalizer: wordpressNormalizer,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
};
