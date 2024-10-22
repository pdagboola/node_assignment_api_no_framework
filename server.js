const http = require("http");
const items = require("./db/items.json");
const fs = require("fs");
const querystring = require("querystring");
const {
  createItemGet,
  createItemPost,
  getItems,
  findItemById,
  updateItemById,
  deleteItemById,
} = require("./controllers/itemControllers");

const server = http.createServer((req, res) => {
  const { method, url } = req;
  //   res.setHeader("Content-Type", "application/json");

  if (method === "GET" && url === "/") {
    res.statusCode = 200;
    return res.end(
      "<h1>Welcome</h1><a href='/create'>Create Item</a><a href='items'>View Items</a>"
    );
    // return res.end(JSON.stringify({ message: "Welcome" }));
  } else if (method === "GET" && url === "/create") {
    try {
      createItemGet(res, req);
    } catch (err) {
      throw err;
    }
  } else if (method === "POST" && url === "/create") {
    // res.statusCode = 201;
    try {
      createItemPost(res, req);
    } catch (err) {
      throw err;
    }
  } else if (method === "GET" && url === "/items") {
    try {
      getItems(res, req);
    } catch (err) {
      throw err;
    }
  } else if (method === "GET" && url.match(/\/item\/([0-9]+)/)) {
    try {
      findItemById(req, res);
    } catch (err) {
      throw err;
    }
  } else if (method === "PUT" && url.match(/\/item\/([0-9]+)/)) {
    try {
      updateItemById(req, res);
    } catch (err) {
      throw err;
    }
  } else if (method === "DELETE" && url.match(/\/item\/([0-9]+)/)) {
    try {
      deleteItemById(req, res);
    } catch (err) {
      throw err;
    }
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("404 Page Not Found");
  }
});

server.listen(8080);
