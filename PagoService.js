const mongoPagos = require("./mongodbpago.js")
const request = require("axios")
/*{
    "valorTotal":0,
    "id_reserva":"",
    "estado_pago":"",
    "medio_pago":{}
}*/
const savePago = async (pago)=>{
    const client =await mongoPagos.getClient()
    const collection = await mongoPagos.getCollection(client)
    await mongoPagos.insert(collection,[pago])
    if(pago.estado_pago === "Aprobado"){
        await request.patch("http:192.168.1.7:8084/reservas",
        {"id_reserva":pago.id_reserva, "estado_pago":pago.estado_pago})
        .then(
            (response)=>{
                console.log("PAGO Reserva confirmada")
            }
        )
        .catch(
            (error)=>{
                console.log("ERROR en el PAGO Reserva")
            }
        )
    }
    const filtro = {"id_reserva":pago.id_reserva,"estado_pago":pago.estado_pago}
    const resultado = await mongoPagos.findOne(collection,filtro)
    mongoPagos.close(client)
    return resultado
}


module.exports.savePago = savePago;