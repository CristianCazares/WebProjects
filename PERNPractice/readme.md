## Set up node and express

1. Initialize Node
```batch
npm init -y
```
This creates a package.json file. 

2. Install stuff
#### Console
```batch
npm install express morgan cors
```
Express is the web server, Morgan allows us to print the HTTP Methods on console and Cors run two servers a the same time (one for frontend and the other for backend)
#### Console
``` batch
npm install nodemon -D
```
Nodemon introduces de hability of "hot-reloading" the web server. This means that everytime it detects a file saving/ctrl+s, it reloads the server automatically.

3. On the package file
#### package.json
```json
"scripts": {
	"test": "echo \"Error: no test specified\" && exit 1",
	"start":"node {SERVER_DIR}/index.js",
	"dev": "nodemon {SERVER_DIR}/index.js"
},
...
"dependencies": {
"cors": "^2.8.5",
"express": "^4.18.0",
"morgan": "^1.10.0"
},
"devDependencies": {
	"nodemon": "^2.0.16"
}
```

4. On the index file of the backend:
#### index.js
```js
//import dependencies
const express = require("express");
const morgan = require("morgan");

//Initialize express
const app = express();
app.use(morgan("dev"));
//Initialize web server
app.listen(3000);
console.log("Server up on port {PORT}");
```

5. Start server (with nodemon)
#### Console
```batch
npm run dev
```

## Endpoints using Express/Router
1. On backend create a directorie called "routes"
2. On said directorie (/routes), create a js file called "taks.routes.js"
3. Set up Express/Router to create and end point:
#### taks.routes.js
```js
const {Router} = require("express");
const router = Router();
/*
END POINTS
*/
module.exports = router;
```
4. Create end points
#### taks.routes.js
```js
router.get("/", (req, res) => {
	res.send("Simple endpoint");
});
```