import mongoose from "mongoose";
// this function needs to be called in every file where you want to talk to the database.
export async function connect() {
    try{
        await mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;
        connection.once("connected", () => {
            console.log("Database connected Successfully");
        })
        connection.on("error", (err) => {
            console.log("Database connection error "+err);
            process.exit();
        })
    }catch(e){
        console.log("Database connection error ", e);
    }
}