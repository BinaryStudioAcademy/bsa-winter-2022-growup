<h1 align="center">
  Grow Up
</h1>

### Requirements:

- NodeJS (16.x.x);
- NPM (8.x.x);
- PostgreSQL (13.x);

## Code quality
Static analyzers are used for both frontend and backend projects to ensure basic code quality. Additionally, [quality criteria](https://github.com/BinaryStudioAcademy/quality-criteria/blob/production/source/javascript.md) rules are enforced during code review and audit.

## Commits
This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification

## Branches
In this project we follow with [Pull Request process](https://help.github.com/en/articles/about-pull-requests). Two main branches are protected with a [Github branch protection rules](https://help.github.com/en/articles/defining-the-mergeability-of-pull-requests):

- `master`: Require pull request with 3 reviews before merging
- `develop`: Require pull request with 2 review before merging

Normal flow is to create new branch for each task or group of linked tasks. Name of branch **must** have next structure:

`<prefix>/<problem-name>`

Allowed prefixes: `new/`, `patch/`, `fix/`.  
Problem name it's a text summary of problem or ticket id.

Examples:

- `fix/user-profile-avatar`
- `fix/#543`
- `patch/button-styles`

After task is completed ― create PR of your branch into `develop` and assign two other developers to review. Assign one _student_ and one _coach_.

## 🗂 Shared

This [folder](./shared) contains all common (helpers, enums and etc.) stuff for other applications (backend, frontend and etc.).

## ⚙️ BackEnd

For the [BackEnd](./backend) to work properly, you need to fill in the **`.env`** file. You can use the **`.env.example`** file as an example.

## 💡 FrontEnd

For the [FrontEnd](./frontend) to work properly, you need to fill in the **`.env`** file. You can use the **`.env.example`** file as an example.

## 🏃‍♂️ Simple start

1. **`npm run install:all`** at the root
2. Fill ENVs
3. **`npm run start:dev`** at the root
