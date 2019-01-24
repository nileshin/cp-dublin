/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path');
const fs = require('fs');

// You can delete this file if you're not using it
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
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
              }
            }
          }
        }
      `
    ).then(result => {
      if (result.errors) {
        console.error(result.errors)
        reject(result.errors)
      }

      const pageTemplate = path.resolve('./src/templates/page.js')
      result.data.allWordpressPage.edges.forEach(({ node: page }) => {
        if (fs.existsSync(path.resolve(`./src/pages/${page.slug}.js`))) {
          return;
        }
        createPage({
          path: `/${page.slug}/`,
          component: pageTemplate,
          context: {
            id: page.id,
          },
        })
      })
      resolve()
    })
  })
}
