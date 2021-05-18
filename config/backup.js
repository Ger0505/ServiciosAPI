const cron = require('node-cron')
const fetch = require('node-fetch')
const Usuario = require('../models/Usuario')
const Empresa = require('../models/Empresa')
const Repartidor = require('../models/Repartidor')
const Pedido = require('../models/Pedido')

const URL = "https://servicios-back.herokuapp.com/";

class Api {
    async postData(path, body) {
        let jsonObj = JSON.stringify(body);
        await fetch(URL + path, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: jsonObj,
        })
    }
}

const API = new Api()

const backup = cron.schedule('*/5 * * * *', async () => {
    console.log("Backup: " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds())
    let res0 = await fetch(URL + "destroy")
    if(!res0) return
    let res = await Usuario.find({}).exec()
    res.map(async usu => {
        try {
            await API.postData("usu/insert", usu)
        } catch (err) {
            console.log(err);
        }
    })
    let res1 = await Empresa.find({}).exec()
    res1.map(async emp => {
        try {
            await API.postData("emp/insert", emp)
        } catch (err) {
            console.log(err);
        }
    })
    let res2 = await Repartidor.find({}).exec()
    res2.map(async rep => {
        try {
            await API.postData("rep/insert", rep)
        } catch (err) {
            console.log(err);
        }
    })
    let res3 = await Pedido.find({}).exec()
    res3.map(async ped => {
        try {
            await API.postData("ped/insert", ped)
        } catch (err) {
            console.log(err);
        }
    })
    console.log("Finalizado:" + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds())
})

module.exports = backup