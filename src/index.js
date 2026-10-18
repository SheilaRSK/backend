import dotenv from "dotenv";
dotenv.config({
    path: './.env'
});

import connectDB from "./config/database.js";
import app from "./app.js";



const startServer = async () => {
    try {
        await connectDB ();

        app.on("error", (error) => {
            console.log("Error", error);
        });

        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running on port : ${process.env.PORT || 8000}`);
        });
    } catch (error) {
        console.log("MongoDB connection failed :'V", error);
    }
}

startServer();