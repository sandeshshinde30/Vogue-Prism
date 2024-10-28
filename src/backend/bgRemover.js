

const express = require('express')

const formidable = require('formidable')

const {exec} = require('child_process')

const fs = require('fs')

const app = express()

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})

app.post('/remove-background',(req,res)=>{
    let form = new formidable.IncomingForm()

    form.parse(req,(err,fields,files)=>{
        if(err) {
            console.log("Error parsing form")
            return res.status(500).send("Internal server error")
        }

        let inputFile = files.image

        let outputPath = Date.now() + ".jpg"

            let command = `rembg`
    })
})

app.listen(5000,()=>{
    console.log("App is listening on 5000")
})