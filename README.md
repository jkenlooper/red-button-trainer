# Red Button Trainer

[red-button-trainer.weboftomorrow.com](http://red-button-trainer.weboftomorrow.com/)

Production grade <b style="color:red;text-transform:uppercase;">red button</b> training for business critical applications.

Implementations will be done using the following technologies. These are all
within the `apps/` directory.

- Plain Javascript
- LitElement
- Alpine.js
- Vue.js
- React
- Angular

All implementations will share some common code which is in the `libs/` directory.

---

**[Change log](CHANGELOG.md)**

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

[![code style: prettier](https://img.shields.io/badge/code%20style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

## Development

Requires node.js 14, npm, and make to run the build scripts. It is recommended
to use nvm to select the right node.js version.

```bash
npm install;
npm start;
```

## Deployment

This projects uses GitHub Actions to deploy to GitHub Pages as a static site.
A separate gh-pages branch exists that is used for the trigger. Any commits
pushed to that branch will commit all dist files needed for the static site.

Steps to deploy changes:

1. Create a release or hotfix branch off of development. Branch name should
   start with 'release/' or 'hotfix/'.

2. Use `npm version` command to bump the version in the package.json files.
   Example for doing a patch would be `npm version patch`. This will pull up
   your editor to update the CHANGELOG.md file and commits the change afterward.

3. Merge release or hotfix branch to production branch. Merge the production
   branch to gh-pages branch and push to origin. A GitHub Action is triggered
   when gh-pages is updated. This will trigger the
   [GitHub pages deploy action](.github/workflows/github-pages-deploy.yml)
   which will update the static site. Cache-Control is at the mercy of GitHub
   Pages which is typically 10 minutes.
