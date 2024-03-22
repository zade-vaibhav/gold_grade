import express from "express"
import mongodb from "./config/database.js";
import router from "./Route/routes.js"
import dotenv from "dotenv"
dotenv.config();


const app = express();

mongodb();

// app.use(cors());
app.use(express.json())

app.use("/api/v1/auth",router);
// app.use("/api/v1/auth")

try {
    app.listen(process.env.PORT, () => {
        console.log("server is running in port : ", process.env.PORT)
    })
}
catch (err) {
    console.log(err);
}