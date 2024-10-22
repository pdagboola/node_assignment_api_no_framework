const http = require("http");
const fs = require("fs");
const querystring = require("querystring");
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
    return res.end("<h1>Welcome</h1>");
  } else if (method === "GET" && url === "/create") {
    fs.readFile("create.html", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/html" });
        //   res.end("Couldn't load page");
        res.end("<h1>500 Internal Server Error</h1><p>Couldn't load page.</p>");
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  } else if (method === "POST" && url === "/create") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
      //   console.log("here's new chunk:", chunk);
      console.log("Here's body:", body);
    });
    try {
      req.on("end", () => {
        // console.log(JSON.parse(body));
        // console.log("here's the body", { body });
        const { name, size, price } = querystring.parse(body);
        const newItem = {
          name: name,
          price: `$${price}`,
          size: size,
          id: items.length + 1,
        };
        items.push(newItem);
      });
      console.log(items);

      res.end();
    } catch (err) {
      throw err;
    }
  } else if (method === "GET" && url === "/items") {
    try {
      res.setHeader("Content-Type", "application/json");
      res.writeHead(200, { "Content-Type": "text/htnml" });
      res.write({ items });
      res.end;
    } catch (err) {
      throw err;
    }
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("404 Page Not Found");
  }
});/

server.listen(8080);
