# Todolist

Deploy to Heroku:

Server.js:
```
if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/client/build"));
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}
```

Package.json:
```
"heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"
```

## Author
 
Brian Doan

## License

[MIT](https://choosealicense.com/licenses/mit/)
