const express = require("express")
const router = express.Router()

router.get("/categorias", (req, res) => {
    res.send("Rota de categorias")
})

module.exports = router;