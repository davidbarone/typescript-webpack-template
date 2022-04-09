# webapp
Web UI Reference Application using TypeScript and Webpack.

Modern web development is complicated. There are a million ways to skin a cat, and the average developer has to worry about many design decisions before they evey start to code. This project is an attempt to capture all my personal design decisions into a single place, so I can easily spin up new web projects when needed.

## Key design decisions
- 100% API driven - server functionality should be in separate project (normally .NET Core web-api)
- Web UI layer to be 100% javascript application
- Use standard modern node build chain, but keep to core well-used components
  - TypeScript (for typed JavaScript)
  - Webpack (for bundling) - https://webpack.js.org/
  - Jest (for testing) - https://jestjs.io/
- Application should have the following features
  - Component-based abstraction (e.g. React-like)
  - Hot Module Loading (HML)

## Tooling

- VSCode
  - Extension: ESLint Extension (Microsoft)
  - Extension: Markdown All in One (Yu Zhang)
  - Extension: Prettier - Code Formatter (Prettier)

## Setup

- Initialising the project: `npm init`
- Installing npm packages: `npm install typescript webpack webpack-cli webpack-dev-server ts-loader html-webpack-plugin --save-dev`
- Initialising the TypeScript config file: `npx tsc --init`

### webpack.config.js

The following Webpack configuration was used:

``` js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// Change variable to change names of output files.
let appName = "webapp";

module.exports = {
  entry: { main: path.resolve("./src/index.ts") },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
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

### folder setup

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

### index.ts

To get started, just use the following code:

``` js
alert("Welcome to the Web UI Reference Application!");
```

### Template.html

The following HTML5 template was used:

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
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <h1>Web UI Reference Application</h1>
    <p>Welcome to the Web UI Reference Application!</p>
  </body>
</html>
```

### Npm Scripts

The following scripts are added to the `package.json` file:

``` json
    "test": "jest --collectCoverage",
    "wpw": "webpack --watch",
    "serve": "webpack-dev-server --mode=development",
    "go": "start npm run wpw && start npm run serve",
    "build": "webpack --mode production",
    "compile": "tsc"
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
- 

## Components
- Functional components only
- Typed props important

## Environments

## API

## Styles + CSS

CSS is added to the Webpack configuration as follows:

`npm install --save-dev css-loader`

webpack.config.js
``` js

```

### Reset Style
I use normalize.css as the reset style as follows:

`npm install normalize.css`

Then, add the following to the entry `index.ts`:

`import 'normalize.css';`

## Testing

## Routes

## Context

