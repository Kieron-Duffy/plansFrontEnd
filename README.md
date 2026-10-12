# InterStellar Web SDK Starter Kit

## Build a new journey

The InterStellar Starter Kit enables quick onboarding to CWA projects using the in-built javascript libraries. It eases the use of UI components, supports
multi-branding, and facilitates maintenance of code to provide a consistent approach to front-end web development.

You can use the Starter Kit to:
- Create multi-branded apps that meet the Design System principles.
- Use Constellation Core to add standardised and brand approved components.
- Get immediate feedback on the UI layout as you develop it with hot reload.
- Adhere to coding standards with in-built linting and formatting checks.

Let's begin.

### 1. Install dependencies

- Run `npm install` to install Node dependencies.

Please note that on Windows this process is very slow. If there is an error that is described as `ACCESS: permission denied` or similar, please run `npm cache clean --force`.

### 2. Creating the first app

- From Visual code studio or the terminal, run `npm run dev` to spin up a webpack dev server hosting the React App. When running in Windows, you can run them from **git bash** or **WSL**. A basic app is launched with Lloyds as the default brand.
- To launch the app with a different brand, run `npm run dev:<brand>` that is npm run dev with brand set to 'lloyds|halifax|bos|mbna|sw', e.g. `npm run dev:halifax`.
- Now run `npm run build` to build out all brands to the dist/ folder.
    - If a base path needs adding to routing, run `BASE_PATH=/<path> npm run build` (e.g. `BASE_PATH=/starter-kit npm run build`)

### 3. Adding components to the app

- The basic app is built using Constellation Core. 
- Please refer to the Constellation documentation for more information on how to use the Constellation Core library to add components to the CWA project.
    - On-Prem (Windows) -> https://pages.ghe.service.group/constellation/docs
- Update the business logic as per your needs.

### 4. Constellation Storybook

- Storybook is a tool for UI development. It makes development faster and easier by isolating components. This allows you to work on one component at a time. 
- The Storybook generates component code, and lets it be copied and pasted into your journey with minimal effort. 
- See the [storybook documentation](https://storybook.js.org/docs/react/get-started/introduction) for more information.
- Now run `npm run constellation:storybook`. This will serve the storybook on port 9001 and open a web browser to it.

### 5. Formatting code to meet coding standards 

- Run `npm run lint` to get a list of linting errors and/or warnings from ESlint.
- If there are errors listed, then run `npm run lint:fix` to automatically fix errors, where possible.
- Run `npm run format` to get a list of code formatting errors and/or warnings from Prettier.
- If there are errors listed, then run `npm run format:fix` to automatically fix errors, where possible.

### 6. Routing

- User can navigate between Home and About Us page.
- User will be navigated to Not found page if user tries to navigate to unknown path.
- Update the routing logic as per the requirements.

### 7. Brand Specific Content

- User has the capability to provide different content for different brand.
- Lloyds bank can have different images, links and content relevant to Lloyds bank whereas other banks can have different images, link and content relevant to them.

#### How to Achieve Brand Specific Content
- Under journey a content folder is available which contains _base folder for common content.
- _base folder contains content for each component of the journey.
- content folder contains folder specific to each brands where user can override the common content to brand specific content. 

Now, let's explore how to test the new journey with the Test Suite to validate the feature functionality and improve code quality. See Test the new journey for more details.

### 8. Plugin Architecture 

- User has the capability to generate different builds for gcp and fmo.
- User can write their own commands and override the existing commands.
- User can extends the existing commands without overriding the commands.

### How to Achieve Different Builds
- Under journey interstellar.config.ts file we can pass different properties (presets, commands and extends).
- Preset can contain value for gcp(@interstellar/gcp-preset-config) or fmo(@interstellar/fmo-preset-config).
- Command section can be used to add or override an existing command.
- Extend section can be used to add or extend an existing command.

## Performance Issue in Windows
* On Windows, it takes a couple of minutes for Visual Studio Code to load the Typescript "definitions", therefore autocompletion won't work straight after launching it. After all the definitions are loaded, however, autocompletion will be available