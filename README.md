<div align="center">

# Datapub

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/datopian/datapub/issues)
![build](https://github.com/datopian/datapub/workflows/datapub%20actions/badge.svg)
[![The MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](http://opensource.org/licenses/MIT)

React-based framework for building data publishing flows (esp for CKAN). This application will communicate with [ckanext-external-storage](https://github.com/datopian/ckanext-external-storage).

</div>

## Prerequisites

- [Node](https://nodejs.org/en/)
- [NPM Package Manager](https://www.npmjs.com/)

## Built with

- [create-react-app](https://cryptojs.gitbook.io/docs/)
- [Storybook](https://storybook.js.org/)
- [enzyme](https://github.com/enzymejs/enzyme)
- [Jest](https://jestjs.io/)
- [Ckan3-js-sdk](https://github.com/datopian/ckan3-js-sdk)

## Usage

There are several ways of using this library:

### Automatically mount the app

Define a HTML element with id `ResourceEditor` where the app will mounted. You also need to have `data-dataset-id` and `data-resource` attributes:

```html
<div id="ResourceEditor" data-dataset-id="test-id" data-resource="{}"></div>
```

Where `data-dataset-id` is an id of a CKAN dataset and `data-resource` is a descriptor of a resource. When creating a new resource, you can just skip that attribute.

### Explicitly mounting

You can also explicitly call a function to mount the app to specific place in your page:

```javascript
const elementId = 'root';
const datasetId = 'test-id'
// Make sure the module is loaded first, otherwise, this function won't be available
mountResourceEditorApp(myElementId, datasetId);
```

### Import specific components

Another way of using the library is to import specific components for your needs:

```javascript
import React from 'react';
import { ResourceEditor } from 'datapub';

const MyComponent = (props) => {
  return (
    <ResourceEditor datasetId={} resource={} />
  )
}
```

## Developers

### Install

First, clone the repo via git:

```bash
$ git clone git@github.com:datopian/datapub.git
```

And then install dependencies with npm.

```bash
$ cd datapub
$ npm install
```

### Run

```bash
$ npm run start
```

Run the app in the development mode.<br />
Open [http://localhost:3000/](http://localhost:3000/) to view it in the browser.

The page will reload if you make edits.<br />

### Storybook

Storybook is a tool that prepares a development environment for UI components. It allows you to develop and design your graphical interfaces quickly, isolated, and independently. Making it possible to define different states for components, thus documenting their states.

**Note**: Every push will run GitHub actions to deploy in GitHub pages. You can check online at https://datopian.github.io/datapub

#### Run storybook

```bash
$ npm run storybook
```

or

```bash
$ yarn storybook
```

### Run Tests

```bash
$ npm test
```

or

```bash
$ yarn test
```

To run tests + coverage

```bash
$ yarn test:watch
```

## Contributing

Please make sure to read the [CONTRIBUTING.md](CONTRIBUTING.md) Guide before making a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](License) file for details
