# webapp
Web UI Reference Application using TypeScript and Webpack.

Modern web development is complicated. There are a million ways to skin a cat, and the average developer has to worry about many design decisions before they evey start to code. This project is an attempt to capture all my personal design decisions into a single place, so I can easily spin up new web projects when needed.

## Key design decisions
- 100% API driven - server functionality should be in separate project (normally .NET Core web-api)
- Web UI layer to be 100% javascript application
- Use standard modern node build chain, but keep to core well-used components
  - TypeScript (for typed JavaScript)
  - Webpack (for bundling) - https://webpack.js.org/
  - Babel for Transpiling - https://babeljs.io/
  - React used as default component library - https://reactjs.org/
    - Manual setup to keep in full control
  - Jest (for testing) - https://jestjs.io/
- Modern development features
  - Full typeing (TypeScript)
  - Hot Module Loading (HML)
  - Linting
  - Debugging

## Tooling
- VSCode
  - Extension: ESLint Extension (Microsoft)
  - Extension: Markdown All in One (Yu Zhang)
  - Extension: Prettier - Code Formatter (Prettier)
- React Dev Tools: https://reactjs.org/link/react-devtools
  
## Setup
- Initialising the project: `npm init`

### TypeScript
- Installing TypeScript: `npm install typescript --save-dev`
- TypeScript Loader (if not using Babel 7.0): `npm install ts-loader --save-dev`
- Initialising the TypeScript config file: `npx tsc --init`

### WebPack Packages
- Installing npm packages: `npm install webpack webpack-cli webpack-dev-server --save-dev`
- Babel Loader: `npm install babel-loader --save-dev`
- HTML Webpack Plugin: `npm install html-webpack-plugin --save-dev`

### Babel Dependencies
- Babel CLI (to test babel transpilations): `npm install @babel/cli --save-dev`
- Presets: `npm install @babel/core @babel/preset-react @babel/preset-env @babel/preset-typescript --save-dev`

### React Packages
- Runtime packages: `npm install react react-dom`
- Development packages (for Webpack & Babel): `npm install @babel/plugin-transform-react-jsx --save-dev`
- Development types for ReactDom: `npm install @types/react-dom --save-dev`
- Types: `npm install @types/react --save-dev`
- React Router: `npm install react-router-dom`

### CSS loaders
- CSS Webpack loaders: `npm install style-loader css-loader --save-dev`
- Normalize.css: `npm install normalize.css`

### Webpack Configuration

TypeScript can be transpiled in this project in 2 ways:
- Using ts-loader Webpack loader
- Using Babel Webpack loader

The TypeScript transpilation method can be controlled using different npm scripts and webpack config files.
``` js
    "serve:ts": "webpack-dev-server --mode development --config webpack.ts.config.js",
    "serve:babel": "webpack-dev-server --mode development --config webpack.babel.config.js",
```

The Babel version uses the additional `.babelrc` configuration file to control which Babel plugings to use.

The default Webpack configuration file is shown below:

``` js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// Change variable to change names of output files.
let appName = "webapp";

module.exports = {
  entry: { main: path.resolve("./src/index.tsx") },
  devtool: "inline-source-map",
  module: {
    rules: [
      /*
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      */
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: "/node_modules/",
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: `${appName}.js`,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
      filename: `${appName}.html`,
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    hot: true,
    compress: true,
    server: "http",
    open: [`${appName}.html`],
    port: 8080,
  },
};
```

Notes:
- Configuration for development web server included ('devServer')
- Includes rules for TypeScript
- Includes configuration for HtmlWebpackPlugin
- CSS loader, with CSS Modules (local CSS)

### Folder Setup

```
+--\src
|  +--\assets (for static files)
|  +--\components (for business components that are reused in multiple components)
|  +--\routes (top-level components - accessible from a route)
|  +--\style
|  +--\utils (utilities, helpers)
|  +--\widgets (standard UI components, e.g. inputs, controls etc.)
|  +--index.ts (top-level component)
|  +--template.html (HTML5 template)
+--\tests
|  +--component_a.test.js
|  +--component_b.test.js
```

### index.tsx

This file is used to bootstrap React into the DOM:

``` js
import React from "react";
import { createRoot } from 'react-dom/client';
import 'normalize.css';
import './style/index.css';
import App from './components/App';

const container = document.getElementById('root') as Element;
const root = createRoot(container);
root.render(<App />);
```

### Template.html

The following HTML5 template is used:

``` html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <title>Web UI Reference Application</title>
    <!-- <link rel="stylesheet" href="./style/index.css" /> -->
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

### Npm Scripts

The following scripts are added to the `package.json` file:

``` json
    "build": "webpack --mode production --node-env production",
    "build:dev": "webpack --mode development --node-env development",
    "build:prod": "webpack --mode production --node-env production",
    "watch": "webpack --watch",
    "serve": "webpack-dev-server --mode development",
    "serve:dev": "webpack-dev-server --mode development",
    "serve:prod": "webpack-dev-server --mode production",
    "serve:ts": "webpack-dev-server --mode development --config webpack.ts.config.js",
    "serve:babel": "webpack-dev-server --mode development --config webpack.babel.config.js",
    "start": "webpack serve --port 8080 --mode development --open --hot",
    "compile": "tsc",
    "test": "jest --collectCoverage",
    "go": "start npm run watch && start npm run serve",
    "babel": "babel src/index.tsx --out-file dist/babel-bundle.js"
```

### Webpack Watch

type `npm run wpw` to start run Webpack in watch mode. This watches for any file changes, then recompiles. Edit the `index.ts` file, and note how Webpack detects the change and recompiles.

### Run development web server

Type `npm run serve`, and open browser to http://localhost:8080. Note this has hot module loading enabled (HMR) - try and change the template.html file and save, and see the browser page automatically refresh.

## Coding Standards

General JavaScript coding standards:
- Google JavaScript style guide: https://google.github.io/styleguide/jsguide.html
- AirBnB JavaScript style guide: https://github.com/airbnb/javascript
- W3Schools JavaScript style guide: https://www.w3schools.com/js/js_conventions.asp

Filename conventions (React)
- https://github.com/airbnb/javascript/tree/master/react

Paradigms, Coding Standards:
- Clean Code (Robert C Martin): https://www.amazon.com/gp/product/0132350882/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0132350882&linkCode=as2&tag=brandonwoz-20&linkId=8af093cb2b8d9a87993f285341ff015a
- Clean Code (Ryan McDermott - focus on JavaScript): https://github.com/ryanmcdermott/clean-code-javascript

## Components

React is used to enable a web site to be built using reusable components. Key decisions for using React are:
- Functional components only
- Typed props is mandatory (Use of TypeScript)

## Environments

## API

## Styles + CSS

CSS is added to the Webpack configuration as follows:

`npm install --save-dev css-loader style-loader`

webpack.config.js, module section (Note css-loader comes AFTER style-loader):

``` js
 module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
            },
          },
        ],
      },
    ],
  },
```

### Reset Style
I use normalize.css as the reset style as follows:

`npm install normalize.css`

Then, add the following to the entry `index.ts`:

`import 'normalize.css';`

### CSS Modules

CSS Modules are locally scoped CSS files. CSS Modules are configured in thge `webpack.config.js` file.

``` js
{
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
            },
          },
        ],
      },
```

### Global.d.ts

When referencing .css files in .tsx files, you may get following error:

`Cannot find module 'module.css' or its corresponding type declarations`

To import custom file types, you must use TypeScript's declare module syntax to let it know that it's ok to import. To do this, simply create a globals.d.ts (declaration file) wherever your other code's root directory is and then add in this code:

``` js
declare module '*.css';
```

## Testing

## Linting

## Routes

React Router is used to link components to the Browser's URL.

https://reactrouterdotcom.fly.dev/docs/en/v6

To configure:

- Add react-router-dom: `npm install react-router-dom`
- Add the `BrowserRouter` into the main index.tsx, wrapping the `<App />` component.
- Configure routes in `App.tsx`.
- Add links, for example in the Header component.

## Context

## Debugging (VSCode)

## Links
- https://dev.to/ruppysuppy/create-react-app-from-scratch-like-a-pro-de0#:~:text=%20Create%20React%20App%20from%20Scratch%20like%20a,use%20npm%20run%20build%20or%20npm...%20More%20
- https://onoya.dev/react-webpack-babel7-typescript/