# Apiary Project: project_name

## Creating a new project (Delete this section)

- Replace instances of `project_name` with your project's title
- Update `index.html` with your project's title, favicon, etc
- Update the logo file in `/public`
- Update `tailwind.config.js` with your project's theme configuration (colors, fonts, etc)
- Change any defaults in `global/default.css`
- (Optional) Create deployment buckets in AWS for Production and for Storybook, update links below with those URLs
  - - Add secrets to the github repo to support the github actions for deploying both sites
  - - Update the deploy actions to use the correct buckets and cloudfront distributions
- The `package.json` contains a lot of dependencies that are commonly used in these projects; Feel free to delete or add any that are likely to pop up in this project.

## Getting Started

Cloning the repository:

```
git clone git@github.com:tripleten-externships/frontend-template.git
```

!!!IMPORTANT Make sure to install dependencies before making any code changes. This repository utilizes git-hooks which must be installed using npm before they will function.

Install:

```
npm install
```

Running the application:

```
npm run dev
```

Running tests:

```
npm run test
```

## Deployments

- [Production]()
- [Storybook]()

## Contributing

### No Commits To Main

Contributors are not allowed to commit directly to `main`. This rule is enforced using git hooks. Instead, you must create a new branch off of `main` using the following naming pattern:

```
Pattern:"/^(master|main|develop){1}$|^(feature|fix|hotfix|release)\/.+$/g"
```

Example:
`feature/my-dev-task`

### Commit messages

If your commit message does not conform to the correct pattern, you will receive an error message like the following:

```
  ************* Invalid Git Commit Message **************
  commit message: Added husky git hooks
  correct format: <type>[scope]: <subject>
  example: docs: update README to add developer tips

  type:
    feat     A new feature.
    fix      A bug fix.
    docs     Documentation only changes.
    style    Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc).
    refactor A code change that neither fixes a bug nor adds a feature.
    test     Adding missing tests or correcting existing ones.
    chore    Changes to the build process or auxiliary tools and libraries such as documentation generation.
    perf     A code change that improves performance.
    ci       Changes to your CI configuration files and scripts.
    build    Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm).
    temp     Temporary commit that won't be included in your CHANGELOG.

  scope:
    Optional, can be anything specifying the scope of the commit change.
    For example $location, $browser, $compile, $rootScope, ngHref, ngClick, ngView, etc.
    In App Development, scope can be a page, a module or a component.

  subject:
    Brief summary of the change in present tense. Not capitalized. No period at the end.
```

## Helpful Resources

This project uses the following key libraries

- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/docs/installation)
- [Tailwind Components](https://tailwindui.com/components)
- [Headless UI](https://headlessui.com/)
- [Vite JS](https://vitejs.dev/)
- [Storybook JS](https://storybook.js.org/)
- [Testing Cheatsheet](https://testing-library.com/docs/react-testing-library/cheatsheet)
- [Testing Cheatsheet #2](https://vitest.dev/api/)
- [Zuztand](https://zustand.docs.pmnd.rs/getting-started/introduction)

## Deployment

The project is configured to deploy automatically using GitHub Actions whenever a commit is made to `main`. This workflow is triggered by merging a Pull Request.
