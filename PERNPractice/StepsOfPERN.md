## Set up node and express
1. Install stuff
#### Console
```batch
	npm install express, morgan
	npm install nodemon -D
```

2. On the package file
#### package.json
```json
	"scripts": {
		"test": "echo \"Error: no test specified\" && exit 1",
		"start":"node {SERVER_DIR}/index.js",
		"dev": "nodemon {SERVER_DIR}/index.js"
	},
	/*
	...
	*/
	//Make sure this is already on the json file:
	"dependencies": {
    "cors": "^2.8.5",
    "express": "^4.18.0",
    "morgan": "^1.10.0"
  	},
	"devDependencies": {
		"nodemon": "^2.0.16"
	}
```

3. On the index file of the backend:
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

## Endpoints using ROUTER
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