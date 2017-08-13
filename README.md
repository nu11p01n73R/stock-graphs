**Stock Graphs**

Draw charts from the data generated from [funda](https://github.com/nu11p01n73R/funda)

**Usage**

Clone the repo. Install dependencies using,

```
$ npm install
```

Create a configuration file, `src/config/config-local.js` with the following contetns

```
export const api_conf = {
    host: "http://localhost", // funda http host
    port: 5000
}
```

Run, the command to start localserver,

```
npm run watch
```

Head onto `localhost:3000`
