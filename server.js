//Working this also:

// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const axios = require("axios");
// const app = express();
// const port = 3001;

// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// let shouldCancel = false;

// app.get("/route1", (req, res) => {
//   console.log("I am route 1");
//   res.send("Route 1 response");
// });

// app.get("/route2", (req, res) => {
//   console.log("I am route 2");
//   res.send("Route 2 response");
// });

// app.get("/route3", (req, res) => {
//   console.log("I am route 3");
//   res.send("Route 3 response");
// });

// app.get("/route4", (req, res) => {
//   console.log("I am route 4");
//   res.send("Route 4 response");
// });

// app.get("/start-sequence", async (req, res) => {
//   shouldCancel = false;
//   console.log("Sequence started");

//   const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

//   try {
//     let response;

//     await delay(5000);
//     response = await axios.get("http://localhost:3001/route1");
//     if (shouldCancel) throw new Error("Cancelled at Route 1");
//     console.log(response.data);

//     await delay(5000);
//     response = await axios.get("http://localhost:3001/route2");
//     if (shouldCancel) throw new Error("Cancelled at Route 2");
//     console.log(response.data);

//     await delay(5000);
//     response = await axios.get("http://localhost:3001/route3");
//     if (shouldCancel) throw new Error("Cancelled at Route 3");
//     console.log(response.data);

//     await delay(5000);
//     response = await axios.get("http://localhost:3001/route4");
//     if (shouldCancel) throw new Error("Cancelled at Route 4");
//     console.log(response.data);

//     res.send("Reached Route 4");
//   } catch (error) {
//     console.log(error.message);
//     res.send(error.message);
//   }
// });

// app.get("/cancel-sequence", (req, res) => {
//   shouldCancel = true;
//   console.log("Sequence cancel requested");
//   res.send("Cancel request received");
// });

// app.get("/route5", (req, res) => {
//   res.send("This is Route 5");
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let shouldCancel = false;

app.get("/route1", (req, res) => {
  console.log("I am route 1");
  res.send("Route 1 response");
});

app.get("/route2", (req, res) => {
  console.log("I am route 2");
  res.send("Route 2 response");
});

app.get("/route3", (req, res) => {
  console.log("I am route 3");
  res.send("Route 3 response");
});

app.get("/route4", (req, res) => {
  console.log("I am route 4");
  res.send("Route 4 response");
});

app.get("/start-sequence", async (req, res) => {
  shouldCancel = false;
  console.log("Sequence started");

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const eventStream = res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  const sendEvent = (event) => {
    res.write(`data: ${JSON.stringify(event)}\n\n`);
  };

  try {
    let response;

    await delay(5000);
    response = await axios.get("http://localhost:3001/route1");
    if (shouldCancel) throw new Error("Cancelled at Route 1");
    console.log(response.data);
    sendEvent({
      status: "Processing",
      route: "Route 1",
      message: response.data,
    });

    await delay(5000);
    response = await axios.get("http://localhost:3001/route2");
    if (shouldCancel) throw new Error("Cancelled at Route 2");
    console.log(response.data);
    sendEvent({
      status: "Processing",
      route: "Route 2",
      message: response.data,
    });

    await delay(5000);
    response = await axios.get("http://localhost:3001/route3");
    if (shouldCancel) throw new Error("Cancelled at Route 3");
    console.log(response.data);
    sendEvent({
      status: "Processing",
      route: "Route 3",
      message: response.data,
    });

    await delay(5000);
    response = await axios.get("http://localhost:3001/route4");
    if (shouldCancel) throw new Error("Cancelled at Route 4");
    console.log(response.data);
    sendEvent({
      status: "Processing",
      route: "Route 4",
      message: response.data,
    });

    sendEvent({
      status: "Completed",
      route: "Route 4",
      message: "Reached Route 4",
    });
    res.end();
  } catch (error) {
    console.log(error.message);
    sendEvent({
      status: "Cancelled",
      route: error.message.split(" ")[2],
      message: error.message,
    });
    res.end();
  }
});

app.get("/cancel-sequence", (req, res) => {
  shouldCancel = true;
  console.log("Sequence cancel requested");
  res.send("Cancel request received");
});

app.get("/route5", (req, res) => {
  res.send("This is Route 5");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
