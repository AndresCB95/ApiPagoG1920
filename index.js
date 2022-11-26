const express = require("express")
const cors = require("cors")
const body_parser = require("body-parser")
const pagoService = require("./PagoService.js")

const app = express()
const path =  "/pagos"
const portpago = 8083

app.use(cors())
app.use(body_parser.json())

app.get(path ,
    (request, response)=>{
        console.log("llego peticion")
        console.log(request)

        response.send("Hola mundo")
    }
)

app.post(path,
    
    async (request, response)=>{
    const pago = request.body

    response.send(await pagoService.savePago(pago))
    }
)       


app.listen(portpago,
    ()=>{
        console.log("Subio api pagos en el puerto "+ portpago)
    }
)

