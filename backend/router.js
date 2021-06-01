const express = require("express")

const router = express.Router()

router.get("/",(req,resp) =>{
    resp.send("server running ...")
})


module.exports = router