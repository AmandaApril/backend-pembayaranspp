const express = require("express")
const models = require("../models/index")
const petugas = models.petugas
const app = express()
const md5 = require("md5")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const multer = require("multer")
const path = require("path")
const fs = require("fs")

const jwt = require("jsonwebtoken")
const SECRET_KEY_ADMIN = "kanbisa"
const authAdmin = require("../auth-admin")
const SECRET_KEY_PENGURUS = "pastibisa"
const authPetugas = require("../auth-petugas")



// end point for admin
app.get("/", authAdmin, async(req, res) => {
    let result = await petugas.findAll()
    res.json(result)
    console.log(auth)
})


// end point for petugas
app.get("/for-petugas/:id_petugas", authPetugas, async(req, res) => {
    let param = {
        id_petugas: req.params.id_petugas
    }
    let result = await petugas.findAll({ where: param })
    res.json(result)
    console.log(auth)
})

app.post("/", authAdmin, async(req, res) => {
    let data = {
        username: req.body.username,
        password: md5(req.body.password),
        nama_petugas: req.body.nama_petugas,
        level: req.body.level
    }

    petugas.create(data)
        .then(result => {
            res.json({ message: "data has been inserted" })
        })
        .catch(error => {
            res.json({ message: error.message })
        })
})

app.put("/", authAdmin, async(req, res) => {
    let param = await { id_petugas: req.body.id_petugas }
    let data = await {
        username: req.body.username,
        password: md5(req.body.password),
        nama_petugas: req.body.nama_petugas,
        level: req.body.level
    }

    petugas.update(data, { where: param })
        .then(result => {
            res.json({ message: "data has been updated" })
        })
        .catch(error => {
            res.json({ message: error.message })
        })
})

app.delete("/:id_petugas", authAdmin, async(req, res) => {
    let param = { id_petugas: req.params.id_petugas }
    petugas.destroy({ where: param })
        .then(result => {
            res.json({ message: "data has been destroyed" })
        })
        .catch(error => {
            res.json({ message: error.message })
        })
})


//endpoint login petugas
app.post("/login", async(req, res) => {
    let param = {
        username: req.body.username,
        password: md5(req.body.password)
    }

    let result = await petugas.findOne({ where: param })
    if (result) {
        let payload = JSON.stringify(result)
        let role = (result.level).toLowerCase()

        if (role === "admin") {
            let token = jwt.sign(payload, SECRET_KEY_ADMIN)
            res.json({
                logged: true,
                data: result,
                role: role,
                token: token
            })
        } else {
            let token = jwt.sign(payload, SECRET_KEY_PENGURUS)
            res.json({
                logged: true,
                data: result,
                role: role,
                token: token
            })
        }
    } else {
        res.json({
            logged: false,
            message: "invalid username or password"
        })
    }
})

module.exports = app