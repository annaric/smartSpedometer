# SmartSpeedometer

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## To deploy the App on Github pages
1. Create and check out a git branch named gh-pages:

``git checkout -b gh-pages``

2. Build the project with the Angular CLI command ng build and the following options. Be sure to include the slashes on either side /smartSpedometer/.

``ng build --prod --output-path docs --base-href /smartSpeedometer/``

3. When the build is complete, make a copy of docs/index.html and name it docs/404.html.

4. Commit your changes and push.

5. On the GitHub project page, go to Settings and scroll down to the GitHub Pages section to configure the site to publish from the docs folder. Click Save.

Click on the GitHub Pages link at the top of the GitHub Pages section to see your deployed application. The format of the link is https://annaric.github.io/smartSpedometer/

(See more on https://angular.io/guide/deployment)
