require('dotenv').config
const { Sender } = require("@questdb/nodejs-client");
const FormData = require("form-data");
const fs = require("fs");
const fetch = require("node-fetch");

/**
 * NOT USED FROM NOW 
 * this way is only responsible for getting data from csv which is not what I am looking for
 */
async function run() {
    // create a sender with a 4k buffer
    const sender = new Sender({ bufferSize: 4096 });

    // connect to QuestDB
    // host and port are required in connect options
    await sender.connect({ port: 9000, host: "localhost" });

    const form = new FormData()
    form.append("data", fs.readFileSync(__dirname + "/export.csv"), {
        filename: 'file',
        contentType: "application/octet-stream",
    })

    try {
        const r = await fetch(`http://localhost:9000/imp`, {
            method: "POST",
            body: form,
            headers: form.getHeaders(),
        })

        console.log(r)
    } catch (e) {
        console.error(e)
    }
}

run()
    .then((value) => console.log(value))
    .catch((err) => console.log(err));


module.exports = { run }