Chatty Web App
=====================

Chatty is a Web app that allow users to communicate with each other without having to register accounts. It uses React, a popular front-end library created and used heavily by Facebook as well as modern tools for Node including Webpack and Babel.ReactJS.

### Usage


Install the dependencies and start the server.

```
npm install
npm start
open http://localhost:3000
```

### Static Files

You can store static files like images, fonts, etc in the `build` folder.

For example, if you copy a file called my_image.png into the build folder you can access it using `http://localhost:3000/build/my_image.png`.

### Linting

This boilerplate project includes React ESLint configuration.

```
npm run lint

```


### Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)

##Client
* babel-core 6.23.1,
* babel-loader: 6.3.1
* babel-preset-es2015: 6.22.0
* babel-preset-react": 6.23.0
* babel-preset-stage-0: 6.22.0
* css-loader": 0.26.1
* eslint": 3.15.0
* eslint-plugin-react": 6.9.0
* node-sass: 4.5.0
* sass-loader: 6.0.0
* sockjs-client: ^1.1.2
* style-loader: 0.13.1
* webpack: 2.2.1
* webpack-dev-server: 2.3.0

## Chatty Server
* express 4.16.4
*  uuid 3.3.2,
* ws  7.0.0

## Screenshot

!["Screenshot of a 3 Users Chat"](https://github.com/karinalop/chattyApp/blob/master/docs/3usersChat.png)
!["Screenshot of a 3 Users Chat where one user change name and post"](https://github.com/karinalop/chattyApp/blob/master/docs/3usersChat.png)