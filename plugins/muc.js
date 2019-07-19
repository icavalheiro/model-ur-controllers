//model ur controllers...

const fs = require('fs')
const path = require('path')

module.exports = {
  muc(controllersDir, app){

    //read the controller directory to get all the controllers in it
    fs.readdirSync(controllersDir).forEach(function(file) {
        let controller = require(path.resolve(controllersDir + file));
        let name = file.split('-')[0];

        //get all the exported properties of a controller
        var keys = Object.getOwnPropertyNames(controller);
        for(let i =0; i < keys.length; i ++){
          let key = keys[i];

          //index is a custom key that any controller cna have to lister in '/'
          if(key == 'index'){
            app.get('/', controller.index)
            continue;
          }

          if(typeof(controller[key]) == 'object'){
            controller[key].method = controller[key].method || 'get'
            controller[key].handler = controller[key].handler || (() => {});

            app[controller[key].method](`/${name}/${key}/:id`, controller[key].handler)
            app[controller[key].method](`/${name}/${key}/`, controller[key].handler)
          } else {
            //map the other functions if app supports it
            if(typeof(app[key]) == 'function'){
              app[key](`/${name}/`, controller[key]);
              app[key](`/${name}/:id`, controller[key]);
            }
          }

        }
      });
  }
}