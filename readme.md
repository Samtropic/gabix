# GABIX

## Docorga technical test

This technical test was written by an employee of Docorga which roughly reflects the technologies used by the company.

The purpose of this test is to be able to assess the knowledge of a candidate by subjecting him to challenges.

This technical test is broken down into eight steps. From easy to difficult, each step is a different challenge which requires API and Angular knowledge.

For a front-end appliance backend challenges are not mandatory but a bonus task, you may complete only Angular challenges.

### Prerequisites

- [Node](https://github.com/nvm-sh/nvm) version 18
- [Docker](https://www.docker.com/)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable)

## First Task: Running the stack

**Important**  
**We placed a small error somewhere in our sources files, in order tu completely launch the app you must find and correct the error**
**if you are stuck you can send us an email with stuck launching the stack message @ ~~deleted for privacy reasons~~**  
**if you are not able to find the error don't worry we will help you and this is not a mandatory exercise but a bonus task**

### setting the API

The API uses [Express](https://expressjs.com/) framework, [Mongoose](https://mongoosejs.com/), [TypeScript](https://www.typescriptlang.org/), [RxJS](https://rxjs.dev/) and more to discover on the `package.json`...
You should use theese to success this tests.

Run:

`cd api && yarn install`

### setting Angular

Angular use [Tailwind](https://tailwindcss.com/) for styiling. You can use any library you want to achieve your goals. We like to use components from [Material](https://material.angular.io/).
To manage asynchronuous code we use Observables and subjects with [RxJS](https://rxjs.dev/)
We also like to use [NGRX](https://ngrx.io/) but it is not implemented in this test, don't worry about it.

Run:

`cd angular && yarn install`

### Docker

Run:

`cd compose && docker compose up`

Open `http://localhost:4200/` on the browser

### reset Database

if you want to clean your database we created a script that can clean the database for you an recreates base fiwtures :

Run:

`cd compose && ./reset-database.sh`

## Notes

Your repository must contain the totality of your source files, but no useless files (binary, temp files...).

This technical test should be done only by yourself.

Each commit should be clear enough. We recommend to make one commit by challenge and by application (API/Angular).

Take your time to complete these challenges so we can evaluate your level... but don't sleep on your keyboard !! The ratio time elapsed and code delivered may be evaluated.

A comfortable developper would take around 5-6 hours to complete the fullstack challenge.

For each step you can leave a side note so we can understand what you did.

Create your own branch

Feel free to notify if any information is missing and contact us once you resolved the test.

Now this is fresh for you, you can take a look at the [challenges](./challenges.md)...
