import mongoose from "mongoose"


const connection = {}

const mongooseClient = async ()=>{
    try {

        if(connection.connected) return

        const db = await mongoose.connect(process.env.MONGODB_URI)

        connection.connected = db.connections[0].readyState
        
    } catch (error) {
        throw error
    }
}


export default mongooseClient