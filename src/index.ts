import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";

/*-------- Routes --------*/
import Group from "./routes/Group.controller";

/*-------- Initialization --------*/
const app = express();
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

/**----------- Interceptor-------------- */

app.use((req: any, res: any, next: any) => {
  console.log("Request Received", req.originalUrl, req.method);
  next();
});

/**-------- Paths ------------------- */

app.use("/api/group/", Group);

/**-------- DB Connect ------------------- */
mongoose
  .connect(
    process.env.MONGO_CONNECTION_URL! // connecting mongoose to mongoDb
  )
  .then(() => console.log("Connection Established"));

const PORT = process.env.PORT || 5001;

app.use("/", (request: any, response: any) => {
  // response.sendFile(path.join(__dirname,"client","build","index.html"))
  response.send({ message: "Specified Path is not Defined" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
