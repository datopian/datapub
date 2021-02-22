<div align="center">

# Datapub

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/datopian/datapub/issues)
![build](https://github.com/datopian/datapub/workflows/datapub%20actions/badge.svg)
[![The MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](http://opensource.org/licenses/MIT)

DataPub is a React-based framework for rapidly building modern data publishing flows (esp for CKAN). It provides a variety of core components as well as example apps and flows.

</div>

## Background

This is a brief summary from https://tech.datopian.com/publish/ -- read that for more detail.

### What do we mean by data publishing?

The process of publishing data files and datasets (collections of files).

Specifically, the process of getting your data files stored and described in a data portal or other platform. Usually it involves steps like:

* Uploading or linking the files into the platform
* Describing these files with high level metadata e.g. the name and description of the dataset or files, their license etc
* Specific metadata about the data e.g. its structure, what fields there are and their types (e.g. integer, string)

### Why DataPub?

At Datopian we have been building data publishing flows for nearly 15 years both in tools like CKAN and OpenSpending and in custom applications. Our experience has taught us two things:

* Data Publishing flows almost always have some custom aspect. Whether it is a small tweak like adding a specific metadata field or a complex change like add data validation.
* There are many common components e.g. file upload and common patterns to many overall flows e.g. add a file, add metadata, save!

This indicates the need for a **framework** -- rather than a single one-size-fits-all application.

### The DataPub approach

* **🏗️ React-based**: individual data publishing flows will be React apps that you can boot with standard tools like `create-react-app` and where you can use the full ecosystem of React tooling and components
* **📦 Core components**: provide a suite of tried and tested core components common to many publishing flows such as file upload, table schema editor etc
* **🚂 [Template apps](./examples/)**: provide examples of full-scale apps which developers building new flows can use for inspiration and instruction e.g. copy and paste an example and then modify it

## Components

Components include:

* [File Upload](https://datopian.github.io/datapub/iframe.html?id=components-upload--idle)
* [File Input](https://datopian.github.io/datapub/iframe.html?id=components-input-file--drag-and-drop)
* [File Input Url](https://datopian.github.io/datapub/iframe.html?id=components-input-url--default)
* [Table Schema](https://datopian.github.io/datapub/iframe.html?id=components-tableschema--idle)
* [Metadata](https://datopian.github.io/datapub/iframe.html?id=components-metadata--idle)
* ProgressBar
* Switcher


To see all the available components visit our Storybook:

https://datopian.github.io/datapub

## Example Apps

See the [`examples`][ex] directory.

For other full scale apps using DataPub in the wild see:

* https://github.com/datopian/datapub-nhs

[ex]: ./examples/

## Getting started

There are two ways to get started

* Copy an existing example app from the [`examples`][ex] directory and then modify it
* Add DataPub components into either an existing React App or into a newly created a React app created from scratch using e.g. `create-react-app`

Of these two options the former is better when experimenting or for small changes. The latter is better if you are building a more complex application or integrating into an existing application.

In order to add DataPub components into a newly created React application, follow the steps below:

**Step 1:** create a new react application:
```bash
    create-react-app datapub-extend
```
Change directory into datapub-extend and run the application to ensure it was created successfully:
```bash
    cd datapub-extend
    yarn start
```
**Step 2:** Install Datapub 

```bash
   yarn add datapub
```
**Step 3:** In the App.js, initialises your app with the Resource editor

```javascript
...
export class ResourceEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datasetId: this.props.config.datasetId,
      resourceId: "",
      resource: this.props.resource || {},
     ...
    };
  }
  ...

```

**Step 4:** Also in App.js, import the components you need. For instance in the code below we import Upload and TableSchema component. 

```javascript
...
import { Upload, TableSchema } from "datapub";
...
```
**Step 5:** In the render section of your resource editor, add the Upload and TableSchema components you just imported. 

```javascript
...
 <div className="upload-edit-area">

    {this.state.resource.schema && (
      <TableSchema
        schema={this.state.resource.schema}
        data={this.state.resource.sample || []}
      />
    )}

    {!this.state.isResourceEdit ? (
      <button disabled={!success} className="btn">
        Save and Publish
      </button>
    ) : (
      <div className="resource-edit-actions">
        <button
          type="button"
          className="btn btn-delete"
          onClick={this.deleteResource}
        >
          Delete
        </button>
        <button className="btn">Update</button>
      </div>
    )}
  </div>
  ...
```

See the full example with code and explanations [here](examples/table-schema)

---

## Developers

### Install

Install a recent [Node](https://nodejs.org/en/) version.

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

Run the app in the development mode.

```bash
$ npm run start
```

Then open [http://localhost:3000/](http://localhost:3000/) to view it in the browser.

The page will reload if you make edits.

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
