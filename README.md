# route-creator
Framework agnostic auto generator of routes for node application based on application folder structure. Forces developers to follow a sensible modular structure for their node applications. Compatible with Express, Restify and Hapi (tested these so far).

## Why route-creator
route-creator is NOT a framework. Its a utility to help you organize your code better and promote modularization.  

Node applications typically have the following components but even the popular frameworks like express, restify, hapi etc. don't provide enough guidance to structure an application. route-creator provides *one* way to structure your applications. I'll add more ways down the road.  

The approach that route-creator takes it is pretty simple. You just create your code artifacts as you please following a few simple rules. The route-creator will *generate* the routes and register them with your server. Currently, it generates both GET and POST routes and that should be okay for most applications. I will add a way to specify the method later.  
# Usage
1. All modules should have a single folder at their root. That's the `app_modules` folder directly under the application root folder.
2. All modules deserve their own folders. So, if you're creating a booking module, create a folder **booking** (under the `app_modules` folder, duh). Create a `controllers` folder under **booking**.
3. Create a separate controller file for each route you want to handle. Eg: under **booking**, say you want create, delete and view routes. So, create 3 files that have the handler function for each of these routes. Name the files according to the functions - **create.js, delete.js, view.js**.
4. Create a small config object in each file to identify the handler function (since you would probably create some helper functions in that file too) and any arguments for the route. `module.exports` this config object from that controller.
5. `require` routeRegistrar in your node application (check examples for code samples)  
`var routeCreator = require('route-creator');
routeCreator.createRoutes(server);`  

After you create the folder structure and files as above, the app structure will look something like this:  
<application_root>/app_modules/**booking**/controllers/**view.js**  
<application_root>/app_modules/**booking**/controllers/**delete.js**    
<application_root>/app_modules/**booking**/controllers/**create.js**  

route-creator frees you up from having to specify routes separately and figures out the route based on the folder names and controller file names. For the above example, the routes created would be:  
**/booking/view  
/booking/delete  
/booking/create**  
Every controller file also needs a small config section.

## config section
Provide a small JSON config object. There are just 2 attributes needed:

- `main`(mandatory): The name of the main route handler function for the controller.
- `args`(optional): Specify any arguments for the route.

Check the example to see in action.

## Limitations
- Reads only 1 folder level deep into the app_modules. It processes `controllers` folders that are only 2 levels under `app_modules`. Deeper nesting of modules is not supported currently, but planned.
- Adds only GET and POST routes for all controllers with no dev options to change this behavior. More flexibility and options for specifying method are in the works.