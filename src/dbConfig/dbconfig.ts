import mongoose from 'mongoose'

export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;
        
        connection.on('connected', ()=>{
            console.log("MongoDb connected Successfully");
        })

        connection.on('error', (err)=>{
            console.log("MongoDB connection failed");
            console.log("The error" + err);
        })
    } catch (error) {
        console.log("Something went wrong");
        console.log(error);
    }
}