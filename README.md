# Digital Engagement Sandbox

This repository can be used for NextGen feature development by the Digital Engagement team. We will be using the [Package Development Model](#package-development-model), but the original SFDX readme will temporarily be kept for reference.

## Development Workflow

All work will be tied to issues in TaskRay.

### Get TaskRay Info

To create your feature branch, log in to Salesforce and navigate to the TaskRay issue you are assigned. If you inspect an issue with browser dev tools, you'll be able
to tell the ID of the issue by finding the CSS ID of the task's `<div>` tag container.

<img width="600" alt="Finding TaskRay Issue ID" src="https://github.com/CUCentralAdvancement/sf-digitaleng-sandbox/blob/master/docs/images/find-taskray-id.png">

You can now link to that specific URL by using a specific URL parameter. Since the ID in this case is `a0R5x000009jAYPEA2`, the link to this particular issue will look
like: https://cuadvancement.lightning.force.com/apex/TASKRAY__trtaskboard?taskid=a0R5x000009jAYPEA2.

### Create Feature Branch

It is typical to create feature branches with the issue number attached to them. For GitFlow, the branch name will start with "feature" to denote it from a bug, release,
or hotfix branch. This example will use the TaskRay ID gathered in the previous step.

```bash
# Create feature branch.
git checkout -b feature/a0R5x000009jAYPEA2

# Delete local branch if you made a mistake or want to rename.
git branch -D feature/a0R5x000009jAYPEA2
```

Now you will do the work needed to complete the issue requirements. Documentation for best practices on how to do that will live elsewhere. Once you are ready to commit
changes, move onto the next step.

### Working With Scratch Orgs

...

### Adding Tests?

Adding tests can be questionable based on the work you need to do to finish your issue. Salesforce is a closed system and they test their UI and associated features
internally. Technically, you should only test code you write.

So if you write Apex code, web components, or a React-based Visualforce component, then you definitely should write tests. If you are just creating and moving config
and metadata around, you might not need to write tests. Automated browser-based tests can go through the same workflow an actual user would go through, but those tests
are very brittle and can take up more time to maintain than you'll actually spend developing features.

Writing tests will be covered in another document.

### Create Pull Request And Kickoff CI

When you create a PR (pull request) to this GitHub repository, it will kick off a series of automated checks before the PR is approved for manual review. If the automated
tests fail, then you need to update your code before anyone else will review it.

```bash
# Look at the files you will be commiting.
git status

# Add all changed/added code.
git add .

# Add only files in a path, e.g. Visualforce pages.
git add force-app/main/default/pages

# Commit staged changes.
git commit -m"my descriptive commit message"

# Push to GitHub using branch name.
git push origin feature/a0R5x000009jAYPEA2

```

You then might see a URL in your terminal that takes you to a page where you can make a PR. If not, GitHub will show the most recently pushed branches on the [project's
homepage](https://github.com/CUCentralAdvancement/sf-digitaleng-sandbox) and provide a link to create a PR.

<img width="800" alt="GitHub Pull Request Link From Command Line" src="https://github.com/CUCentralAdvancement/sf-digitaleng-sandbox/blob/master/docs/images/github-pr-link.png">

...insert more about CI workflow that will come from writing example below...

## Example Workflow

To illistrate this workflow, let's consider adding a custom object for a feature request. How would that move from TaskRay on through being deployed to the production environment?

1. Get TaskRay Info - When I inspected my issue I found the ID to be `a0R2E00000LMA9iUAH`.
1. Create local branch - `git checkout -b feature/a0R2E00000LMA9iUAH`.
1. Create scratch org to test - `sfdx force:org:create -f config/project-scratch-def.json -a feature/a0R2E00000LMA9iUAH`
1. Login to scratch org since this issue is best done via UI config - `sfdx force:org:open -u feature/a0R2E00000LMA9iUAH`
1. Do what I need to do in UI configuration.
1. Potentially write tests for config change via Cypress.
1. Pull down changes from scratch org - `sfdx force:source:pull -u feature/a0R2E00000LMA9iUAH`
1. Commit changes to repo - `git add . && git commit -m"adding order object with needed config"`
1. Push to GitHub and create PR. `git push --set-upstream origin feature/a0R2E00000LMA9iUAH`

---

archived...

This guide helps Salesforce developers who are new to Visual Studio Code go from zero to a deployed app using Salesforce Extensions for VS Code and Salesforce CLI.

## Part 1: Choosing a Development Model

There are two types of developer processes or models supported in Salesforce Extensions for VS Code and Salesforce CLI. These models are explained below. Each model
offers pros and cons and is fully supported.

### Package Development Model

The package development model allows you to create self-contained applications or libraries that are deployed to your org as a single package. These packages are typically developed against source-tracked orgs called scratch orgs. This development model is geared toward a more modern type of software development process that uses org source tracking, source control, and continuous integration and deployment.

If you are starting a new project, we recommend that you consider the package development model. To start developing with this model in Visual Studio Code, see [Package Development Model with VS Code](https://forcedotcom.github.io/salesforcedx-vscode/articles/user-guide/package-development-model). For details about the model, see the [Package Development Model](https://trailhead.salesforce.com/en/content/learn/modules/sfdx_dev_model) Trailhead module.

If you are developing against scratch orgs, use the command `SFDX: Create Project` (VS Code) or `sfdx force:project:create` (Salesforce CLI) to create your project. If you used another command, you might want to start over with that command.

When working with source-tracked orgs, use the commands `SFDX: Push Source to Org` (VS Code) or `sfdx force:source:push` (Salesforce CLI) and `SFDX: Pull Source from Org` (VS Code) or `sfdx force:source:pull` (Salesforce CLI). Do not use the `Retrieve` and `Deploy` commands with scratch orgs.

### Org Development Model

The org development model allows you to connect directly to a non-source-tracked org (sandbox, Developer Edition (DE) org, Trailhead Playground, or even a production org) to retrieve and deploy code directly. This model is similar to the type of development you have done in the past using tools such as Force.com IDE or MavensMate.

To start developing with this model in Visual Studio Code, see [Org Development Model with VS Code](https://forcedotcom.github.io/salesforcedx-vscode/articles/user-guide/org-development-model). For details about the model, see the [Org Development Model](https://trailhead.salesforce.com/content/learn/modules/org-development-model) Trailhead module.

If you are developing against non-source-tracked orgs, use the command `SFDX: Create Project with Manifest` (VS Code) or `sfdx force:project:create --manifest` (Salesforce CLI) to create your project. If you used another command, you might want to start over with this command to create a Salesforce DX project.

When working with non-source-tracked orgs, use the commands `SFDX: Deploy Source to Org` (VS Code) or `sfdx force:source:deploy` (Salesforce CLI) and `SFDX: Retrieve Source from Org` (VS Code) or `sfdx force:source:retrieve` (Salesforce CLI). The `Push` and `Pull` commands work only on orgs with source tracking (scratch orgs).

## The `sfdx-project.json` File

The `sfdx-project.json` file contains useful configuration information for your project. See [Salesforce DX Project Configuration](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_ws_config.htm) in the _Salesforce DX Developer Guide_ for details about this file.

The most important parts of this file for getting started are the `sfdcLoginUrl` and `packageDirectories` properties.

The `sfdcLoginUrl` specifies the default login URL to use when authorizing an org.

The `packageDirectories` filepath tells VS Code and Salesforce CLI where the metadata files for your project are stored. You need at least one package directory set in your file. The default setting is shown below. If you set the value of the `packageDirectories` property called `path` to `force-app`, by default your metadata goes in the `force-app` directory. If you want to change that directory to something like `src`, simply change the `path` value and make sure the directory you’re pointing to exists.

```json
"packageDirectories" : [
    {
      "path": "force-app",
      "default": true
    }
]
```

## Part 2: Working with Source

For details about developing against scratch orgs, see the [Package Development Model](https://trailhead.salesforce.com/en/content/learn/modules/sfdx_dev_model) module on Trailhead or [Package Development Model with VS Code](https://forcedotcom.github.io/salesforcedx-vscode/articles/user-guide/package-development-model).

For details about developing against orgs that don’t have source tracking, see the [Org Development Model](https://trailhead.salesforce.com/content/learn/modules/org-development-model) module on Trailhead or [Org Development Model with VS Code](https://forcedotcom.github.io/salesforcedx-vscode/articles/user-guide/org-development-model).

## Part 3: Deploying to Production

Don’t deploy your code to production directly from Visual Studio Code. The deploy and retrieve commands do not support transactional operations, which means that a deployment can fail in a partial state. Also, the deploy and retrieve commands don’t run the tests needed for production deployments. The push and pull commands are disabled for orgs that don’t have source tracking, including production orgs.

Deploy your changes to production using [packaging](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_dev2gp.htm) or by [converting your source](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference_force_source.htm#cli_reference_convert) into metadata format and using the [metadata deploy command](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference_force_mdapi.htm#cli_reference_deploy).
