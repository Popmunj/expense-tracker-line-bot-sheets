const express = require('express');
const router = express.Router();

let date = new Date(Date.now());
let y = date.getFullYear();
let m = date.getMonth() + 1;
let d = date.getDate();
let str = y + '-' + m + '-' + d

router.get('/', (req, res) => res.send(`Server is working fine! The date is ${str}`))


module.exports = router;