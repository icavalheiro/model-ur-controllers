# model ur controllers

This package allows you to easily work with controllers in express.js, it's really simple, really, you should take a look at the source code and check how it works, it's only a few lines of code.

## Using MUC

Just model your controllers in any folder you wants and make `muc` load them into express app.

Lets assume this folder structure in your project for the examples below:

```
src
├── main.js
├── controllers
|   ├── home-controller.js
|   └── user-controller.js
...
```

### Naming you controllers

Always name you controller as follow `myControllerName-controller.js`, everything that is before the `-` character will be used as the controller name in the routes.

### Initializing the muc

Just import `muc` and invoke it passing the path to you controller's folders and also an instance of the expressjs `app`:

```js
//main.js
const express = require('express')
const {muc} = require('model-ur-controllers')
const app = express();

muc('./controllers/', app)

app.listen(3000);
```

### Route mapping

The controllers will be mapped to this structure:
`/myControllerName/:id` and `/myControllerName/`

The method should be the name of the method, so your controller should look like this:

```js
//home-controller.js
module.exports = {
    get(req, res){ //will be mapped to [GET] /home/:id
        res.send('get')
    },
    post(req, res){ //will be mapped to [POST] /home/:id
        res.send('post')
    }
}
```

In case you need to map something to `/` just create a `index` in one of your controllers:

```js
//home-controller.js
module.exports = {
    index(req, res) { //will be mapped to [GET] /
        res.send('hello world')
    },
    get(req, res){
        res.send('get')
    },
    post(req, res){
        res.send('post')
    }
}
```

### Custom action names
Custom action names are support by using an object instead of a function in you controller definition:

```js
//home-controller.js
module.exports = {
    index(req, res) {
        res.send('hello world')
    },
    get(req, res){
        res.send('get')
    },
    post(req, res){
        res.send('post')
    },
    saveUser: { //will be mapped to [POST] /home/saveUser
        method: 'post',
        handler(req, res){
            res.send('ok')
        }
    }
}
```