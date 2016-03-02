## Contributing to Missing Maps

Thanks for joining in on the development of Missing Maps. Below is a quick outline for how to either report an issue or contribute code to the development. 

### Report an Issue

Here's a quick list of things to consider before submitting an issue:

  - Please search for your issue before filing it: many bugs and improvements have already been reported
  - Write specifically what browser this is reported to be found in
  - Write out the steps to replicate the error: when did it happen? What did you expect to happen? What happened instead?
  - Please keep bug reports professional and straightforward: trust us, we share your dismay of software breaking.
  - For bonus points, enable web developer extensions and report the Javascript error message.
  - And when in doubt, be over-descriptive of the bug and how you discovered it.

### Submitting Pull Requests

All pull requests should be proposed to the [`master`](https://github.com/MissingMaps/leaderboards/tree/master) branch. Travis CI manages rebuilds of the `master` branch to the `gh-pages` branch. `gh-pages` is used by Github Pages. 

### Development 

#### Environment
To set up the development environment for this website, you'll need to install the following on your system:

- [Node and npm](http://nodejs.org/)

After these basic requirements are met, run the following commands in the website's folder:
```
$ npm install
```

#### Developing locally

To serve with changes watched: 

```
$ npm start
```

To build locally: 

```
$ npm run build-dev
```

To build for production: 

```
$ npm run build-prod
```

### Managing the deploy process

Missing Maps uses the service Travis CI to manage the deployment process. Access to this service is available on Travis: https://travis-ci.org/MissingMaps/leaderboards. A Github account with admin access is required to make changes. 

Travis deployment settings are stored in the `.travis.yml` file. 

Travis performs the following to deploy: 

1. Installs required node modules
2. Builds the site running `npm run build-prod`
3. Deploys the built site by pushing the `dist` folder to the `gh-pages` branch. 


