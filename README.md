# ConnellyPartners.com 3

Wordpress (Pantheon) + [Gatsby](https://gatsbyjs.org) powered statically generated site.

## Local Setup

1. Check out the cp-com-3 project from Gitlab (`git clone git@git.connellydigital.com:cp/cp-com-3.git`)
2. Open Terminal and navigate to the repository
3. Create and switch to your own branch (based on the `dev` branch): `git checkout -b [your branch name] dev`
4. `cd gatsby`
5. Install (globally) the Gatsby CLI: `npm install -g gatsby-cli`
6. Install npm dependencies: `npm install`
7. add `./gatsby/.env` and update it with:

    BRANCH=dev

Replace `dev` with whatever environment on pantheon you want to read from

8. run `gatsby develop`
9. After the site builds, `http://localhost:8000` should be available to view the site.
  - `https://localhost:8000/__graphql` will have a GraphiQL application to test queries
10. Make changes, and push to GitLab
11. Netlify will build changes to a Branch Deploy
12. Make a pull request to merge branches, Netlify will also build a preview branch for that pull request.

## Folder Setup (Recommended)

This repo includes a `gatsby/` folder with the front-end source files.

If the backend code needs to be updated. Clone it from pantheon into this folder (just to keep both parts of the site together). The folders `cms/` and `wordpress/` are gitignored if you want to use those. You can still use `lando` in the subfolder as well to use a local copy of Wordpress as the source during dev.

## Gatsby Config

TBD

## Branch Config

Three branches, `dev`, `test`, `master`, track to `dev`, `test`, and `live` on pantheon, and `dev--`, `test--` and production branches on Netlify (cp-com-3.netlify.com)

Additionally, other branches will be built into their own Branch Deploys on Netlify. Currently these branches must be explicitly stated in Netlify site settings. Current branches are `swashington`, `mlee`, and `ewebster`

## Reading data

Currently the site reads from the dev Pantheon site (https://dev-cp-com-3.pantheonsite.io). This should be updated with Environment Variables set in Netlify to determine which environment to build from.