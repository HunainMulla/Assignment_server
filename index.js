const express = require("express");
const app = express();
const router = require("./routes/UserAdd");
require("dotenv").config();

app.use(express.json());
app.use("/api", router);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on port " + process.env.PORT);
});
