const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors())


const kelas = require("./router/kelas")
const spp = require("./router/spp")
const siswa = require("./router/siswa")
const petugas = require("./router/petugas")
const pembayaran = require("./router/pembayaran")

app.use("/kelas", kelas)
app.use("/spp", spp)
app.use("/siswa", siswa)
app.use("/petugas", petugas)
app.use("/pembayaran", pembayaran)

app.use(express.static(__dirname))

app.listen(8000, () => {
    console.log("success")
})