const Voucher = require("../models/Voucher")
const Service = require("../models/Service")
class VoucherController{
    

    async getComprobanteEView(req,res){
        const comprobantes = await Voucher.readVoucher(2)
        return res.render("mostrar-comprobante-entrega.html", {comprobantes})
    }

    async getComprobanteView(req,res){
        const comprobantes = await Voucher.readVoucher(1)
        return res.render("mostrar-comprobante.html", {comprobantes})
    }
    
    

    async registrarComprobanteRecepcion(req, res){
        const hoy = Date.now();
        const fecha = new Date(hoy);
        const data = {
            type: 1,
            idService: req.params.idService,
            createDate: fecha,
            content: null
        }
        const newVoucher = new Voucher(data)
        const result = await newVoucher.save()
        // console.log(result);

        return res.redirect("/mostrar-comprobante")
    }

    async registrarComprobanteEntrega(req, res){
        const hoy = Date.now();
        const fecha = new Date(hoy);
        const data = {
            type: 2,
            idService: req.params.idService,
            createDate: fecha,
            content: null
        }
        const newVoucher = new Voucher(data)
        const result = await newVoucher.save()


        return res.redirect("/mostrar-comprobante-entrega")
    }

    async getViewVoucher(req,res){
        const id = req.params.idVoucher
        const comprobante = await Voucher.readPdf(id)
        console.log(comprobante)

        const tipo = req.params.type
        let titulo 
        if (tipo == "1"){
            titulo="Combrobante de recepcion de celular para ingreso a Servicio Tecnico"
        }
        if (tipo == "2"){
            titulo="Combrobante de Entrega de celular reparado"
        }

        return res.render("ver-comprobante.html",{data:comprobante[0], titulo, tipo})
    }
    //informes
    getICelularView(req,res){
        return res.render("extra-informe-celulares.html")
    }
    getIClienteView(req,res){
        return res.render("extra-informe-clientes.html")
    }
    getIPagoView(req,res){
        return res.render("extra-informe-pagos.html")
    }


}

module.exports = VoucherController