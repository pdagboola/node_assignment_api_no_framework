const http = require("http");
const fs = require("fs");
const items = [
  { name: "iPhone", price: "$500", size: "medium", id: 1 },
  { name: "Watch", price: "$200", size: "small", id: 2 },
  { name: "AirPod", price: "$100", size: "small", id: 3 },
];

const server = http.createServer((req, res) => {
  const { method, url } = req;
  //   res.setHeader("Content-Type", "application/json");

  if (method === "GET" && url === "/") {
    res.statusCode = 200;
    // return res.end(JSON.stringify({ message: "Welcome" }));
    res.end("Welcome");
  } else if (method === "GET" && url === "/create") {
    fs.readFile("create.html", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  } else if (method === "POST" && url === "/create") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
      const { name, price, size } = body;
      console.log("here's the chunk", chunk);
      console.log("here's the body", { name, price, size });
    });
    req.on("end", () => {
      //   const newItem = {JSON.stringify(body)};
      //   console.log(newItem);
      items.push({ name, price, size });
    });
    console.log(items);

    res.end();
    // req.bod
  }
});

server.listen(8080);
