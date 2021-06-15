const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("first express api!!!");
});

module.exports = router;
