const express = require("express")
const models = require("../models/index")
const spp = models.spp
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", async(req, res) => {
    let result = await spp.findAll()
    res.json(result)
})

app.post("/", async(req, res) => {
    let data = {
        angkatan: req.body.angkatan,
        tahun: req.body.tahun,
        nominal: req.body.nominal
    }

    spp.create(data)
        .then(result => {
            res.json({ message: "data has been inserted" })
        })
        .catch(error => {
            res.json({ message: error.message })
        })
})

app.put("/", async(req, res) => {
    let param = await { id_spp: req.body.id_spp }
    let data = await {
        angkatan: req.body.angkatan,
        tahun: req.body.tahun,
        nominal: req.body.nominal
    }

    spp.update(data, { where: param })
        .then(result => {
            res.json({ message: "data has been updated" })
        })
        .catch(error => {
            res.json({ message: error.message })
        })
})

app.delete("/:id_spp", async(req, res) => {
    let param = { id_spp: req.params.id_spp }
    spp.destroy({ where: param })
        .then(result => {
            res.json({ message: "data has been destroyed" })
        })
        .catch(error => {
            res.json({ message: error.message })
        })
})

module.exports = app