const items = require("./items.json");
const fs = require("fs");

const allItems = () => {
  return new Promise((resolve, reject) => {
    resolve(items);
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

const updateItem = (name, price, size, id) => {
  const newItem = { name, price, size, id };
  items.push(newItem);
  return new Promise(async (resolve, reject) => {
    fs.writeFileSync(
      "./db/items.json",
      JSON.stringify(items),
      "utf8",
      (err) => {
        if (err) {
          throw err;
        }
      }
    );

    resolve(newItem);
  });
};

const deleteItem = (id) => {
  const filteredItems = items.filter((item) => item.id !== id);
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

module.exports = { allItems, itemById, addNewItem, updateItem, deleteItem };
