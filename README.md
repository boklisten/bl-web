# Bl-web

Bl-web is the front end applicaton for the customers at Boklisten. It is
basicly just a simple cart-based commerce app.

# How to start

## Install

```bash
npm i
```

## Run

```bash
npm run watch
```

This will run a development server on and the application can be viewed at
[`http://localhost:4200/`](http://localhost:4200/)

## Login

To test with a user you must register a user. For this you must have an
instance of `bl-api` running on your computer. The `bl-api` is typically
running on `localhost:1337`. Once running you can easily create a user or login
by visiting [the login page](http://localhost:4200/auth/login).

# Components

The application and flow of the application can be explained by chopping it
into 4 parts:

-   open pages
-   payment and checkout
-   user pages
-   login

### Open pages

These are all the pages that don't require login. It is the info pages,
item select pages and the welcome page. Everyone can access these. Examples
`contact-info`, `faq` and `terms and conditions`.

The most important page are probably the `i/select` page. This is the page the
customer selects which items to buy, rent or loan. Once selected and confirmed
the customer is transferred to the checkout page.

### Payment and checkout

When the user has selected some items he can go to the checkout. This will take
the customer through multiple steps until he comes to the payment pages.
Payment is done by `DIBS` a third-party provider.

When the payment is confirmed he is taken to his `orders` page.

### User pages

These are all the pages where the user needs to be logged in to view. This is
pages like `customer's items`, `user profile` and `orders`.

To edit your user details or to view your orders you have to be logged in.

### Login

Login is done by using a login module called `bl-login`, once logged in the
user can view his user pages. He then has access to call the DB for his files
and other protected content.

# Development

Development is of course dependent of the use of [GIT](https://git-scm.com/). The project has two
branches: `master` and `dev`.

### dev

All development should be done in `dev` or sub-branches of this. When code
is pushed to remote the changes will be visible on our dev server at
[web.boklisten.co](https://web.boklisten.co/)

### master

master should be viewed as the final product. All code in master is
running in production.

> BEWARE: once you push to master the code will be
> in production!

Always test code in `dev` before pushing to master.

When code is pushed to `master` it can be viewed at [boklisten.no](https://boklisten.no)

## Commit messages

A commit messages should consist of two to three parts.

```text
<type>(scope): <summary of commit>
<BLANK_LINE>
<body>
```

example:

```text
fix(cart): updated to view full price

When in cart the full price of all the items is now viewable.
```

Code contribution should follow the angular template. [Please read their
explanation](https://github.com/angular/components/blob/master/CONTRIBUTING.md#-commit-message-guidelines).

## Dependencies

This application have several dependencies. The most important are:

-   `angular`
    -   The application is buildt width angular 2+
-   `bl-connect`
    -   Used to connect to boklistens backend systems
-   `bl-model`
    -   Single repository for interfaces and classes in boklistens apps
-   `bl-login`
    -   A login module for boklisten written in Angular
-   `bootstrap`
    -   The CSS framework
-   `moment`
    -   For time display and manipulation
-   `typescript`
    -   everything is written in typescript

## Internationalization

To extract the xlf files do:

```bash
npm run extract-i18n
```

This will create (or update) three files under `src/locale/`.

-   `messages.en.xlf`
    -   the english version
-   `messages.nb.xlf`
    -   the norwegian version (used in production)
-   `messages.xlf`
    -   the original version (original and english are the same)

These files are just translation files. Where you have english and another language side by side.

-   [Read more about Angular i18n](https://angular.io/guide/i18n)
-   [Read more about XLIFF](https://en.wikipedia.org/wiki/XLIFF)
