
# async-connect-flash
this package is a better and async version of `connect-flash` with more features.

## why async-connect-flash?
because you can set your flash messages with async options! you can use the promise base or callback base of this package. it solves the problem of not saving flash messages immediately. it even has more features.

## Installation

using npm:

```bash
  npm i async-connect-flash
  cd flash-project
```

## how to configure it?
it is really easy to configure this package. first you need to choose the promise version or callback version of this package. then you need to configure it like the example:
* this is important to install `express-session` package! if you didnt, you will get an error.
configuring promise version:
```bash
import express from "express"
import expressSession from "express-session";
//import promiseConnectFlash
import { promiseConnectFlash } from "async-connect-flash";

const server = express();

server.use(
    expressSession({
      secret: "secret",
      saveUninitialized: false,
      resave: false
    })
  );

//execute it
server.use(promiseConnectFlash());

server.listen(3000)
```

configuring callback version: 
```bash
import express from "express"
import expressSession from "express-session";
// import callbackConnectFlash
import { callbackConnectFlash } from "async-connect-flash";

const server = express();

server.use(
    expressSession({
      secret: "secret",
      saveUninitialized: false,
      resave: false
    })
  );

//execute it
server.use(callbackConnectFlash());

server.listen(3000)
```

## how to use this package?
after you configured `async-connect-flash`, you can use it in middlewares. look at the examples.\
using promise version:
```bash
server.get("/test-flash", async (req, res) => {
    try {
        //setting the flash message
        await req.setFlash("flash?", "yes! flash!");

        res.redirect("/display-flash");
    } catch(error) {
        console.log(error)
    }
})

server.get("/display-flash", async (req, res) => {
    try {
        //getting the flash message
        const data = await req.getFlash("flash?");
        res.send(data);
    } catch(error) {
        console.log(error)
    }
})
```

using callback version:
```bash
server.get("/test-flash", (req, res) => {
    //setting the flash message
    req.setFlash("flash?", "yes! flash!", (err) => {
        if(!err) res.redirect("/display-flash");
        else console.log(err)
    });
})

server.get("/display-flash", (req, res) => {
    //getting the flash message
    req.getFlash("flash?", (err, data) => {
        if(!err) res.send(data);
        else console.log(err)
    });
})
```

## other configs
`promiseConnectFlash` and `callbackConnectFlash` also accepts a config object.

```
server.use(callbackConnectFlash({configs}));
```

config | description | type
--- | --- | ---
storeProperty | you can choose the property name of flash messages store | string / undefined



## Authors

- [@saman2007](https://github.com/saman2007)


## Feedback

If you have any feedback, please reach out to me at samanahrari@yahoo.com
## 🔗 Links
[![npm](https://img.shields.io/badge/npm-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://www.npmjs.com/package/async-connect-flash)

