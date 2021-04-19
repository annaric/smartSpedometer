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
Usually, while creating your App, you had it running on your local server, but unfortunately the configuration for the local server will not serve the application when it is deployed on the gh-pages remote server, which is why you need to build your app.
Run this command on your terminal to build the application:
* ng build --prod --base-href "https://annaric.github.io/smartSpedometer"
  
After building the App, you can now deploy it to Github Pages using the angular-cli-ghpages tool:
* npx angular-cli-ghpages - dir=dist/smartSpeedometer
