//package declaration
const bodyParser = require("body-parser");
const express = require("express");
const app = new express();
import { AdminRoute, VendorRoute } from "./routes";

//initiation
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//route declaration
app.use("/admin", AdminRoute);
app.use("/vendor", VendorRoute);
// app.get("/", (req, res) => {
//   res.send("hello world");
// });

//port listening
app.listen(1234, () => {
  console.clear();
  console.log("server is running on port 1234");
});
