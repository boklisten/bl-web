# bl-web

`bl-web` is a customer centered application for Boklisten.no. It is basicly a
online store with some caveats. This README only describes development and
technical detail. For a deep-dive into the application [please read our
documentation](https://github.com/holskil/bl-doc/blob/master/bl-web/summary.md).

* [Requirements](#requirements)
* [How to run](#how-to-run)
* [Development](#development)
  * [NPM scripts](#npm-scripts)
  * [Build files](#build-files)
  * [Versioning](#versioning)
  * [Branches](#branches)

# Requirements

* NodeJS v8.0 or higher
* Typescript v3.0 or higher
* NPM v6.14.0 or higher
* bl-api v1.11.2 or higher

# How to run
1. Clone this repo to your own computer `git clone https://github.com/holskil/bl-web`
2. Navigate into the newly created `bl-web` folder
3. Install npm modules `npm i`
4. Ensure that `bl-api` is running on `http://localhost:1337`
    * No content will be available in `bl-web` if `bl-api` is not running.
    * You will not be able to login if `bl-api` is not running.
5. Start application locally with `npm run watch`
6. You should now be able to view `bl-web` on `http://localhost:4200`
    * the content will auto-update if you do changes to the code

# Development

## NPM scripts 

#### `npm run watch`
Runs the application locally. You can view the application on
[localhost:4200](http://localhost:4200).

#### `npm run build`
Builds the application with angular `--configuartion` set to the environment
variable `ANGULAR_ENV`.

#### `npm run extract-i18n`
Extracts all `i18n` tags from all the html files and puts them into three
differnet `xlf`-file under `./src/locale`.

#### `npm run postinstall`
This script used by the server on Heroku before hosting it.


## Build files
There are a number of build files and settings files that are not purly from
Angular. To develop `bl-web` it is a good thing to know what they are.

##### `./Procfile`
The `Procfile` is the Heroku settings file. Your can [read
more about it here](https://devcenter.heroku.com/articles/procfile).

##### `./xliffmerge.json`
This is the settings file for `i18n` the translator `ngx-i18nsupport`. [Read
more](https://www.npmjs.com/package/ngx-i18nsupport).

##### `./server.js`
This is the server file. It is a script for running the `bl-web` application
on the heroku server. Very simple node+express script.

##### `./src/hmr.ts`
This file is for Angulars `Hot Module Replacement`. [Read
more](https://codinglatte.com/posts/angular/enabling-hot-module-replacement-angular-6/).

 
## Commit messages
We use the same commit message scheme as Anglular. You can [read more about it
here](https://github.com/angular/angular/blob/master/CONTRIBUTING.md).


## Versioning

`bl-web` is versioned using [semantic
versioning](https://en.wikipedia.org/wiki/Software_versioning) meaning
`MAJOR.MINOR.PATCH`. Ex: `1.9.3`.

## Branches

There are two main branches `master` and `dev`. You should use `dev` for all
development and treat `master` as the public live version. 

#### `master`

This branch should be treated as the production branch and should not have
failing code.

When you push code to `master` the code is also pushed to our production
environment on Heroku. Be aware that any commit you push to master will be
viewable and executed on our live production server. The `master` branch is
currently running on [boklisten.no](https://www.boklisten.no).

You should **always** update the version when you push to master. [Read more
about versions](#versoning)

#### `dev`

This branch should be treated as a development branch, it should always be
runnable but does not need to be at the same standard as master.

When you push to `dev` the code is also pushed to our dev environment on
Heroku. The `dev` branch is currently running on
[web.test.boklisten.no](http://web.test.boklisten.no) 
