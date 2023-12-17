const express = require("express");
const cors = require("cors");
const app = express();

app.listen(3000, () => {
  console.log("server started on port 3000");
});

app.use(cors);
