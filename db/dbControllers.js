const items = require("./items.json");
const fs = require("fs");

const allItems = () => {
  return new Promise((resolve, reject) => {
    fs.readFile("db/items.json", "utf8", (err, data) => {
      if (err) {
        throw err;
      }
      const items = JSON.parse(data);
      items.forEach((item, i) => {
        item.id = i + 1;
      });
      console.log("heres the items line 14", items);
      fs.writeFile("db/items.json", JSON.stringify(items, null, 2), (err) => {
        if (err) {
          throw err;
        } else {
          console.log("files written");
        }
        fs.readFile("db/items.json", "utf8", (err, data) => {
          if (err) {
            throw err;
          }
          const otherItems = JSON.parse(data);
          console.log("new data", data);
          // return otherItems;
          // console.log("heres the otherItems line 23", otherItems);
          resolve(otherItems);
        });
      });
    });
  });
};

const itemById = (id) => {
  return new Promise((resolve, reject) => {
    const item = items.find((item) => item.id === Number(id));
    resolve(item);
  });
};

const addNewItem = (name, price, size) => {
  const newItem = {
    name: name,
    price: price,
    size: size,
    id: items.length + 1,
  };
  console.log(newItem);
  items.push(newItem);
  fs.writeFileSync("./db/items.json", JSON.stringify(items), "utf8", (err) => {
    if (err) {
      throw err;
    }
  });
  // console.log("updated items array", updatedItems);
  console.log(items);
  return new Promise((resolve, reject) => {
    resolve(newItem);
  });
};

const deleteItem = (id) => {
  const filteredItems = items.filter((item) => item.id !== Number(id));
  console.log("new items array:", filteredItems);
  fs.writeFileSync(
    "./db/items.json",
    JSON.stringify(filteredItems),
    "utf8",
    (err) => {
      if (err) {
        throw err;
      }
    }
  );
};

const updateItem = async (name, price, size, id) => {
  console.log("items line 39", items);
  // const newItem = { name, price, size, id };
  // const item = await itemById(id);
  // if(id)
  const newId = Number(id);
  const newItems = items.filter((item) => id !== item.id);
  newItems.push({ name, price, size, id: newId });
  console.log(items);
  return new Promise(async (resolve, reject) => {
    fs.writeFile("./db/items.json", JSON.stringify(newItems), "utf8", (err) => {
      if (err) {
        throw err;
      }
    });
    resolve(newItems);
  });
};

module.exports = { allItems, itemById, addNewItem, updateItem, deleteItem };
