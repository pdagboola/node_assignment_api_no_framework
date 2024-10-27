const fs = require("fs");
const querystring = require("querystring");
const {
  allItems,
  itemById,
  addNewItem,
  updateItem,
  deleteItem,
} = require("../db/dbControllers");

const getItems = async (res, req) => {
  try {
    res.writeHead(200, { "Content-Type": "application/json" });
    const items = await allItems();
    console.log(items);
    // res.writeHead(200, { "Content-Type": "json/application" });
    res.end(JSON.stringify({ items }));
  } catch (err) {
    throw err;
  }
};

const createItemGet = (res, req) => {
  fs.readFile("create.html", (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/html" });
      //   res.end("Couldn't load page");
      res.end("<h1>500 Internal Server Error</h1><p>Couldn't load page.</p>");
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
};

const createItemPost = (res, req) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
    //   console.log("here's new chunk:", chunk);
    console.log("Here's body:", body);
  });
  req.on("end", async () => {
    // console.log(JSON.parse(body));
    // console.log("here's the body", { body });
    const { name, price, size } = JSON.parse(body);
    const newItem = await addNewItem(name, price, size);
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Item created", newItem }));
  });
  //   console.log(items);

  // res.end();
};

const findItemById = async (req, res) => {
  const newUrl = req.url.split("/");
  //   console.log("url array:", newUrl);
  const id = newUrl[newUrl.length - 1];
  //   console.log("id:", id);
  const item = await itemById(id);
  if (!item) {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: "Item not found" }));
  } else {
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Item found", item }));
  }
  console.log(item);
};

const updateItemById = async (req, res) => {
  const newUrl = req.url.split("/");
  const id = newUrl[newUrl.length - 1];
  const item = await itemById(id);

  if (!item) {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: "Item not found" }));
  }

  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
    console.log("Here's body:", body);
  });

  req.on("end", async () => {
    const { name, price, size } = JSON.parse(body);
    console.log("line 89", name, price, size);
    // const updatedItem = {
    //   name: name || item.name,
    //   price: price || item.price,
    //   size: size || item.size,
    //   id: id,
    // };
    const updatedItem = await updateItem(
      name || item.name,
      price || item.price,
      size || item.size,
      Number(id)
    );
    // await deleteItem(id);
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Item updated", updatedItem }));
  });
};

const deleteItemById = async (req, res) => {
  const newUrl = req.url.split("/");
  const id = newUrl[newUrl.length - 1];
  const item = await itemById(id);
  if (!item) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Item does not exist" }));
  } else {
    await deleteItem(id);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "item deleted" }));
  }
};

module.exports = {
  getItems,
  createItemGet,
  createItemPost,
  findItemById,
  updateItemById,
  deleteItemById,
};
