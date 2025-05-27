import express from "express";
import dotenv from "dotenv";
import router from "./routes/router.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/mongoose.js";
import errorHandler from "./middlewares/errorHandler.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { swaggerUi, swaggerSpec } from "../swagger.js";

dotenv.config();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const APP_PORT = process.env.APP_PORT || 3003;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

const app = express();

const corsOptions = {
	//origin: CLIENT_URL,
	//credentials: true
}

app.use(cors(corsOptions));


app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/images", express.static(path.join(__dirname, "public", "images")));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));

app.use("/",router);
app.use(errorHandler);

app.listen(3000,()=>{
    console.log(`Backend conectado al puerto ${APP_PORT}`);
})