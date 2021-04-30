[![Build Status](https://travis-ci.org/MissingMaps/leaderboards.svg?branch=fix-headerlinks)](https://travis-ci.org/MissingMaps/leaderboards)

# Missing Maps Leaderboards

This repo contains the **Leaderboard Page** component of the [Missing
Maps](http://missingmaps.org) web site that is not part of the main Jekyll build
and can be tested / developed independently.

## Developing

```bash
npm install
npm start
```

## Building

```bash
npm run build
```

## Publishing

This is automatically done by Travis CI for
[missingmaps.org/leaderboards](http://missingmaps.org/leaderboards).

```bash
npm run build && npm run deploy
```

## Deployment

For the Travis-CI connection, a GitHub personal access token with 'public_repo - Access public repositories' permissions created and added via `travis encrypt GH_TOKEN=my_github_token --add env.matrix` as described in the [Travis-CI docs](https://docs.travis-ci.com/user/environment-variables#Encrypting-environment-variables).