const {query,insert} = require("../config/database")

class Client{
    idClient
    constructor(client){
        this.name = client.name
        this.surname = client.surname
        this.email = client.email
        this.dni = client.dni
        this.contact = client.contact
        this.backup = client.backup
        this.createDate = client.createDate
    }

 //El metodo puede ser utilizado sin crear una instancia
    static async readAll(){
        return await query("SELECT * FROM clients")
    }

    static async readClientsServices(){
        return await query("SELECT clients.*, COUNT(services.idClient) AS 'cantidad' FROM clients LEFT JOIN services ON clients.idClient = services.idClient GROUP BY clients.idClient ORDER BY cantidad DESC")
    }
    
    static async readOne(idClient){
        return await query("SELECT * FROM clients WHERE idClient = ?", [idClient])
    }

    static async readByEmail(email){
        const client = await query("SELECT * FROM clients WHERE email = ?", [email])
        return client
    }

    static async readByDni(dni){
        const client = await query("SELECT * FROM clients WHERE dni = ?", [dni])
        return client
    }

    async save(){
        const newClient = await insert("clients",{
            name:this.name,
            surname:this.surname,
            email:this.email,
            contact: this.contact,
            dni: this.dni,
            backup: this.backup,
            createDate: this.createDate
        })
        this.idClient = newClient
        // console.log("En User")
        // console.log(newUser)
        return this.idClient
    }

    async update(newClient){
        try {
            const id = await query("UPDATE clients SET ? WHERE idClient = ?" ,[newClient, this.idClient])
            
        return id;
        } catch (error) {
            console.log(error)
        }
    }

    static async delete(id){
        await query("DELETE FROM clients WHERE idClient = " + id)
    }

    validate(){
        let result = {success: true, errors: []}
        if(!(this.name && this.surname && this.email && this.contact && this.backup && this.dni)){
            result.success = false
            result.errors.push("Rellena todos los campos")
        }
        return result
    }

}

module.exports = Client