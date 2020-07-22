/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path');
const fs = require('fs');
console.log('--------------- Starting Gatsby, build config last updated on 4/24/2020.');
// You can delete this file if you're not using it
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    graphql(
      `
        {
          allWordpressPage {
            edges {
              node {
                id
                slug
                status
                template
                wordpress_parent
              }
            }
          }
        }
      `
    )
      .then(result => {
        if (result.errors) {
          console.log("XXXXXX -- error on: PAGENAME");
          console.error(result.errors);
          reject(result.errors);
        }

        const pageTemplate = path.resolve('./src/templates/page.js');
        const landingPageTemplate = path.resolve('./src/templates/landing-pages.js');
        result.data.allWordpressPage.edges.forEach(({ node: page }) => {
          console.log("building page:", page.slug);
          if (fs.existsSync(path.resolve(`./src/pages/${page.slug}.js`))) {
            return;
          }
          if (page.slug === 'home') {
            // The slug for the homepage is "home", which doesn't match "index"
            // So we need this special check
            // All other page slugs / ${page}.js names should match as a rule.
            return;
          }
          createPage({
            path: `/${page.slug}/`,
            component: page.wordpress_parent === 2279 ? landingPageTemplate : pageTemplate,
            context: {
              id: page.id,
            },
          });
        });
      })
      .then(() => {
        return graphql(`
          {
            allWordpressWpWork {
              edges {
                node {
                  id
                  wordpress_id
                  slug
                  status
                  type
                  work_category
                }
              }
            }
          }
        `);
      })
      .then(result => {
        if (result.errors) {
          console.log("XXXXXX -- error on: PAGENAME");
          console.error(result.errors);
          reject(result.errors);
        }
        
        const workDetailTemplate = path.resolve(
          './src/templates/work-detail.js'
        );
        const caseStudyTemplate = path.resolve(
          './src/templates/case-study.js'
        );
        result.data.allWordpressWpWork.edges.forEach(({ node: page }) => {
          console.log("building work:", page.slug);
          if (fs.existsSync(path.resolve(`./src/pages/${page.slug}.js`))) {
            return;
          }
          const isUncategorized = page.work_category.some(cat => cat === 38);
          createPage({
            path: `/${page.type}/${page.slug}/`,
            component: isUncategorized ? workDetailTemplate : caseStudyTemplate,
            context: {
              id: page.id,
            },
          });
        });
      })
      .then(() => {
        return graphql(`
          {
            allWordpressPost {
              edges {
                node {
                  id
                  slug
                  acf {
                    internal_external
                  }
                }
              }
            }
          }
        `);
      })
      .then(result => {
        if (result.errors) {
          console.log("XXXXXX -- error on: PAGENAME");
          console.error(result.errors);
          reject(result.errors);
        }
        const newsDetailTemplate = path.resolve(
          './src/templates/news-detail.js'
        );
        result.data.allWordpressPost.edges.forEach(({ node: page }) => {
          console.log("building news:", page.slug);
          if (page.acf.internal_external !== 'internal') return;
          createPage({
            path: `/news/${page.slug}`,
            component: newsDetailTemplate,
            context: {
              id: page.id,
            },
          });
        });
        resolve();
      });
  });
};

exports.onCreateWebpackConfig = ({
  stage,
  loaders,
  actions,
}) => {
  let loader = 'imports-loader?this=>window,fix=>module.exports=0';
  if (stage === 'build-html') loader = loaders.null();
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: require.resolve('snapsvg/dist/snap.svg.js'),
          use: loader,
        },
      ],
    },
    resolve: {
      alias: {
        snapsvg: 'snapsvg/dist/snap.svg.js',
      },
    },
  });
};
